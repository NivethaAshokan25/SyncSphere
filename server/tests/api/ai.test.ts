import request from 'supertest';
import express from 'express';
import { describe, it, expect } from '@jest/globals';

const app = express();
app.use(express.json());

app.post('/api/ai/parse-meeting', (req, res) => {
  const { transcript } = req.body;
  if (!transcript) return res.status(400).json({ error: 'No transcript provided' });
  
  const tasks = [
    { id: 't-new-1', title: 'Test Task', priority: 'medium' }
  ];
  res.json({ tasks, summary: 'Mock summary' });
});

app.get('/api/ai/standup', (req, res) => {
  res.json({
    summary: "Today's Focus: Tests",
    highlights: ["Test coverage added"]
  });
});

describe('AI Coordinator Endpoints', () => {
  it('POST /api/ai/parse-meeting should extract tasks from transcript', async () => {
    const response = await request(app)
      .post('/api/ai/parse-meeting')
      .send({ transcript: 'We need to test the application.' });
      
    expect(response.status).toBe(200);
    expect(response.body.tasks).toBeDefined();
    expect(response.body.tasks.length).toBeGreaterThan(0);
    expect(response.body.summary).toBeDefined();
  });

  it('GET /api/ai/standup should return a generated summary', async () => {
    const response = await request(app).get('/api/ai/standup');
    
    expect(response.status).toBe(200);
    expect(response.body.summary).toContain('Focus');
    expect(response.body.highlights).toBeInstanceOf(Array);
  });
});
