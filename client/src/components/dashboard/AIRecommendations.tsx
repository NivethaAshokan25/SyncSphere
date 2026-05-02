import { Sparkles, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const recommendations = [
  { 
    id: 1, 
    type: 'optimization', 
    text: 'Reassign 2 backend tasks to John to balance workload.',
    impact: 'High' 
  },
  { 
    id: 2, 
    type: 'meeting', 
    text: 'Shorten "Weekly Sync" to 15 mins based on last 4 meetings.',
    impact: 'Medium' 
  },
  { 
    id: 3, 
    type: 'blocker', 
    text: 'Auto-ping designer for missing Figma assets in Task #402.',
    impact: 'Critical' 
  },
];

export const AIRecommendations = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass p-8 rounded-[2rem] h-full relative overflow-hidden group border-accent-primary/20"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-accent-primary/20 border border-accent-primary/30 text-accent-primary shadow-glow-primary">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Insights</h3>
            <p className="text-muted text-sm font-medium">Generated 2 minutes ago</p>
          </div>
        </div>
        <button className="text-xs font-bold text-accent-primary hover:underline">View All</button>
      </div>

      <div className="space-y-4 relative z-10">
        {recommendations.map((rec, index) => (
          <motion.div 
            key={rec.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-primary/40 transition-all cursor-pointer group/item"
          >
            <div className="flex gap-4">
              <div className="mt-1">
                {rec.type === 'optimization' ? <Zap className="w-4 h-4 text-accent-warning" /> : 
                 rec.type === 'meeting' ? <Lightbulb className="w-4 h-4 text-accent-success" /> : 
                 <Zap className="w-4 h-4 text-accent-danger" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white/90 leading-relaxed mb-2">
                  {rec.text}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted">
                    Impact: <span className="text-accent-primary">{rec.impact}</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-muted group-hover/item:text-white transition-all transform group-hover/item:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-bold text-white">Optimize Workflow</span>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-black text-xs font-black hover:scale-105 transition-transform">
          APPLY ALL
        </button>
      </div>
    </motion.div>
  );
};
