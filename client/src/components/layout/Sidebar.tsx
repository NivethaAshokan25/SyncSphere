import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Target, MessageSquare, BarChart3,
  AlertCircle, ClipboardList, Command, ChevronRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../utils/cn';
import { RiskScoreMeter } from '../ui/RiskScoreMeter';

const menuItems = [
  { icon: LayoutDashboard, label: 'Mission Control' },
  { icon: ClipboardList, label: 'Meeting Parser' },
  { icon: MessageSquare, label: 'Team Pulse' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: AlertCircle, label: 'Blockers' },
];


export const Sidebar = () => {
  const { activePage, setActivePage, unreadBlockers, riskScore, setShowCommandPalette, setShowOnboarding } = useAppStore();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 glass-surface h-screen flex flex-col p-5 sticky top-0 border-r border-white/5 shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-2 pt-2">
        <div className="w-9 h-9 accent-gradient rounded-xl flex items-center justify-center shadow-lg glow-primary shrink-0">
          <Target className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight text-white">SyncSphere</h1>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">AI Platform</p>
        </div>
      </div>

      {/* Command Palette Trigger */}
      <button onClick={() => setShowCommandPalette(true)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all mb-6 group text-left">
        <Command className="w-4 h-4 text-white/40 group-hover:text-accent-primary transition-colors" />
        <span className="text-sm text-white/40 group-hover:text-white/70 transition-colors flex-1">Ask SyncSphere...</span>
        <kbd className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-white/30">⌘K</kbd>
      </button>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, i) => {
          const isActive = activePage === item.label;
          const isBlockers = item.label === 'Blockers';
          return (
            <motion.button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left relative',
                isActive ? 'bg-accent-primary/15 text-accent-primary' : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              {isActive && (
                <motion.div layoutId="active-nav" className="absolute inset-0 accent-gradient opacity-10 rounded-xl" />
              )}
              <item.icon className={cn('w-4.5 h-4.5 shrink-0 transition-colors', isActive ? 'text-accent-primary' : 'text-white/40 group-hover:text-white/70')} style={{width:'18px',height:'18px'}} />
              <span className="font-semibold text-sm">{item.label}</span>
              {isBlockers && unreadBlockers > 0 && (
                <span className="ml-auto bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">
                  {unreadBlockers}
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Risk Score */}
      <div className="glass-card rounded-2xl p-4 mb-4 border border-white/5">
        <div className="flex justify-center mb-2">
          <RiskScoreMeter score={riskScore} label="Sprint Risk" size="sm" />
        </div>
        <p className="text-[9px] text-white/25 font-bold uppercase tracking-widest text-center">Updated 5m ago</p>
      </div>

      {/* User */}
      <div className="glass-card rounded-2xl p-4 border border-white/5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl accent-gradient p-[2px] shrink-0">
            <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center text-xs font-black text-white">SC</div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">Sarah Chen</p>
            <p className="text-[10px] text-white/30 font-bold">Product Manager</p>
          </div>
        </div>
        <button onClick={() => setShowOnboarding(true)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-accent-primary/10 hover:text-accent-primary transition-all text-white/50 text-[10px] font-black uppercase tracking-wider">
          <span>Start Tour</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </motion.aside>
  );
};
