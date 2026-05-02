import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BlockerNotifications } from '../../src/components/ui/BlockerNotifications';
import * as useAppStoreModule from '../../src/store/useAppStore';

// Mock the framer-motion AnimatePresence to render children directly
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion') as any;
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => children
  };
});

describe('BlockerNotifications', () => {
  it('renders unread critical blockers as toasts', () => {
    const mockMarkRead = vi.fn();
    vi.spyOn(useAppStoreModule, 'useAppStore').mockReturnValue({
      blockers: [
        { id: '1', title: 'Test Blocker', severity: 'critical', isRead: false }
      ],
      markBlockerRead: mockMarkRead
    } as any);

    render(<BlockerNotifications />);
    
    expect(screen.getByText('Test Blocker')).toBeInTheDocument();
    expect(screen.getByText(/CRITICAL/i)).toBeInTheDocument();
  });

  it('does not render read blockers', () => {
    vi.spyOn(useAppStoreModule, 'useAppStore').mockReturnValue({
      blockers: [
        { id: '1', title: 'Test Blocker', severity: 'critical', isRead: true }
      ]
    } as any);

    render(<BlockerNotifications />);
    expect(screen.queryByText('Test Blocker')).not.toBeInTheDocument();
  });
});
