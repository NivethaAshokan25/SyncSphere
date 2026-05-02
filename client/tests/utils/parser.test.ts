import { describe, it, expect } from 'vitest';
import { parseMeetingNotes } from '../../src/utils/parser';

describe('Meeting Parser Utility', () => {
  it('should extract tasks from a basic transcript', () => {
    const transcript = `
      - Alex will update the API documentation by Friday.
      * Elena needs to finalize the design system today.
    `;
    const result = parseMeetingNotes(transcript);
    
    expect(result).toHaveLength(2);
    expect(result[0].text).toContain('API documentation');
    expect(result[1].text).toContain('design system');
  });

  it('should determine urgency based on keywords', () => {
    const transcript = "- Marcus must fix the critical database bug ASAP.";
    const result = parseMeetingNotes(transcript);
    
    expect(result).toHaveLength(1);
    expect(result[0].urgency).toBe('critical');
  });
});
