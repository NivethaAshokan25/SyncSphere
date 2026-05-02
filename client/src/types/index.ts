/**
 * SyncSphere Core Types
 */

export interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeInitials: string;
  assigneeColor: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  project: string;
  isBlocked: boolean;
  blockerReason?: string;
  source?: 'manual' | 'meeting-parsed' | 'ai-suggested';
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  tasksExtracted: number;
  confidence: number;
  summary: string;
  tasks: Task[];
}

export interface Blocker {
  id: string;
  title: string;
  assignee: string;
  severity: 'critical' | 'high' | 'medium';
  time: string;
  taskId: string;
  isRead: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  color: string;
  tasksCount: number;
  completedCount: number;
  workloadPercent: number;
  status: 'online' | 'busy' | 'away' | 'offline';
}

export type PageId = 'Mission Control' | 'Meeting Parser' | 'Team Pulse' | 'Analytics' | 'Blockers' | 'landing';
