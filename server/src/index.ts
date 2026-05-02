import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { validateRequest } from './middleware/validate';
import { authMiddleware } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Request Schemas (Security: Input Validation)
const ParseMeetingSchema = z.object({
  body: z.object({
    transcript: z.string().min(10, 'Transcript is too short to parse accurately').max(10000, 'Transcript exceeds maximum length'),
  }),
});

// Audit Comment: Security Hardening - Implement Helmet for secure HTTP headers (XSS, Clickjacking, etc.)
app.use(helmet()); 

// Audit Comment: Security Hardening - Strict CORS configuration to prevent unauthorized cross-origin requests
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Audit Comment: Security Hardening - Rate limiting to mitigate brute-force and DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', limiter);

// Audit Comment: Security Hardening - Request body size limiting to prevent payload-based DoS
app.use(express.json({ limit: '10kb' })); 

// Helper to read data
const getData = (filename: string) => {
  try {
    const filePath = path.join(__dirname, 'data', `${filename}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading data file ${filename}:`, error);
    return [];
  }
};

// API Routes
app.get('/api/users', authMiddleware, (_req: Request, res: Response) => {
  res.json(getData('users'));
});

app.get('/api/projects', authMiddleware, (_req: Request, res: Response) => {
  res.json(getData('projects'));
});

app.get('/api/tasks', authMiddleware, (_req: Request, res: Response) => {
  res.json(getData('tasks'));
});

app.get('/api/stats', authMiddleware, (_req: Request, res: Response) => {
  const tasks = getData('tasks');
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t: any) => t.status === 'completed').length,
    inProgress: tasks.filter((t: any) => t.status === 'in-progress').length,
    blocked: tasks.filter((t: any) => t.isBlocked).length,
  };
  res.json(stats);
});

// AI Simulation Endpoints
app.post('/api/ai/parse-meeting', authMiddleware, validateRequest(ParseMeetingSchema), (req: Request, res: Response) => {
  const { transcript } = req.body;
  
  const tasks = [
    { id: 't-new-1', title: 'Update design specs', priority: 'medium', dueDate: '2024-06-25' },
    { id: 't-new-2', title: 'Schedule follow-up with client', priority: 'high', dueDate: '2024-06-18' }
  ];
  res.json({ tasks, summary: "Meeting focused on design alignment and client communication." });
});

app.get('/api/ai/standup', authMiddleware, (_req: Request, res: Response) => {
  res.json({
    summary: "Today's Focus: API Gateway completion and addressing the security audit blocker. Overall velocity is stable.",
    highlights: ["Alex is making progress on API Gateway", "Security audit is pending results"]
  });
});

// Static File Serving
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('/{*path}', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Centralized Error Handler (Security: No stack trace leaked in production)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
