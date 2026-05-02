import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';

/**
 * Enterprise Architecture: Custom hook to decouple analytics logic from UI components.
 * Memoizes heavy calculations to prevent unnecessary re-renders.
 */
export function useAnalytics() {
  const { tasks, blockers, team } = useAppStore();

  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const blocked = tasks.filter(t => t.isBlocked).length;
    
    const velocity = total > 0 ? (completed / total) * 100 : 0;
    const blockerRate = total > 0 ? (blocked / total) * 100 : 0;

    return {
      total,
      completed,
      inProgress,
      blocked,
      velocity,
      blockerRate
    };
  }, [tasks]);

  const teamEfficiency = useMemo(() => {
    if (team.length === 0) return 0;
    const avgWorkload = team.reduce((acc, m) => acc + m.workloadPercent, 0) / team.length;
    return Math.max(0, 100 - (avgWorkload * 0.5)); // Inverse relationship
  }, [team]);

  return {
    metrics,
    teamEfficiency,
    tasks,
    blockers,
    team
  };
}
