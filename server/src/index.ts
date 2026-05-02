import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run uses 8080 by default

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Helper to read data
const getData = (filename: string) => {
  const filePath = path.join(__dirname, 'data', `${filename}.json`);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

// API Routes
app.get('/api/users', (req, res) => {
  res.json(getData('users'));
});

app.get('/api/projects', (req, res) => {
  res.json(getData('projects'));
});

app.get('/api/tasks', (req, res) => {
  res.json(getData('tasks'));
});

app.get('/api/stats', (req, res) => {
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
app.post('/api/ai/parse-meeting', (req, res) => {
  const { transcript } = req.body;
  // Rule-based simulation
  const tasks = [
    { id: 't-new-1', title: 'Update design specs', priority: 'medium', dueDate: '2024-06-25' },
    { id: 't-new-2', title: 'Schedule follow-up with client', priority: 'high', dueDate: '2024-06-18' }
  ];
  res.json({ tasks, summary: "Meeting focused on design alignment and client communication." });
});

app.get('/api/ai/standup', (req, res) => {
  res.json({
    summary: "Today's Focus: API Gateway completion and addressing the security audit blocker. Overall velocity is stable.",
    highlights: ["Alex is making progress on API Gateway", "Security audit is pending results"]
  });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
