import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppStoreProvider } from '../../src/store/useAppStore';
import { MeetingParser } from '../../src/pages/MeetingParser';

// Mock framer-motion and geminiService
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return { ...actual, AnimatePresence: ({ children }: any) => children };
});

vi.mock('../../src/services/gemini/ai', () => ({
  geminiService: {
    parseMeetingNotes: vi.fn().mockResolvedValue({
      confidence: 95,
      tasks: [
        { id: '1', title: 'Integration Test Task', assignee: 'Alex Rivera', status: 'todo', priority: 'high', source: 'meeting-parsed' }
      ]
    })
  }
}));

describe('Integration Flow: Meeting Notes to Task Creation', () => {
  it('allows user to paste transcript, parse it, and adds task to the store', async () => {
    render(
      <AppStoreProvider>
        <MeetingParser />
      </AppStoreProvider>
    );

    // 1. Enter transcript
    const textarea = screen.getByPlaceholderText(/Paste your meeting notes or transcript here/i);
    fireEvent.change(textarea, { target: { value: 'Alex needs to write the Integration Test Task.' } });

    // 2. Click Analyze
    const analyzeButton = screen.getByText(/Extract Tasks with AI/i);
    fireEvent.click(analyzeButton);

    // 3. Wait for the mocked API response to render
    await waitFor(() => {
      expect(screen.getByText('Integration Test Task')).toBeInTheDocument();
    });

    // 4. Click Add All
    const approveButton = screen.getByText(/Add All →/i);
    fireEvent.click(approveButton);

    // Verify it updates state (Button says 'Added!')
    await waitFor(() => {
      expect(screen.getByText(/Added!/i)).toBeInTheDocument();
    });
  });
});
