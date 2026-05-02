import type { Task, Blocker } from '../../types';

/**
 * Google Gemini AI Integration Scaffold
 * Abstracts interactions with the Gemini API (e.g. gemini-1.5-pro).
 */
export const geminiService = {
  async generateStandupSummary(_teamActivity: any[]): Promise<string> {
    console.log('Calling Google Gemini API for Standup generation...');
    // Mocking Gemini AI API Call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("📋 Today's Standup: Alex is 80% done on API Gateway — should wrap by EOD. Elena completed the Design System 🎉. Marcus is debugging the DB migration. 2 blockers need immediate attention: Auth sign-off and CI pipeline.");
      }, 1500);
    });
  },

  async parseMeetingNotes(_transcript: string): Promise<{ tasks: Task[], confidence: number }> {
    console.log('Calling Google Gemini API to parse meeting transcript...');
    // Mocking NLP extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          confidence: 96,
          tasks: [
            { id: 'mp1', title: 'Update API documentation', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-rose-500', status: 'todo', priority: 'high', dueDate: 'Jun 5', project: 'Nova Platform', isBlocked: false, source: 'meeting-parsed' },
            { id: 'mp2', title: 'Finalize mobile design tokens', assignee: 'Elena Vance', assigneeInitials: 'EV', assigneeColor: 'bg-purple-500', status: 'todo', priority: 'medium', dueDate: 'Jun 4', project: 'SyncSphere Mobile', isBlocked: false, source: 'meeting-parsed' }
          ]
        });
      }, 2000);
    });
  },

  async extractVoiceTask(_audioBlob: Blob | string): Promise<string> {
    console.log('Calling Google Gemini API for Speech-to-Text and Task Extraction...');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Schedule follow-up call with design team by Friday");
      }, 1200);
    });
  },

  async analyzeBlockerRisk(_blockers: Blocker[]): Promise<{ riskScore: number, recommendations: string[] }> {
    console.log('Calling Google Gemini API to analyze project risk...');
    return Promise.resolve({
      riskScore: 78,
      recommendations: [
        'Auth flow blocker is on the critical path — escalate immediately.',
        'Consider redistributing 1-2 tasks from Alex Rivera.'
      ]
    });
  }
};
