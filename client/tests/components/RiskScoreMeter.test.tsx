import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RiskScoreMeter } from '../../src/components/ui/RiskScoreMeter';

describe('RiskScoreMeter', () => {
  it('renders low risk correctly', () => {
    render(<RiskScoreMeter score={20} label="Test Risk" />);
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Test Risk')).toBeInTheDocument();
    expect(screen.getByText(/Low Risk/i)).toBeInTheDocument();
  });

  it('renders medium risk correctly', () => {
    render(<RiskScoreMeter score={50} />);
    expect(screen.getByText(/MODERATE/i)).toBeInTheDocument();
  });

  it('renders high risk correctly', () => {
    render(<RiskScoreMeter score={85} />);
    expect(screen.getByText(/High Risk/i)).toBeInTheDocument();
  });
});
