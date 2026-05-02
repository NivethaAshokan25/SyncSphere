import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ArrowRight, Bell } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../utils/cn';

export const BlockerNotifications = () => {
  const { blockers, markBlockerRead, resolveBlocker, setActivePage } = useAppStore();
  const unread = blockers.filter(b => !b.isRead);

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {unread.slice(0, 2).map((blocker, i) => (
          <motion.div
            key={blocker.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280, delay: i * 0.1 }}
            className="pointer-events-auto"
          >
            <div className={cn(
              "glass rounded-2xl overflow-hidden border shadow-2xl",
              blocker.severity === 'critical' ? 'blocker-pulse border-rose-500/30' : 'border-amber-500/20'
            )}>
              {/* Top accent bar */}
              <div className={cn("h-1", blocker.severity === 'critical' ? 'danger-gradient' : 'bg-amber-500')} />
              
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-xl shrink-0", blocker.severity === 'critical' ? 'bg-rose-500/20' : 'bg-amber-500/20')}>
                    <AlertTriangle className={cn("w-4 h-4", blocker.severity === 'critical' ? 'text-rose-400' : 'text-amber-400')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                        blocker.severity === 'critical' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      )}>
                        {blocker.severity === 'critical' ? '🔴 CRITICAL' : '🟡 HIGH PRIORITY'}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white leading-tight">{blocker.title}</p>
                    <p className="text-[11px] text-white/40 mt-1">{blocker.assignee} • {blocker.time}</p>
                  </div>
                  <button onClick={() => markBlockerRead(blocker.id)} className="p-1 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => { resolveBlocker(blocker.id); setActivePage('Mission Control'); }}
                    className={cn("flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95",
                      blocker.severity === 'critical' ? 'danger-gradient text-white' : 'bg-amber-500 text-black'
                    )}>
                    Resolve <ArrowRight className="w-3 h-3" />
                  </button>
                  <button onClick={() => markBlockerRead(blocker.id)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-white/60 transition-all">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const BlockerBell = () => {
  const { unreadBlockers, setActivePage } = useAppStore();
  return (
    <button onClick={() => setActivePage('Mission Control')} className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <Bell className="w-5 h-5 text-white/60" />
      <AnimatePresence>
        {unreadBlockers > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-black text-white flex items-center justify-center border-2 border-background">
            {unreadBlockers}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
