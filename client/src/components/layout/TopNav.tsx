import { motion } from 'framer-motion';
import { Search, ChevronDown, Zap, FileDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { BlockerBell } from '../ui/BlockerNotifications';

interface Props {
  title: string;
  subtitle?: string;
  showStandupBtn?: boolean;
  showReportBtn?: boolean;
}

export const TopNav = ({ title, subtitle, showStandupBtn = true, showReportBtn = false }: Props) => {
  const { setShowCommandPalette, setShowHealthReport } = useAppStore();

  return (
    <header className="sticky top-0 z-40 glass-surface border-b border-white/5 px-8 py-4 flex items-center justify-between gap-4">
      {/* Left: Search */}
      <div className="relative group flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-accent-primary transition-colors" />
        <input
          type="text"
          placeholder="Search tasks, people, projects..."
          onClick={() => setShowCommandPalette(true)}
          readOnly
          className="w-full bg-white/5 border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white/60 placeholder-white/25 focus:outline-none cursor-pointer hover:border-white/15 transition-all"
        />
      </div>

      {/* Center: Title */}
      <div className="hidden lg:block text-center absolute left-1/2 -translate-x-1/2">
        <h2 className="text-sm font-black text-white">{title}</h2>
        {subtitle && <p className="text-[10px] text-white/30 font-bold">{subtitle}</p>}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {showReportBtn && (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowHealthReport(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 hover:border-accent-primary/30 text-sm font-bold text-white/70 hover:text-white transition-all">
            <FileDown className="w-4 h-4" />
            <span className="hidden md:block">Health Report</span>
          </motion.button>
        )}
        {showStandupBtn && (
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowCommandPalette(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl accent-gradient text-sm font-black text-white glow-primary hover:opacity-90 transition-all">
            <Zap className="w-4 h-4 fill-white" />
            <span className="hidden md:block">Standup</span>
          </motion.button>
        )}
        <BlockerBell />
        <div className="w-px h-6 bg-white/10" />
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-1.5 rounded-xl transition-colors">
          <div className="w-8 h-8 rounded-full accent-gradient p-[2px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-[10px] font-black">SC</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/30" />
        </div>
      </div>
    </header>
  );
};
