import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const AICoordinatorPanel = () => {
  return (
    <div className="glass p-8 rounded-[2.5rem] h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-primary/20 blur-[100px] rounded-full group-hover:bg-accent-secondary/30 transition-all duration-500" />
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-accent-primary shadow-glow-primary">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-black text-white">AI Coordinator</h3>
      </div>

      <div className="flex-1 space-y-6">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Observation</span>
            <Zap className="w-3 h-3 text-accent-warning fill-accent-warning" />
          </div>
          <p className="text-sm font-medium text-white/90 leading-relaxed">
            "Team velocity has increased by <span className="text-accent-success font-bold">12.4%</span> since yesterday. Most progress made on the <span className="text-accent-primary font-bold">Nova Platform</span> mission."
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-accent-danger uppercase tracking-widest">Critical Alert</span>
          </div>
          <p className="text-sm font-medium text-white/90 leading-relaxed">
            "Elena V. is currently blocked. This may delay the <span className="text-white font-bold underline decoration-accent-danger">Sprint Finish</span> by 48 hours if not resolved."
          </p>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-8 p-4 rounded-2xl accent-gradient flex items-center justify-center gap-2 text-sm font-black shadow-glow-primary"
      >
        ASK COORDINATOR
        <ArrowUpRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
};
