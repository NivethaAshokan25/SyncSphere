import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, BarChart3, 
  AlertCircle, Target, FileText, ArrowRight,
  Sparkles, Bot, Search, Layout, Activity
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../utils/cn';
import { Card } from '../common';

/**
 * Ask SyncSphere: The Floating AI Command Center
 * An elite assistant designed for high-performance team orchestration.
 */
export const AICommandPalette = () => {
  const { 
    showCommandPalette, setShowCommandPalette, 
    setActivePage, setShowHealthReport,
    team, tasks
  } = useAppStore();
  
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [aiResponse, setAiResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command Intelligence Logic
  const commands = useMemo(() => [
    { id: 'dashboard', label: 'Go to Mission Control', icon: Layout, page: 'Mission Control', category: 'Navigate' },
    { id: 'meetings', label: 'Open Meeting Parser', icon: FileText, page: 'Meeting Parser', category: 'Navigate' },
    { id: 'pulse', label: 'View Team Pulse', icon: Activity, page: 'Team Pulse', category: 'Navigate' },
    { id: 'analytics', label: 'Open Analytics', icon: BarChart3, page: 'Analytics', category: 'Navigate' },
    { id: 'standup', label: 'Summarize Today', icon: Zap, page: null, category: 'AI Actions', action: 'standup' },
    { id: 'health', label: 'Generate Team Report', icon: Sparkles, page: null, category: 'AI Actions', action: 'health' },
    { id: 'blockers', label: 'Show Blocked Tasks', icon: AlertCircle, page: 'Mission Control', category: 'Quick View', action: 'show_blockers' },
    { id: 'overload', label: 'Who is overloaded?', icon: Target, page: null, category: 'Intelligence', action: 'overload' },
  ], []);

  const filtered = useMemo(() => 
    commands.filter(c =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    ), [commands, query]
  );

  useEffect(() => {
    if (showCommandPalette) { 
      setTimeout(() => inputRef.current?.focus(), 50); 
      setQuery(''); 
      setSelected(0); 
      setAiResponse(''); 
    }
  }, [showCommandPalette]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { 
        e.preventDefault(); 
        setShowCommandPalette(!showCommandPalette); 
      }
      if (e.key === 'Escape') setShowCommandPalette(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showCommandPalette, setShowCommandPalette]);

  const typeResponse = useCallback((text: string) => {
    setIsTyping(true);
    setAiResponse('');
    let i = 0;
    const interval = setInterval(() => {
      setAiResponse(text.slice(0, i + 1));
      i++;
      if (i >= text.length) { 
        clearInterval(interval); 
        setIsTyping(false); 
      }
    }, 12);
  }, []);

  const executeCommand = useCallback((cmd: typeof commands[0]) => {
    if (cmd.page) { 
      setActivePage(cmd.page); 
      setShowCommandPalette(false); 
    }
    else if (cmd.action === 'standup') {
      typeResponse(`📋 Daily Synchronization Summary: ${team.length} members active. Alex is finalizing the API Gateway (90%). Elena is waiting for design approval on Tokens. 2 high-priority blockers in Nova Platform require immediate resolution.`);
    } else if (cmd.action === 'health') {
      setShowCommandPalette(false);
      setShowHealthReport(true);
    } else if (cmd.action === 'show_blockers') {
      setActivePage('Mission Control');
      setShowCommandPalette(false);
    } else if (cmd.action === 'overload') {
      const overloaded = team.filter(m => tasks.filter(t => t.assignee === m.name && t.status !== 'completed').length > 4);
      if (overloaded.length > 0) {
        typeResponse(`⚡ Intelligence Signal: ${overloaded.map(m => m.name).join(', ')} currently have high workload density (5+ active tasks). Consider redistributing deliverables to balance team velocity.`);
      } else {
        typeResponse("✅ Workload distribution is currently balanced across all team members. System velocity is optimal.");
      }
    }
  }, [setActivePage, setShowCommandPalette, setShowHealthReport, typeResponse, team, tasks, commands]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) executeCommand(filtered[selected]);
  };

  const grouped = useMemo(() => filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, typeof commands>), [filtered, commands]);

  return (
    <>
      {/* Floating Trigger */}
      {!showCommandPalette && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="fixed bottom-8 right-8 z-[90]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={() => setShowCommandPalette(true)}
            className="w-16 h-16 rounded-2xl accent-gradient shadow-2xl glow-primary flex items-center justify-center group relative overflow-hidden"
          >
            <Bot className="w-8 h-8 text-white relative z-10" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" 
            />
          </button>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 whitespace-nowrap"
              >
                <p className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-accent-primary" /> Ask SyncSphere <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono opacity-50">⌘K</kbd>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {showCommandPalette && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[100]"
              onClick={() => setShowCommandPalette(false)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
            >
              <Card className="p-0 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-black/80">
                {/* Search Header */}
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-accent-primary transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => { setQuery(e.target.value); setAiResponse(''); setIsTyping(false); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Command Intelligence: 'Summarize today', 'Who is overloaded'..."
                    className="w-full bg-transparent pl-14 pr-14 py-6 text-lg text-white placeholder-white/20 focus:outline-none font-medium"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <kbd className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/30 font-mono">ESC</kbd>
                  </div>
                </div>

                {/* Intelligence Layer */}
                <AnimatePresence>
                  {(isTyping || aiResponse) && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 py-5 bg-accent-primary/10 border-t border-white/5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-xl accent-gradient shrink-0 mt-0.5 shadow-lg shadow-accent-primary/20">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-white/90 leading-relaxed font-semibold italic">
                          {aiResponse}{isTyping && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} className="inline-block ml-1">▋</motion.span>}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Commands Grid */}
                <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-2">
                  {Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary opacity-60">{category}</p>
                      {cmds.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const isActive = globalIdx === selected;
                        return (
                          <button 
                            key={cmd.id} 
                            onClick={() => executeCommand(cmd)}
                            onMouseEnter={() => setSelected(globalIdx)}
                            className={cn(
                              'w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-left group',
                              isActive ? 'bg-white/10 border border-white/10 shadow-lg' : 'hover:bg-white/5 border border-transparent'
                            )}
                          >
                            <div className={cn(
                              'p-2.5 rounded-xl transition-all duration-300',
                              isActive ? 'accent-gradient scale-110 shadow-lg glow-primary' : 'bg-white/5 group-hover:bg-white/10'
                            )}>
                              <cmd.icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60')} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn('font-black text-sm tracking-tight transition-colors', isActive ? 'text-white' : 'text-white/60')}>
                                {cmd.label}
                              </p>
                            </div>
                            <ArrowRight className={cn('w-4 h-4 transition-all duration-300', isActive ? 'opacity-100 translate-x-0 text-accent-primary' : 'opacity-0 -translate-x-2')} />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="p-12 text-center">
                      <Search className="w-10 h-10 text-white/5 mx-auto mb-4" />
                      <p className="text-white/20 font-black uppercase tracking-widest text-xs">No intelligence matched query</p>
                    </div>
                  )}
                </div>

                {/* Footer Intelligence */}
                <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-black/40">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">AI Engine Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-white/20 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-white/40">↑↓</kbd> navigate</span>
                    <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-white/40">ENTER</kbd> execute</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
