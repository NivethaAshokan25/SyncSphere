import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Target, FileText, BarChart3, MessageSquare, AlertCircle, Zap, ArrowRight, CheckCircle2, Users, Activity, Sparkles, Command } from 'lucide-react';

const demos = [
  {
    icon: Target, label: 'Mission Control', page: 'Mission Control',
    color: 'from-indigo-500 to-blue-600', textColor: 'text-indigo-400',
    description: 'AI-powered command center with live KPIs and smart task prioritization.',
    tag: 'Core Dashboard',
  },
  {
    icon: FileText, label: 'Meeting Parser', page: 'Meeting Parser',
    color: 'from-purple-500 to-pink-600', textColor: 'text-purple-400',
    description: 'Paste a transcript → tasks assigned and scheduled in seconds.',
    tag: '🤖 AI Feature',
  },
  {
    icon: MessageSquare, label: 'Team Pulse', page: 'Team Pulse',
    color: 'from-teal-500 to-cyan-600', textColor: 'text-teal-400',
    description: 'Real-time sentiment analysis and team activity stream.',
    tag: 'Live Signal',
  },
  {
    icon: BarChart3, label: 'Analytics', page: 'Analytics',
    color: 'from-amber-500 to-orange-600', textColor: 'text-amber-400',
    description: 'Velocity heatmaps, efficiency scores, and risk meter.',
    tag: 'Insights',
  },
  {
    icon: AlertCircle, label: 'Blockers', page: 'Mission Control',
    color: 'from-rose-500 to-red-600', textColor: 'text-rose-400',
    description: 'Urgent flashing alerts and one-click resolution flow.',
    tag: '🔴 Critical',
  },
];

const painPoints = [
  { icon: Users, text: 'Context-switching across 5+ tools kills focus' },
  { icon: FileText, text: 'Meeting action items get lost in notes' },
  { icon: AlertCircle, text: 'Blockers go invisible until it\'s too late' },
  { icon: Activity, text: 'No single source of truth for team status' },
];

const solutions = [
  { text: 'One unified AI-powered command center', color: 'text-indigo-400' },
  { text: 'Meetings auto-converted to actionable tasks', color: 'text-purple-400' },
  { text: 'Predictive blocker detection & live alerts', color: 'text-rose-400' },
  { text: 'Real-time team pulse + workload visibility', color: 'text-teal-400' },
];

export const LandingDemo = () => {
  const { setActivePage, setShowCommandPalette, setShowOnboarding, setShowHealthReport } = useAppStore();

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background relative">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 py-16 space-y-24">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-accent-primary" />
            <span className="text-sm font-black text-accent-primary">SyncSphere AI · Hackathon Demo 2026</span>
            <Sparkles className="w-4 h-4 text-accent-primary" />
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-6">
            <span className="text-gradient">Mission Intelligence</span>
            <br />
            <span className="text-white">for Modern Teams</span>
          </h1>

          <p className="text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            The AI platform that turns meetings, blockers, and team signals into
            <span className="text-white font-bold"> coordinated execution</span> — automatically.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowOnboarding(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl accent-gradient text-white font-black text-base shadow-xl glow-primary">
              <Zap className="w-5 h-5 fill-white" />
              Start 3-Minute Demo Tour
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActivePage('Mission Control')}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-bold text-base hover:border-white/20 transition-all">
              Jump to Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Pain Points & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8 border border-white/5">
            <h2 className="text-xl font-black text-white/50 mb-6">😤 The Problem</h2>
            <ul className="space-y-4">
              {painPoints.map((p, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white/5 shrink-0">
                    <p.icon className="w-4 h-4 text-white/40" />
                  </div>
                  <span className="text-white/60 font-medium">{p.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8 border border-accent-primary/20">
            <h2 className="text-xl font-black text-accent-primary mb-6">✨ SyncSphere Solves It</h2>
            <ul className="space-y-4">
              {solutions.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-center gap-3">
                  <CheckCircle2 className={`w-5 h-5 shrink-0 ${s.color}`} />
                  <span className="text-white font-semibold">{s.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Feature Demo Cards */}
        <div>
          <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-2xl font-black text-center text-white mb-8">
            🚀 Explore Each Feature
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demos.map((demo, i) => (
              <motion.button key={demo.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}
                onClick={() => setActivePage(demo.page)}
                className="glass-card rounded-3xl p-6 border border-white/5 hover:border-white/15 transition-all text-left group"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${demo.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <demo.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${demo.textColor} bg-white/5`}>
                  {demo.tag}
                </div>
                <h3 className="font-black text-white text-base mb-2">{demo.label}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{demo.description}</p>
                <div className={`flex items-center gap-1.5 mt-4 ${demo.textColor} text-xs font-black`}>
                  Demo This <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
            {/* AI Command Palette card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowCommandPalette(true)}
              className="glass-card rounded-3xl p-6 border border-white/5 hover:border-white/15 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-2xl accent-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Command className="w-6 h-6 text-white" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 text-accent-primary bg-white/5 inline-block">
                ⌘K Feature
              </div>
              <h3 className="font-black text-white text-base mb-2">AI Command Palette</h3>
              <p className="text-sm text-white/50 leading-relaxed">Press ⌘K to ask SyncSphere anything. Navigate, generate standups, detect blockers.</p>
              <div className="flex items-center gap-1.5 mt-4 text-accent-primary text-xs font-black">
                Try it Now <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
            {/* Health Report card */}
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowHealthReport(true)}
              className="glass-card rounded-3xl p-6 border border-emerald-500/20 hover:border-emerald-500/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-2xl success-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 text-emerald-400 bg-white/5 inline-block">
                📊 Report
              </div>
              <h3 className="font-black text-white text-base mb-2">Health Report PDF</h3>
              <p className="text-sm text-white/50 leading-relaxed">One-click team health analysis with AI recommendations. Download as PDF.</p>
              <div className="flex items-center gap-1.5 mt-4 text-emerald-400 text-xs font-black">
                Generate Report <ArrowRight className="w-3 h-3" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-center pb-8">
          <p className="text-white/20 text-sm font-bold">Built with ❤️ for the Hackathon · SyncSphere AI 2026</p>
          <p className="text-white/10 text-xs mt-1">React · Vite · Tailwind CSS · Framer Motion · Express · Google Cloud Run</p>
        </motion.div>
      </div>
    </div>
  );
};
