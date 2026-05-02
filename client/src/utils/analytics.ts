import type { Task, Blocker, TeamMember } from '../types';

/**
 * Calculates the overall project risk score based on blockers and blocked tasks.
 * Maximum score is 100.
 */
export const calculateRiskScore = (tasks: Task[], blockers: Blocker[]): number => {
  if (tasks.length === 0) return 0;
  
  const criticalWeight = 30;
  const highWeight = 20;
  const blockedTaskWeight = 10;
  
  const criticalBlockers = blockers.filter(b => b.severity === 'critical').length;
  const highBlockers = blockers.filter(b => b.severity === 'high').length;
  const blockedTasks = tasks.filter(t => t.isBlocked).length;
  
  const rawScore = (criticalBlockers * criticalWeight) + (highBlockers * highWeight) + (blockedTasks * blockedTaskWeight);
  
  // Normalize based on number of tasks, but cap at 100
  const normalizedScore = Math.round((rawScore / Math.max(tasks.length, 1)) * 10);
  return Math.min(normalizedScore, 100);
};

/**
 * Calculates the workload percentage for a team member based on their assigned tasks
 * and the task priorities.
 */
export const calculateWorkload = (member: TeamMember, tasks: Task[]): number => {
  const memberTasks = tasks.filter(t => t.assignee === member.name && t.status !== 'completed');
  if (memberTasks.length === 0) return 0;

  const weights: Record<Task['priority'], number> = { high: 3, medium: 2, low: 1 };
  
  const workloadScore = memberTasks.reduce((acc, t) => acc + weights[t.priority], 0);
  
  // Assume a score of 12 is 100% capacity (e.g. 4 high priority tasks)
  const MAX_CAPACITY = 12;
  const percentage = Math.round((workloadScore / MAX_CAPACITY) * 100);
  
  return Math.min(percentage, 100);
};
