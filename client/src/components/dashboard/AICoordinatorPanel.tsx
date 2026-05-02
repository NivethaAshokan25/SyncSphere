import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Clock, 
  MessageSquare, 
  UserPlus, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  BrainCircuit
} from 'lucide-react';

const InsightCard = ({ icon: Icon, title, content, color, action }: { 
  icon: any, 
  title: string, 
  content: string | React.ReactNode, 
  color: string,
  action?: string
}) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-secondary rounded-2xl p-5 border-l-4 border-l-accent-primary group cursor-pointer"
    style={{ borderLeftColor: `var(--color-accent-${color})` }}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-xl bg-accent-${color}/10 text-accent-${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      {action && (
        <span className="text-xs font-medium text-muted group-hover:text-foreground transition-colors flex items-center gap-1">
          {action} <ArrowRight className="w-3 h-3" />
        </span>
      )}
    </div>
    <h4 className="font-bold text-sm mb-1">{title}</h4>
    <div className="text-xs text-muted leading-relaxed">
      {content}
    </div>
  </motion.div>
);

export const AICoordinatorPanel = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="glass rounded-3xl p-8 h-full flex flex-col space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-primary blur-lg opacity-40 animate-pulse"></div>
            <div className="relative p-2 bg-accent-primary/20 rounded-xl border border-accent-primary/30">
              <BrainCircuit className="w-6 h-6 text-accent-primary" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Coordinator</h2>
            <p className="text-xs text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-success animate-pulse" />
              Agent Active • Analyzing context
            </p>
          </div>
        </div>
      </div>

      {/* Daily Standup Summary */}
      <motion.div variants={item} className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-accent-secondary">
          <Sparkles className="w-4 h-4" />
          Standup Summary
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm leading-relaxed text-muted italic">
          "Team focus is shifting towards the <span className="text-foreground font-medium">Q3 Deployment</span>. Alex resolved the blocking API issue, but <span className="text-foreground font-medium">David</span> is currently stalled by pending design approvals. Overall velocity is up 12%."
        </div>
      </motion.div>

      {/* Priority Insights */}
      <div className="grid grid-cols-1 gap-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
        <motion.div variants={item}>
          <InsightCard 
            icon={Clock}
            title="Pending Followups"
            content="3 tasks are overdue. The 'Database Migration' task has been sitting for 48 hours."
            color="warning"
            action="Ping Owner"
          />
        </motion.div>

        <motion.div variants={item}>
          <InsightCard 
            icon={MessageSquare}
            title="Waiting on Responses"
            content={
              <ul className="space-y-1">
                <li>• <span className="text-foreground">Sarah</span> is waiting on <span className="text-foreground">James</span> for API docs.</li>
                <li>• <span className="text-foreground">Marketing</span> needs feedback on assets.</li>
              </ul>
            }
            color="primary"
            action="Nudge"
          />
        </motion.div>

        <motion.div variants={item}>
          <InsightCard 
            icon={AlertTriangle}
            title="Overloaded Teammates"
            content="Marcus has 8 active tasks (30% over capacity). Consider redistributing 2 tasks to Elena."
            color="danger"
            action="View Load"
          />
        </motion.div>

        <motion.div variants={item}>
          <InsightCard 
            icon={UserPlus}
            title="Sync Recommendations"
            content="Sarah and Marcus haven't synced on 'User Auth' in 3 days. Recommend a 15-min touchbase."
            color="secondary"
            action="Schedule"
          />
        </motion.div>
      </div>

      {/* Footer / Quick Action */}
      <motion.button 
        variants={item}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl accent-gradient font-bold shadow-glow-primary flex items-center justify-center gap-2"
      >
        <TrendingUp className="w-4 h-4" />
        Generate Full Report
      </motion.button>
    </motion.div>
  );
};
