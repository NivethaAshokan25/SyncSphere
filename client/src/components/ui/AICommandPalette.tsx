import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Command, Zap, BarChart3, MessageSquare, 
  AlertCircle, Target, FileText, Mic, X, ArrowRight
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../utils/cn';

const commands = [
  { id: 'dashboard', label: 'Go to Mission Control', icon: Target, page: 'Mission Control', category: 'Navigate' },
  { id: 'meetings', label: 'Open Meeting Parser', icon: FileText, page: 'Meeting Parser', category: 'Navigate' },
  { id: 'pulse', label: 'View Team Pulse', icon: MessageSquare, page: 'Team Pulse', category: 'Navigate' },
  { id: 'analytics', label: 'Open Analytics', icon: BarChart3, page: 'Analytics', category: 'Navigate' },
  { id: 'standup', label: 'Generate AI Standup', icon: Zap, page: null, category: 'AI Actions', action: 'standup' },
  { id: 'health', label: 'Generate Health Report', icon: BarChart3, page: null, category: 'AI Actions', action: 'health' },
  { id: 'blockers', label: 'Show Active Blockers', icon: AlertCircle, page: 'Mission Control', category: 'Quick View' },
  { id: 'voice', label: 'Record Voice Note → Task', icon: Mic, page: null, category: 'AI Actions', action: 'voice' },
];

export const AICommandPalette = () => {
  const { showCommandPalette, setShowCommandPalette, setActivePage, setShowHealthReport } = useAppStore();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (showCommandPalette) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(''); setSelected(0); setAiResponse(''); }
  }, [showCommandPalette]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowCommandPalette(!showCommandPalette); }
      if (e.key === 'Escape') setShowCommandPalette(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCommandPalette, setShowCommandPalette]);

  useEffect(() => {
    if (selected >= filtered.length) setSelected(0);
  }, [filtered.length, selected]);

  const typeResponse = useCallback((text: string) => {
    setIsTyping(true);
    setAiResponse('');
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { clearInterval(interval); setIsTyping(false); }
    }, 18);
  }, []);

  const executeCommand = useCallback((cmd: typeof commands[0]) => {
    if (cmd.page) { setActivePage(cmd.page); setShowCommandPalette(false); }
    else if (cmd.action === 'standup') {
      typeResponse("📋 Today's Standup: Alex is 80% done on API Gateway — should wrap by EOD. Elena completed the Design System 🎉. Marcus is debugging the DB migration (no ETA yet). 2 blockers need immediate attention: Auth sign-off and CI pipeline.");
    } else if (cmd.action === 'health') {
      setShowCommandPalette(false);
      setShowHealthReport(true);
    } else if (cmd.action === 'voice') {
      setShowCommandPalette(false);
    }
  }, [setActivePage, setShowCommandPalette, setShowHealthReport, typeResponse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) executeCommand(filtered[selected]);
  };

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, typeof commands>);

  return (
    <AnimatePresence>
      {showCommandPalette && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setShowCommandPalette(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
          >
            <div className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                <div className="p-2 rounded-xl accent-gradient">
                  <Command className="w-4 h-4 text-white" />
                </div>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setAiResponse(''); setIsTyping(false); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask SyncSphere or run a command..."
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-base font-medium focus:outline-none"
                />
                <button onClick={() => setShowCommandPalette(false)} className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* AI Response */}
              <AnimatePresence>
                {(isTyping || aiResponse) && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 bg-accent-primary/5 border-b border-white/5">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 rounded-lg accent-gradient shrink-0 mt-0.5">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed font-medium">
                        {aiResponse}{isTyping && <span className="animate-pulse">▊</span>}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Commands */}
              <div className="max-h-80 overflow-y-auto custom-scrollbar py-2">
                {Object.entries(grouped).map(([category, cmds]) => (
                  <div key={category}>
                    <p className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-white/25">{category}</p>
                    {cmds.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      return (
                        <button key={cmd.id} onClick={() => executeCommand(cmd)}
                          className={cn('w-full flex items-center gap-3 px-6 py-3 transition-all text-left group',
                            globalIdx === selected ? 'bg-accent-primary/10' : 'hover:bg-white/5'
                          )}>
                          <div className={cn('p-2 rounded-xl transition-colors',
                            globalIdx === selected ? 'accent-gradient' : 'bg-white/5 group-hover:bg-white/10'
                          )}>
                            <cmd.icon className={cn('w-4 h-4', globalIdx === selected ? 'text-white' : 'text-white/50')} />
                          </div>
                          <span className={cn('font-semibold text-sm flex-1', globalIdx === selected ? 'text-white' : 'text-white/70')}>
                            {cmd.label}
                          </span>
                          <ArrowRight className={cn('w-4 h-4 transition-opacity', globalIdx === selected ? 'opacity-100 text-accent-primary' : 'opacity-0')} />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center gap-4 text-[10px] text-white/25 font-bold">
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↑↓</kbd> navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">↵</kbd> execute</span>
                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono">esc</kbd> close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
