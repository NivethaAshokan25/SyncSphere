import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AICommandPalette } from '../../src/components/ui/AICommandPalette';
import * as useAppStoreModule from '../../src/store/useAppStore';

describe('AICommandPalette', () => {
  it('does not render when showCommandPalette is false', () => {
    vi.spyOn(useAppStoreModule, 'useAppStore').mockReturnValue({
      showCommandPalette: false,
      setShowCommandPalette: vi.fn(),
    } as any);

    render(<AICommandPalette />);
    expect(screen.queryByPlaceholderText(/Ask SyncSphere/i)).not.toBeInTheDocument();
  });

  it('renders and filters commands when shown', () => {
    vi.spyOn(useAppStoreModule, 'useAppStore').mockReturnValue({
      showCommandPalette: true,
      setShowCommandPalette: vi.fn(),
      setActivePage: vi.fn(),
    } as any);

    render(<AICommandPalette />);
    
    const input = screen.getByPlaceholderText(/Ask SyncSphere/i);
    expect(input).toBeInTheDocument();

    // Type to filter
    fireEvent.change(input, { target: { value: 'Standup' } });
    expect(screen.getByText('Generate AI Standup')).toBeInTheDocument();
    expect(screen.queryByText('Go to Team Pulse')).not.toBeInTheDocument();
  });
});
