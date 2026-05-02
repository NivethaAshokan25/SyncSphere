import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Zap, Users } from 'lucide-react';
import { useTeamHealth } from '../../hooks/useTeamHealth';
import { cn } from '../../utils/cn';

export const TeamHealthRadar = () => {
  const { score, risk, burnout, collaboration } = useTeamHealth();

  const getHealthColor = (val: number) => {
    if (val > 80) return 'text-emerald-400';
    if (val > 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  const metrics = [
    { label: 'Project Risk', value: risk, icon: ShieldAlert, color: risk > 50 ? 'text-rose-400' : 'text-emerald-400' },
    { label: 'Burnout Alert', value: burnout, icon: Zap, color: burnout > 50 ? 'text-rose-400' : 'text-amber-400' },
    { label: 'Collaboration', value: collaboration, icon: Users, color: collaboration > 70 ? 'text-emerald-400' : 'text-amber-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center relative py-4">
        {/* Animated Radial Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-3xl overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: 360 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className={cn("w-64 h-64 rounded-full", score > 70 ? 'bg-emerald-500' : 'bg-rose-500')} 
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4"
          >
            <Activity className="w-3 h-3 text-accent-primary" />
            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Team Intel Engine</span>
          </motion.div>
          
          <div className="flex items-center justify-center mb-2">
            <motion.h2 
              key={score}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("text-7xl font-black tracking-tighter", getHealthColor(score))}
            >
              {score}%
            </motion.h2>
          </div>
          <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em]">Synchronized Health</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {metrics.map((m, i) => (
          <motion.div 
            key={m.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 group-hover:bg-accent-primary/10 transition-colors">
                <m.icon className={cn("w-4 h-4", m.color)} />
              </div>
              <span className="text-xs font-black text-white/40 uppercase tracking-wider">{m.label}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className={cn("text-sm font-black", m.color)}>{m.value}%</span>
              <div className="w-20 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  className={cn("h-full", m.color.replace('text-', 'bg-'))} 
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-2">
        <div className="p-4 rounded-2xl bg-accent-primary/5 border border-accent-primary/10">
          <p className="text-[10px] font-bold text-accent-primary leading-relaxed">
            {score > 80 
              ? "⚡ Team stability is exceptional. Velocity is currently exceeding the 14-day average." 
              : "⚠️ Slight friction detected in collaboration flow. Monitor blocker resolution times."}
          </p>
        </div>
      </div>
    </div>
  );
};
