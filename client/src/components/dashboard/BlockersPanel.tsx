import { ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const blockers = [
  { id: 1, title: 'API Authentication Failure', severity: 'High', team: 'Backend' },
  { id: 2, title: 'Design Assets Missing', severity: 'Medium', team: 'Design' },
];

export const BlockersPanel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-danger p-8 rounded-[2rem] h-full relative overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-2xl bg-accent-danger/20 border border-accent-danger/30 text-accent-danger">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Critical Blockers</h3>
          <p className="text-accent-danger/80 text-sm font-medium">Action required immediately</p>
        </div>
      </div>

      <div className="space-y-4">
        {blockers.map((blocker, index) => (
          <motion.div 
            key={blocker.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 rounded-full bg-accent-danger" />
              <div>
                <h4 className="text-sm font-bold text-white">{blocker.title}</h4>
                <p className="text-xs text-muted font-medium">{blocker.team} • {blocker.severity} Priority</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-white transition-colors group-hover:translate-x-1 transform" />
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-4 rounded-2xl bg-accent-danger text-white font-bold hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-lg shadow-accent-danger/20">
        Resolve All Blockers
      </button>
    </motion.div>
  );
};
