import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, ChevronRight, CheckCircle2, Clock, User, Sparkles, Mic } from 'lucide-react';
import type { Task } from '../store/useAppStore';
import { useAppStore } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { VoiceNoteWidget } from '../components/ui/VoiceNoteWidget';
import { cn } from '../utils/cn';

const sampleTranscript = `Sarah: Alright team, let's wrap up. Alex, can you get the API docs updated by Thursday?
Alex: Sure, I'll handle that. Also need to deploy the new auth service to staging before EOD Friday.
Sarah: Good. Elena, we need the mobile design tokens finalized — can you do that by Wednesday?
Elena: Absolutely, I'll also add dark mode variants.
Sarah: Great. Marcus, the DB migration scripts need testing. Can you pair with Alex on that?
Marcus: Yes, I'll set up the test environment today and we'll run through it tomorrow morning.`;

const parsedTasks: Task[] = [
  { id: 'mp1', title: 'Update API documentation', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-rose-500', status: 'todo', priority: 'high', dueDate: 'Jun 5', project: 'Nova Platform', isBlocked: false, source: 'meeting-parsed' },
  { id: 'mp2', title: 'Deploy auth service to staging', assignee: 'Alex Rivera', assigneeInitials: 'AR', assigneeColor: 'bg-rose-500', status: 'todo', priority: 'high', dueDate: 'Jun 6', project: 'Nova Platform', isBlocked: false, source: 'meeting-parsed' },
  { id: 'mp3', title: 'Finalize mobile design tokens + dark mode', assignee: 'Elena Vance', assigneeInitials: 'EV', assigneeColor: 'bg-purple-500', status: 'todo', priority: 'medium', dueDate: 'Jun 4', project: 'SyncSphere Mobile', isBlocked: false, source: 'meeting-parsed' },
  { id: 'mp4', title: 'Set up DB migration test environment', assignee: 'Marcus Wright', assigneeInitials: 'MW', assigneeColor: 'bg-blue-500', status: 'todo', priority: 'high', dueDate: 'Jun 3', project: 'Nova Platform', isBlocked: false, source: 'meeting-parsed' },
];

type Stage = 'idle' | 'parsing' | 'done';

export const MeetingParser = () => {
  const { meetings, addTasksFromMeeting } = useAppStore();
  const [stage, setStage] = useState<Stage>('idle');
  const [transcript, setTranscript] = useState('');
  const [addedAll, setAddedAll] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [progress, setProgress] = useState(0);

  const runParse = () => {
    if (!transcript.trim()) return;
    setStage('parsing');
    setProgress(0);
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 8; }), 120);
    setTimeout(() => { clearInterval(iv); setProgress(100); setStage('done'); }, 1800);
  };

  const addAllTasks = () => {
    addTasksFromMeeting(parsedTasks, 'Parsed Meeting');
    setAddedAll(true);
  };

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Meeting Parser" subtitle="Meetings → Tasks automatically" showStandupBtn={false} />

      <div className="p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">AI Extraction Engine</span>
          </div>
          <h1 className="text-4xl font-black text-gradient">Meeting Parser</h1>
          <p className="text-white/50 mt-1">Paste a transcript or upload audio. AI extracts tasks, assigns owners, and sets deadlines.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-white">Meeting Transcript</h3>
                <div className="flex gap-2">
                  <button onClick={() => setShowVoice(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-black text-rose-400 hover:bg-rose-500/20 transition-all">
                    <Mic className="w-3 h-3" /> Voice Note
                  </button>
                  <button onClick={() => setTranscript(sampleTranscript)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-primary/10 border border-accent-primary/20 text-xs font-black text-accent-primary hover:bg-accent-primary/20 transition-all">
                    Load Sample
                  </button>
                </div>
              </div>
              <textarea
                value={transcript}
                onChange={e => { setTranscript(e.target.value); setStage('idle'); setAddedAll(false); }}
                placeholder="Paste your meeting notes or transcript here..."
                className="w-full h-52 bg-transparent p-5 text-sm text-white/80 placeholder-white/20 resize-none focus:outline-none font-mono leading-relaxed"
              />
              <div className="p-4 border-t border-white/5">
                <motion.button
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  onClick={runParse}
                  disabled={stage === 'parsing' || !transcript.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl accent-gradient text-sm font-black text-white glow-primary hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {stage === 'parsing' ? <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Parsing... {progress}%
                  </> : <><Zap className="w-4 h-4 fill-white" /> Extract Tasks with AI</>}
                </motion.button>
                {stage === 'parsing' && (
                  <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div animate={{ width: `${progress}%` }} className="h-full accent-gradient" transition={{ ease: 'easeOut' }} />
                  </div>
                )}
              </div>
            </div>

            {/* Recent Meetings */}
            <div className="glass-card rounded-3xl border border-white/5">
              <div className="p-5 border-b border-white/5">
                <h3 className="font-black text-white">Recent Sessions</h3>
              </div>
              <div className="divide-y divide-white/5">
                {meetings.map(m => (
                  <div key={m.id} className="p-4 flex items-center gap-4 hover:bg-white/3 transition-colors cursor-pointer">
                    <div className="p-2.5 rounded-xl bg-accent-primary/10 shrink-0">
                      <FileText className="w-4 h-4 text-accent-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white">{m.title}</p>
                      <p className="text-[11px] text-white/40 mt-0.5">{m.date} · {m.duration} · <span className="text-emerald-400">{m.tasksExtracted} tasks</span> · {m.confidence}% confidence</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Extracted Tasks */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {stage === 'done' ? (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="glass-card rounded-3xl border border-white/5 overflow-hidden h-full">
                  <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-white">Extracted Tasks</h3>
                      <p className="text-[11px] text-emerald-400 font-bold mt-0.5">{parsedTasks.length} tasks · 96% confidence</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={addAllTasks}
                      disabled={addedAll}
                      className={cn('flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all', addedAll ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'accent-gradient text-white')}>
                      {addedAll ? <><CheckCircle2 className="w-3.5 h-3.5" /> Added!</> : 'Add All →'}
                    </motion.button>
                  </div>
                  <div className="p-4 space-y-3">
                    {parsedTasks.map((task, i) => (
                      <motion.div key={task.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-2xl bg-white/3 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-start gap-3">
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0', task.assigneeColor)}>
                            {task.assigneeInitials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-white leading-tight">{task.title}</p>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                              <span className="flex items-center gap-1 text-[10px] text-white/40"><User className="w-3 h-3" />{task.assignee.split(' ')[0]}</span>
                              <span className="flex items-center gap-1 text-[10px] text-white/40"><Clock className="w-3 h-3" />{task.dueDate}</span>
                              <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full', task.priority === 'high' ? 'badge-high' : 'badge-medium')}>{task.priority}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="glass-card rounded-3xl border border-dashed border-white/10 h-64 flex flex-col items-center justify-center gap-3 text-center p-8">
                  <div className="p-4 rounded-2xl bg-white/5"><Zap className="w-8 h-8 text-white/20" /></div>
                  <p className="text-white/40 font-medium text-sm">Paste a transcript and click<br />Extract Tasks to see AI magic</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Voice Widget Overlay */}
      <AnimatePresence>
        {showVoice && (
          <div className="fixed bottom-24 right-6 z-50">
            <VoiceNoteWidget onClose={() => setShowVoice(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
