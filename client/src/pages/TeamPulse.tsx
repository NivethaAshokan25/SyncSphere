import { motion } from 'framer-motion';
import { TrendingUp, Hash, ArrowRight, AlertCircle, CheckCircle2, Clock, UserPlus, Filter, MoreVertical, MessageSquare } from 'lucide-react';
import { useAppStore, TeamMember } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { CommunicationVisibilityEngine } from '../components/timeline/CommunicationVisibilityEngine';
import { cn } from '../utils/cn';

const sentimentData = [
  { label: 'Positive', value: 68, color: 'bg-emerald-500' },
  { label: 'Neutral', value: 24, color: 'bg-slate-500' },
  { label: 'Negative', value: 8, color: 'bg-rose-500' },
];

export const TeamPulse = () => {
  const { team, tasks, blockers } = useAppStore();
  const recentActivity = tasks.filter(t => t.status === 'in-progress' || t.status === 'completed').slice(0, 4);

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Team Pulse" subtitle="Real-time activity intelligence" />

      <div className="p-8 space-y-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-gradient">Team Pulse</h1>
          <p className="text-white/50 mt-1">AI-powered real-time visibility into your team's activity and collaboration health.</p>
        </motion.div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Sentiment', value: 'Positive 😊', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Messages Today', value: '1,248', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { label: 'Commits', value: '42 pushed', color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Blockers', value: `${blockers.length} active`, color: blockers.length > 0 ? 'text-rose-400' : 'text-emerald-400', bg: blockers.length > 0 ? 'bg-rose-500/10' : 'bg-emerald-500/10' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={cn('glass-card rounded-2xl p-5 border border-white/5 card-hover', stat.bg)}>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className={cn('text-xl font-black', stat.color)}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Stream */}
          <div className="lg:col-span-2 h-[600px]">
            <CommunicationVisibilityEngine />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Sentiment Breakdown */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-6 border border-white/5">
              <h3 className="font-black text-white mb-5">Sentiment Analysis</h3>
              <div className="space-y-3">
                {sentimentData.map(s => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white/60">{s.label}</span>
                      <span className="text-xs font-black text-white">{s.value}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${s.value}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        className={cn('h-full rounded-full', s.color)} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Team Online */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="glass-card rounded-3xl border border-white/5 overflow-hidden">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-white">Team Status</h3>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {team.filter(m => m.status === 'online').length} Online
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {team.map(member => (
                  <div key={member.id} className="flex items-center gap-3 p-4 hover:bg-white/3 transition-colors">
                    <div className="relative shrink-0">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white', member.color)}>
                        {member.initials}
                      </div>
                      <span className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card',
                        member.status === 'online' ? 'status-online' : member.status === 'busy' ? 'status-busy' : member.status === 'away' ? 'status-away' : 'status-offline'
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{member.name}</p>
                      <p className="text-[10px] text-white/40">{member.role} · {member.status}</p>
                    </div>
                    <div className={cn('text-[10px] font-black px-2 py-1 rounded-lg',
                      member.workloadPercent > 85 ? 'text-rose-400 bg-rose-500/10' : member.workloadPercent > 65 ? 'text-amber-400 bg-amber-500/10' : 'text-emerald-400 bg-emerald-500/10'
                    )}>
                      {member.workloadPercent}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
