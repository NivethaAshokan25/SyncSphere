import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { cn } from '../utils/cn';

export const BlockersPage = () => {
  const { blockers, tasks, resolveBlocker, markBlockerRead, setActivePage } = useAppStore();
  const blockedTasks = tasks.filter(t => t.isBlocked);

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Blockers" subtitle="Critical path issues" showStandupBtn={false} />

      <div className="p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-gradient">Active Blockers</h1>
          <p className="text-white/50 mt-1">AI-detected issues threatening your sprint delivery.</p>
        </motion.div>

        {blockers.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card rounded-3xl p-16 border border-emerald-500/20 text-center">
            <div className="p-5 rounded-full bg-emerald-500/10 inline-flex mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white">All Clear! 🎉</h3>
            <p className="text-white/50 mt-2">No active blockers. Your team is unblocked and shipping.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {blockers.map((blocker, i) => (
              <motion.div key={blocker.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={cn('glass-card rounded-3xl p-6 border', 
                  blocker.severity === 'critical' ? 'blocker-pulse border-rose-500/30' : 'border-amber-500/20'
                )}>
                <div className="flex items-start gap-4">
                  <div className={cn('p-3 rounded-2xl shrink-0', blocker.severity === 'critical' ? 'bg-rose-500/15' : 'bg-amber-500/15')}>
                    <AlertCircle className={cn('w-6 h-6', blocker.severity === 'critical' ? 'text-rose-400' : 'text-amber-400')} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={cn('text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full',
                        blocker.severity === 'critical' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/20' : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                      )}>
                        {blocker.severity}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white">{blocker.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-white/40">
                      <span>{blocker.assignee}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blocker.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => resolveBlocker(blocker.id)}
                      className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all',
                        blocker.severity === 'critical' ? 'danger-gradient text-white' : 'bg-amber-500 text-black hover:bg-amber-400'
                      )}>
                      Resolve <ArrowRight className="w-4 h-4" />
                    </button>
                    <button onClick={() => markBlockerRead(blocker.id)}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-bold text-white/60 transition-all">
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {blockedTasks.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-black text-white">Blocked Tasks</h3>
            </div>
            <div className="divide-y divide-white/5">
              {blockedTasks.map(task => (
                <div key={task.id} className="p-5 flex items-center gap-4">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0', task.assigneeColor)}>
                    {task.assigneeInitials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{task.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">{task.blockerReason}</p>
                  </div>
                  <span className="text-[10px] font-black text-rose-400 bg-rose-500/15 border border-rose-500/20 px-2.5 py-1 rounded-full">BLOCKED</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
