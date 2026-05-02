import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { GoogleUser } from '../services/firebase/auth';
import { firestoreService } from '../services/firebase/firestore';

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

const initialTasks: Task[] = [
  { id: 't1', title: 'API Gateway Implementation', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-rose-500', status: 'in-progress', priority: 'high', dueDate: 'Jun 12', project: 'Nova Platform', isBlocked: false, source: 'manual' },
  { id: 't2', title: 'Auth Flow Security Audit', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-rose-500', status: 'blocked', priority: 'high', dueDate: 'Jun 14', project: 'Nova Platform', isBlocked: true, blockerReason: 'Waiting for security team sign-off on OAuth2 implementation.', source: 'manual' },
  { id: 't3', title: 'Glassmorphism Design System', assignee: 'Elena Vance', assigneeInitials: 'EV', assigneeColor: 'bg-purple-500', status: 'completed', priority: 'medium', dueDate: 'Jun 10', project: 'SyncSphere Mobile', isBlocked: false, source: 'manual' },
  { id: 't4', title: 'Database Migration Scripts', assignee: 'Marcus Wright', assigneeInitials: 'MW', assigneeColor: 'bg-blue-500', status: 'in-progress', priority: 'high', dueDate: 'Jun 16', project: 'Nova Platform', isBlocked: false, source: 'manual' },
  { id: 't5', title: 'Push Notification System', assignee: 'Sarah Chen', assigneeInitials: 'SC', assigneeColor: 'bg-emerald-500', status: 'todo', priority: 'medium', dueDate: 'Jun 20', project: 'SyncSphere Mobile', isBlocked: false, source: 'manual' },
  { id: 't6', title: 'User Analytics Dashboard', assignee: 'Elena Vance', assigneeInitials: 'EV', assigneeColor: 'bg-purple-500', status: 'todo', priority: 'low', dueDate: 'Jun 25', project: 'Nova Platform', isBlocked: false, source: 'manual' },
];

const initialMeetings: Meeting[] = [
  {
    id: 'm1', title: 'Q3 Sprint Planning', date: 'May 2, 2026', duration: '52 min', tasksExtracted: 6, confidence: 94,
    summary: 'Team aligned on API Gateway priority. Security audit blocker identified. Mobile push notifications deferred to next sprint.',
    tasks: [],
  },
  {
    id: 'm2', title: 'Design System Review', date: 'May 1, 2026', duration: '38 min', tasksExtracted: 3, confidence: 89,
    summary: 'Glassmorphism tokens finalized. Elena to complete mobile component library by EOW.',
    tasks: [],
  },
  {
    id: 'm3', title: 'Security Sync - Alex', date: 'Apr 30, 2026', duration: '25 min', tasksExtracted: 2, confidence: 97,
    summary: 'OAuth2 implementation reviewed. Sign-off from security team required before deployment.',
    tasks: [],
  },
];

const initialBlockers: Blocker[] = [
  { id: 'b1', title: 'Auth Flow awaiting security team sign-off', assignee: 'Alex Rivera', severity: 'critical', time: '2h ago', taskId: 't2', isRead: false },
  { id: 'b2', title: 'Mobile CI pipeline failing on Android build', assignee: 'Marcus Wright', severity: 'high', time: '5h ago', taskId: 't4', isRead: false },
];

const initialTeam: TeamMember[] = [
  { id: 'u1', name: 'Sarah Chen', initials: 'SC', role: 'Product Manager', color: 'bg-emerald-500', tasksCount: 3, completedCount: 1, workloadPercent: 62, status: 'online' },
  { id: 'u2', name: 'Alex Rivera', initials: 'AR', role: 'Lead Engineer', color: 'bg-rose-500', tasksCount: 5, completedCount: 0, workloadPercent: 94, status: 'busy' },
  { id: 'u3', name: 'Elena Vance', initials: 'EV', role: 'UX Designer', color: 'bg-purple-500', tasksCount: 3, completedCount: 2, workloadPercent: 45, status: 'online' },
  { id: 'u4', name: 'Marcus Wright', initials: 'MW', role: 'Backend Engineer', color: 'bg-blue-500', tasksCount: 4, completedCount: 1, workloadPercent: 78, status: 'away' },
];

interface AppStore {
  user: GoogleUser | null;
  tasks: Task[];
  meetings: Meeting[];
  blockers: Blocker[];
  team: TeamMember[];
  activePage: string;
  showCommandPalette: boolean;
  showHealthReport: boolean;
  showOnboarding: boolean;
  unreadBlockers: number;
  riskScore: number;
  addTasksFromMeeting: (tasks: Task[], meetingTitle: string) => void;
  markBlockerRead: (id: string) => void;
  resolveBlocker: (id: string) => void;
  setActivePage: (page: string) => void;
  setShowCommandPalette: (v: boolean) => void;
  setShowHealthReport: (v: boolean) => void;
  setShowOnboarding: (v: boolean) => void;
  addVoiceTask: (title: string) => void;
  setUser: (user: GoogleUser | null) => void;
}

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [meetings] = useState<Meeting[]>(initialMeetings);
  const [blockers, setBlockers] = useState<Blocker[]>(initialBlockers);
  const [team] = useState<TeamMember[]>(initialTeam);
  const [activePage, setActivePage] = useState('landing');
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showHealthReport, setShowHealthReport] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const unreadBlockers = blockers.filter(b => !b.isRead).length;
  const riskScore = Math.round(
    (blockers.filter(b => b.severity === 'critical').length * 30 +
     blockers.filter(b => b.severity === 'high').length * 20 +
     tasks.filter(t => t.isBlocked).length * 10) / 
    Math.max(tasks.length, 1) * 10
  );

  const addTasksFromMeeting = useCallback((newTasks: Task[], meetingTitle: string) => {
    setTasks(prev => [...prev, ...newTasks]);
    firestoreService.addExtractedMeetingTasks(meetingTitle, newTasks).catch(console.error);
  }, []);

  const markBlockerRead = useCallback((id: string) => {
    setBlockers(prev => prev.map(b => b.id === id ? { ...b, isRead: true } : b));
  }, []);

  const resolveBlocker = useCallback((id: string) => {
    const blocker = blockers.find(b => b.id === id);
    if (blocker) {
      setBlockers(prev => prev.filter(b => b.id !== id));
      setTasks(prev => prev.map(t => t.id === blocker.taskId ? { ...t, isBlocked: false, status: 'in-progress' } : t));
      firestoreService.updateTaskStatus(blocker.taskId, 'in-progress').catch(console.error);
    }
  }, [blockers]);

  const addVoiceTask = useCallback((title: string) => {
    const newTask: Task = {
      id: `voice-${Date.now()}`, title, assignee: 'Sarah Chen', assigneeInitials: 'SC',
      assigneeColor: 'bg-emerald-500', status: 'todo', priority: 'medium',
      dueDate: 'Jun 30', project: 'Nova Platform', isBlocked: false, source: 'meeting-parsed',
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  return (
    <AppStoreContext.Provider value={{
      user, tasks, meetings, blockers, team, activePage, showCommandPalette,
      showHealthReport, showOnboarding, unreadBlockers, riskScore,
      addTasksFromMeeting, markBlockerRead, resolveBlocker, setActivePage,
      setShowCommandPalette, setShowHealthReport, setShowOnboarding, addVoiceTask,
      setUser,
    }}>
      {children}
    </AppStoreContext.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
