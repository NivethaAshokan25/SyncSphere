import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Helper to read data
const getData = (filename: string) => {
  // In production, index.js is in dist/ and data is in dist/data/
  // In development, index.ts is in src/ and data is in src/data/
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// API Routes
app.get('/api/users', (_req: Request, res: Response) => {
  res.json(getData('users'));
});

app.get('/api/projects', (_req: Request, res: Response) => {
  res.json(getData('projects'));
});

app.get('/api/tasks', (_req: Request, res: Response) => {
  res.json(getData('tasks'));
});

app.get('/api/stats', (_req: Request, res: Response) => {
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
app.post('/api/ai/parse-meeting', (req: Request, res: Response) => {
  const { transcript } = req.body;
  const tasks = [
    { id: 't-new-1', title: 'Update design specs', priority: 'medium', dueDate: '2024-06-25' },
    { id: 't-new-2', title: 'Schedule follow-up with client', priority: 'high', dueDate: '2024-06-18' }
  ];
  res.json({ tasks, summary: "Meeting focused on design alignment and client communication." });
});

app.get('/api/ai/standup', (_req: Request, res: Response) => {
  res.json({
    summary: "Today's Focus: API Gateway completion and addressing the security audit blocker. Overall velocity is stable.",
    highlights: ["Alex is making progress on API Gateway", "Security audit is pending results"]
  });
});

// Serve static files from the React app
// Structure in Docker:
// /app/client/dist
// /app/server/dist/index.js
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
