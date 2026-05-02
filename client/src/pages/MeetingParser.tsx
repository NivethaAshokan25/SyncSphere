import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ClipboardList, 
  Send, 
  User, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  X,
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { parseMeetingNotes } from '../utils/parser';
import type { ParsedTask } from '../utils/parser';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MeetingParser = () => {
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState<ParsedTask[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPushed, setIsPushed] = useState(false);

  useEffect(() => {
    if (notes.trim()) {
      setIsProcessing(true);
      const timer = setTimeout(() => {
        const parsed = parseMeetingNotes(notes);
        setTasks(parsed);
        setIsProcessing(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setTasks([]);
    }
  }, [notes]);

  const handlePushToBoard = () => {
    setIsPushed(true);
    setTimeout(() => setIsPushed(false), 3000);
  };

  const getUrgencyColor = (urgency: ParsedTask['urgency']) => {
    switch (urgency) {
      case 'critical': return 'text-accent-danger border-accent-danger/30 bg-accent-danger/10';
      case 'high': return 'text-accent-warning border-accent-warning/30 bg-accent-warning/10';
      case 'medium': return 'text-accent-primary border-accent-primary/30 bg-accent-primary/10';
      case 'low': return 'text-muted border-white/10 bg-white/5';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col gap-8 custom-scrollbar overflow-y-auto">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl accent-gradient">
            <ClipboardList className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Meeting Notes Parser</h1>
        </div>
        <p className="text-muted max-w-2xl">
          Paste your raw meeting notes below. SyncSphere AI will automatically extract tasks, owners, and blockers to keep your mission on track.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Input Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent-primary" />
              Raw Notes
            </h2>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-xs text-accent-primary"
              >
                <Sparkles className="w-3 h-3 animate-pulse" />
                AI Parsing...
              </motion.div>
            )}
          </div>
          
          <div className="relative group flex-1 min-h-[400px]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <textarea
              className="relative w-full h-full glass rounded-2xl p-6 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/30 transition-all resize-none font-mono text-sm leading-relaxed"
              placeholder="E.g.
- Finish the landing page by Friday @Sarah. Blocker: waiting for assets.
- [ ] Schedule team sync with @Alex on Monday. (Urgent)
- Need to update the API docs tomorrow."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </section>

        {/* Output Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-secondary" />
              Extracted Tasks
              <span className="ml-2 px-2 py-0.5 rounded-full bg-white/5 text-xs text-muted">
                {tasks.length} found
              </span>
            </h2>
            {tasks.length > 0 && (
              <button 
                onClick={handlePushToBoard}
                disabled={isPushed}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  isPushed 
                    ? "glass-success text-accent-success" 
                    : "accent-gradient text-white hover:shadow-glow-primary active:scale-95"
                )}
              >
                {isPushed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Pushed to Board
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Push to Mission Board
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 glass rounded-2xl p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full text-muted gap-4 text-center p-8"
                >
                  <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <ClipboardList className="w-12 h-12 opacity-20" />
                  </div>
                  <p className="text-sm">Start typing in the notes area to see AI extraction in action.</p>
                </motion.div>
              ) : (
                tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group glass-secondary rounded-xl p-4 border border-white/5 hover:border-white/10 transition-all hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border",
                            getUrgencyColor(task.urgency)
                          )}>
                            {task.urgency}
                          </span>
                          <h3 className="font-medium text-foreground group-hover:text-accent-primary transition-colors">
                            {task.text}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs">
                          {task.owner && (
                            <div className="flex items-center gap-1.5 text-muted">
                              <User className="w-3.5 h-3.5 text-accent-primary" />
                              <span className="text-foreground/80">@{task.owner}</span>
                            </div>
                          )}
                          {task.dueDate && (
                            <div className="flex items-center gap-1.5 text-muted">
                              <Calendar className="w-3.5 h-3.5 text-accent-secondary" />
                              <span className="text-foreground/80">{task.dueDate}</span>
                            </div>
                          )}
                        </div>

                        {task.blockers && task.blockers.length > 0 && (
                          <div className="mt-2 p-2 rounded-lg bg-accent-danger/5 border border-accent-danger/10 flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-accent-danger mt-0.5 shrink-0" />
                            <div className="text-[11px] text-accent-danger/90">
                              <span className="font-semibold mr-1">Blocker:</span>
                              {task.blockers.join(', ')}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button className="p-1.5 rounded-lg text-muted hover:text-accent-danger hover:bg-accent-danger/10 opacity-0 group-hover:opacity-100 transition-all">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>

      {/* Floating Action Hint */}
      <AnimatePresence>
        {isPushed && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-success px-6 py-3 rounded-2xl border border-accent-success/20 flex items-center gap-3 shadow-glow"
          >
            <CheckCircle2 className="w-5 h-5 text-accent-success" />
            <div className="text-sm font-medium">
              Successfully synced {tasks.length} tasks to the Mission Board
            </div>
            <div className="h-4 w-px bg-accent-success/20 mx-2" />
            <button className="text-xs font-bold text-accent-success hover:underline">
              VIEW BOARD
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
