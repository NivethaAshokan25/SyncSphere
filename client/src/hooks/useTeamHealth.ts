import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { calculateWorkload } from '../utils/analytics';

/**
 * useTeamHealth Intelligence Hook
 * Calculates real-time synchronization and productivity signals.
 */
export const useTeamHealth = () => {
  const { tasks, blockers, team } = useAppStore();

  const healthMetrics = useMemo(() => {
    if (tasks.length === 0) return { score: 100, risk: 0, burnout: 0, collaboration: 100 };

    // 1. Overdue & Delayed Deliverables
    const now = new Date();
    const overdueCount = tasks.filter(t => {
      if (t.status === 'completed') return false;
      const due = new Date(t.dueDate + ', 2024'); // Mock year
      return due < now;
    }).length;

    // 2. Workload Distribution (Burnout Warning)
    const workloads = team.map(m => calculateWorkload(m, tasks));
    const highWorkloadCount = workloads.filter(w => w > 80).length;
    const burnoutScore = Math.min((highWorkloadCount / Math.max(team.length, 1)) * 100, 100);

    // 3. Unresolved Blockers (Risk Meter)
    const blockerRisk = Math.min((blockers.length / Math.max(tasks.length, 1)) * 200, 100);

    // 4. Collaboration Efficiency
    const blockedTasks = tasks.filter(t => t.isBlocked).length;
    const collaborationScore = Math.max(100 - (blockedTasks * 15), 0);

    // 5. Final Synchronized Health Score
    const overduePenalty = (overdueCount / tasks.length) * 100;
    const finalScore = Math.round(
      (100 - overduePenalty) * 0.3 + 
      (100 - burnoutScore) * 0.3 + 
      (100 - blockerRisk) * 0.2 + 
      collaborationScore * 0.2
    );

    return {
      score: Math.min(Math.max(finalScore, 0), 100),
      risk: Math.round(blockerRisk),
      burnout: Math.round(burnoutScore),
      collaboration: Math.round(collaborationScore),
      overdueCount
    };
  }, [tasks, blockers, team]);

  return healthMetrics;
};
