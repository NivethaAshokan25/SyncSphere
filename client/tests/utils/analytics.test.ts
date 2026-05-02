import { describe, it, expect } from 'vitest';
import { calculateRiskScore, calculateWorkload } from '../../src/utils/analytics';
import type { Task, Blocker, TeamMember } from '../../src/store/useAppStore';

describe('Analytics Utilities', () => {
  describe('calculateRiskScore', () => {
    it('should return 0 when there are no tasks', () => {
      expect(calculateRiskScore([], [])).toBe(0);
    });

    it('should calculate score based on blockers and blocked tasks', () => {
      const tasks: Task[] = [
        { id: '1', isBlocked: true } as Task,
        { id: '2', isBlocked: false } as Task,
        { id: '3', isBlocked: false } as Task,
      ];
      const blockers: Blocker[] = [
        { id: 'b1', severity: 'critical' } as Blocker,
        { id: 'b2', severity: 'high' } as Blocker,
      ];
      
      // Critical (30) + High (20) + BlockedTask (10) = 60
      // Normalized: (60 / 3) * 10 = 200 -> capped at 100
      expect(calculateRiskScore(tasks, blockers)).toBe(100);
    });
  });

  describe('calculateWorkload', () => {
    it('should return 0 when member has no tasks', () => {
      const member = { name: 'Alex' } as TeamMember;
      expect(calculateWorkload(member, [])).toBe(0);
    });

    it('should calculate workload percentage based on task priorities', () => {
      const member = { name: 'Alex' } as TeamMember;
      const tasks: Task[] = [
        { id: '1', assignee: 'Alex', status: 'todo', priority: 'high' } as Task, // 3
        { id: '2', assignee: 'Alex', status: 'in-progress', priority: 'medium' } as Task, // 2
        { id: '3', assignee: 'Other', status: 'todo', priority: 'high' } as Task, // Ignored
        { id: '4', assignee: 'Alex', status: 'completed', priority: 'high' } as Task, // Ignored
      ];
      
      // Total score: 5. Max capacity: 12. Percentage: (5 / 12) * 100 = 42
      expect(calculateWorkload(member, tasks)).toBe(42);
    });
  });
});
