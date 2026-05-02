import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, FileText, BarChart3, MessageSquare, ChevronRight, X, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const steps = [
  {
    id: 0, icon: Sparkles, title: 'Welcome to SyncSphere AI', color: 'from-indigo-500 to-purple-600',
    subtitle: 'Mission Intelligence Platform',
    description: 'The AI-powered coordination layer your team has been missing. We turn meetings, blockers, and signals into actionable intelligence.',
    cta: 'Begin Tour',
  },
  {
    id: 1, icon: Target, title: 'Mission Control', color: 'from-indigo-500 to-blue-600',
    subtitle: 'Your team\'s command center',
    description: 'See every task, blocker, and KPI at a glance. The AI Coordinator watches all signals and surfaces what matters most — right now.',
    cta: 'Explore Dashboard',
  },
  {
    id: 2, icon: FileText, title: 'AI Meeting Parser', color: 'from-purple-500 to-pink-600',
    subtitle: 'Meetings → Tasks automatically',
    description: 'Paste any meeting transcript or upload audio. AI extracts tasks, assigns owners, sets priorities — in seconds, not hours.',
    cta: 'Try it Live',
  },
  {
    id: 3, icon: MessageSquare, title: 'Team Pulse', color: 'from-teal-500 to-cyan-600',
    subtitle: 'Real-time team activity stream',
    description: 'Watch your team\'s activity in real time. AI identifies sentiment patterns and surfaces collaboration risks before they become blockers.',
    cta: 'See the Pulse',
  },
  {
    id: 4, icon: BarChart3, title: 'Workflow Analytics', color: 'from-amber-500 to-orange-600',
    subtitle: 'AI-powered efficiency insights',
    description: 'Velocity heatmaps, dependency maps, and bottleneck detection. Understand exactly where your sprints slow down and why.',
    cta: 'View Analytics',
  },
];

const pageMap: Record<number, string> = {
  1: 'Mission Control', 2: 'Meeting Parser', 3: 'Team Pulse', 4: 'Analytics'
};

export const OnboardingWalkthrough = () => {
  const { showOnboarding, setShowOnboarding, setActivePage } = useAppStore();
  const [step, setStep] = useState(0);

  useEffect(() => { if (showOnboarding) setStep(0); }, [showOnboarding]);

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const handleCta = () => {
    if (step === 0) { setStep(1); return; }
    if (pageMap[step]) setActivePage(pageMap[step]);
    if (isLast) setShowOnboarding(false);
    else setStep(s => s + 1);
  };

  return (
    <AnimatePresence>
      {showOnboarding && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[200]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', damping: 28 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.35 }}
                  className="glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
                >
                  {/* Hero */}
                  <div className={`relative bg-gradient-to-br ${current.color} p-10 pb-16`}>
                    <button onClick={() => setShowOnboarding(false)} className="absolute top-4 right-4 p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white/60 hover:text-white transition-all">
                      <X className="w-4 h-4" />
                    </button>
                    <div className="p-4 rounded-2xl bg-white/20 inline-flex mb-6">
                      <current.icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2">{current.subtitle}</p>
                    <h2 className="text-3xl font-black text-white leading-tight">{current.title}</h2>
                  </div>

                  <div className="p-8 -mt-8">
                    <div className="glass rounded-3xl p-6 border border-white/10 mb-6">
                      <p className="text-white/80 font-medium leading-relaxed">{current.description}</p>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-2 mb-6">
                      {steps.map((_, i) => (
                        <button key={i} onClick={() => setStep(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-8 accent-gradient' : 'w-3 bg-white/15 hover:bg-white/30'}`} />
                      ))}
                      <span className="ml-auto text-[10px] text-white/30 font-bold">{step + 1}/{steps.length}</span>
                    </div>

                    <div className="flex gap-3">
                      {step > 0 && (
                        <button onClick={() => setStep(s => s - 1)} className="px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 font-bold text-sm text-white/60 transition-all">
                          Back
                        </button>
                      )}
                      <button onClick={handleCta}
                        className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-sm text-white transition-all active:scale-95 bg-gradient-to-r ${current.color}`}>
                        {current.cta}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
