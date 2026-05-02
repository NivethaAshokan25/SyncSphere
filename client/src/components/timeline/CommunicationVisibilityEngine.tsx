import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  MoreVertical,
  Filter,
  MessageCircle,
  Hash,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../utils/cn';

type ActivityType = 'task_update' | 'owner_change' | 'comment' | 'blocker' | 'completion' | 'delayed';

interface Activity {
  id: string;
  type: ActivityType;
  user: {
    name: string;
    avatar?: string;
    initials: string;
    color: string;
  };
  taskTitle: string;
  content: string;
  timestamp: string;
  metadata?: {
    previousValue?: string;
    newValue?: string;
    tags?: string[];
  };
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'blocker',
    user: { name: 'Alex Rivera', initials: 'AR', color: 'bg-rose-500' },
    taskTitle: 'Database Migration',
    content: 'Encountered unexpected schema lock on production replica. Investigation in progress.',
    timestamp: '5m ago',
    metadata: { tags: ['Critical', 'Backend'] }
  },
  {
    id: '2',
    type: 'completion',
    user: { name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-500' },
    taskTitle: 'Auth Flow Refactor',
    content: 'Successfully deployed new OAuth2 handlers to staging.',
    timestamp: '22m ago'
  },
  {
    id: '3',
    type: 'comment',
    user: { name: 'Marcus Wright', initials: 'MW', color: 'bg-blue-500' },
    taskTitle: 'UI Design System',
    content: 'Should we consider using CSS variables for the glassmorphism effects to make it easier to theme?',
    timestamp: '1h ago'
  },
  {
    id: '4',
    type: 'owner_change',
    user: { name: 'Elena Vance', initials: 'EV', color: 'bg-purple-500' },
    taskTitle: 'API Documentation',
    content: 'Reassigned from Sarah Chen to Marcus Wright',
    timestamp: '2h ago',
    metadata: { previousValue: 'Sarah Chen', newValue: 'Marcus Wright' }
  },
  {
    id: '5',
    type: 'delayed',
    user: { name: 'System', initials: 'AI', color: 'bg-amber-500' },
    taskTitle: 'Marketing Campaign',
    content: 'This task has missed its initial milestone. Predicted delay: 2 days.',
    timestamp: '3h ago'
  },
  {
    id: '6',
    type: 'task_update',
    user: { name: 'Alex Rivera', initials: 'AR', color: 'bg-rose-500' },
    taskTitle: 'Infrastructure Audit',
    content: 'Status updated from "Todo" to "In Progress"',
    timestamp: '4h ago',
    metadata: { previousValue: 'Todo', newValue: 'In Progress' }
  },
  {
    id: '7',
    type: 'comment',
    user: { name: 'Sarah Chen', initials: 'SC', color: 'bg-emerald-500' },
    taskTitle: 'Auth Flow Refactor',
    content: 'Added comprehensive unit tests for the token refresh logic.',
    timestamp: '5h ago'
  }
];

const getIcon = (type: ActivityType) => {
  switch (type) {
    case 'task_update': return Clock;
    case 'owner_change': return UserPlus;
    case 'comment': return MessageSquare;
    case 'blocker': return AlertCircle;
    case 'completion': return CheckCircle2;
    case 'delayed': return Clock;
    default: return Hash;
  }
};

const getColor = (type: ActivityType) => {
  switch (type) {
    case 'task_update': return 'text-blue-400 bg-blue-400/10';
    case 'owner_change': return 'text-purple-400 bg-purple-400/10';
    case 'comment': return 'text-indigo-400 bg-indigo-400/10';
    case 'blocker': return 'text-rose-400 bg-rose-400/10';
    case 'completion': return 'text-emerald-400 bg-emerald-400/10';
    case 'delayed': return 'text-amber-400 bg-amber-400/10';
    default: return 'text-slate-400 bg-slate-400/10';
  }
};

export const CommunicationVisibilityEngine = () => {
  const [filter, setFilter] = useState<'all' | 'blockers' | 'completed' | 'delayed' | 'discussions'>('all');

  const filteredActivities = useMemo(() => {
    switch (filter) {
      case 'blockers': return activities.filter(a => a.type === 'blocker');
      case 'completed': return activities.filter(a => a.type === 'completion');
      case 'delayed': return activities.filter(a => a.type === 'delayed');
      case 'discussions': return activities.filter(a => a.type === 'comment');
      default: return activities;
    }
  }, [filter]);

  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'blockers', label: 'Blockers', icon: AlertCircle },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'delayed', label: 'Delayed', icon: Clock },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
  ];

  return (
    <div className="glass flex flex-col h-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-950/40 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-white mb-1">Activity Stream</h2>
            <p className="text-slate-400 text-sm font-medium">Real-time team orchestration</p>
          </div>
          <div className="flex gap-2">
            <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Smart Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border",
                filter === f.id 
                  ? "bg-white text-slate-950 border-white shadow-lg shadow-white/10" 
                  : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10 hover:bg-white/10"
              )}
            >
              {f.icon && <f.icon className="w-3.5 h-3.5" />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, idx) => {
            const Icon = getIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative"
              >
                <div className="flex gap-4">
                  {/* Avatar & Line */}
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shadow-xl border-2 border-slate-950",
                      activity.user.color
                    )}>
                      {activity.user.initials}
                    </div>
                    <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent mt-3 group-last:hidden" />
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white tracking-tight">{activity.user.name}</span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{activity.timestamp}</span>
                      </div>
                      <div className={cn(
                        "px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter flex items-center gap-1",
                        getColor(activity.type)
                      )}>
                        <Icon className="w-3 h-3" />
                        {activity.type.replace('_', ' ')}
                      </div>
                    </div>

                    <div className="glass p-5 rounded-3xl border border-white/5 bg-white/[0.03] group-hover:bg-white/[0.06] transition-all duration-500">
                      <div className="flex items-center gap-2 mb-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        <Hash className="w-3 h-3" />
                        {activity.taskTitle}
                      </div>
                      
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {activity.content}
                      </p>

                      {activity.metadata?.previousValue && (
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/20 border border-white/5 text-[11px]">
                          <span className="text-slate-500 line-through">{activity.metadata.previousValue}</span>
                          <ArrowRight className="w-3 h-3 text-slate-600" />
                          <span className="text-accent-primary font-bold">{activity.metadata.newValue}</span>
                        </div>
                      )}

                      {activity.metadata?.tags && (
                        <div className="flex gap-2">
                          {activity.metadata.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-slate-400 border border-white/5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {activity.type === 'comment' && (
                        <div className="mt-4 pt-4 border-t border-white/5 flex gap-4">
                          <button className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5" /> Reply
                          </button>
                          <button className="text-[11px] font-bold text-slate-500 hover:text-white transition-colors">
                            View Thread
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
