import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { RiskScoreMeter } from '../components/ui/RiskScoreMeter';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const cycleData = [
  { sprint: 'S1', velocity: 34 }, { sprint: 'S2', velocity: 41 }, { sprint: 'S3', velocity: 38 },
  { sprint: 'S4', velocity: 52 }, { sprint: 'S5', velocity: 48 }, { sprint: 'S6', velocity: 55 },
];

const teamEffData = [
  { name: 'Sarah', score: 82 }, { name: 'Alex', score: 74 }, { name: 'Elena', score: 91 }, { name: 'Marcus', score: 68 },
];

const heatmap = Array.from({ length: 35 }, (_, i) => ({
  intensity: Math.random(),
  isWeekend: i % 7 >= 5,
}));

export const WorkflowAnalytics = () => {
  const { tasks, blockers, riskScore } = useAppStore();
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Workflow Analytics" subtitle="AI-powered efficiency insights" showReportBtn />

      <div className="p-8 space-y-8 pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-gradient">Workflow Analytics</h1>
          <p className="text-white/50 mt-1">Deep insights into team efficiency, delivery patterns, and bottleneck detection.</p>
        </motion.div>

        {/* Top Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key Performance Indicators">
          {[
            { label: 'Avg Cycle Time', value: '3.2 Days', icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
            { label: 'Throughput', value: `${completed + 12}/wk`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Collab Rate', value: '86%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            { label: 'Blocker Rate', value: `${Math.round((blockers.length/Math.max(tasks.length,1))*100)}%`, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`glass-card rounded-2xl p-5 border border-white/5 card-hover ${s.bg}`}
              role="status"
              aria-label={`${s.label}: ${s.value}`}
            >
              <div className={`p-2.5 rounded-xl inline-flex mb-4 ${s.bg}`} aria-hidden="true"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-wider mb-1">{s.label}</p>
              <h3 className="text-2xl font-black text-white">{s.value}</h3>
            </motion.div>
          ))}
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="font-black text-white mb-1">Sprint Velocity Trend</h3>
            <p className="text-xs text-white/40 mb-6">Story points per sprint</p>
            <div className="h-52" role="img" aria-label="Line chart showing sprint velocity trend over 6 sprints. Velocity is increasing from 34 to 55 points.">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cycleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sprintGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="sprint" stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 12 }} />
                  <Area type="monotone" dataKey="velocity" stroke="#a855f7" strokeWidth={3} fill="url(#sprintGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="font-black text-white mb-1">Team Efficiency Score</h3>
            <p className="text-xs text-white/40 mb-6">AI-computed individual performance</p>
            <div className="h-52" role="img" aria-label="Bar chart showing team efficiency scores. Sarah leads with 82, followed by Elena at 91, Alex at 74, and Marcus at 68.">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamEffData} barCategoryGap="30%" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 12 }} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {teamEffData.map((_, i) => <Cell key={i} fill={['#6366f1','#a855f7','#10b981','#f59e0b'][i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Heatmap + Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/5">
            <h3 className="font-black text-white mb-1">Activity Heatmap</h3>
            <p className="text-xs text-white/40 mb-6">5 weeks of team activity intensity</p>
            <div className="grid grid-cols-7 gap-2" role="grid" aria-label="Activity heatmap for the last 5 weeks">
              {['M','T','W','T','F','S','S'].map(d => <p key={d} className="text-center text-[9px] font-black text-white/20" aria-hidden="true">{d}</p>)}
              {heatmap.map((cell, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="aspect-square rounded-lg transition-all"
                  role="gridcell"
                  aria-label={`Activity intensity: ${Math.round(cell.intensity * 100)}% on day ${i + 1}${cell.isWeekend ? ' (Weekend)' : ''}`}
                  style={{
                    background: cell.isWeekend ? 'rgba(255,255,255,0.02)' :
                      cell.intensity > 0.7 ? '#6366f1' : cell.intensity > 0.4 ? 'rgba(99,102,241,0.4)' : 'rgba(99,102,241,0.1)',
                    boxShadow: cell.intensity > 0.7 ? '0 0 8px rgba(99,102,241,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 justify-end">
              <span className="text-[10px] text-white/30">Less</span>
              {[0.05, 0.2, 0.4, 0.7, 1].map(v => (
                <div key={v} className="w-3 h-3 rounded-sm" style={{ background: `rgba(99,102,241,${v})` }} />
              ))}
              <span className="text-[10px] text-white/30">More</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col items-center justify-center">
            <h3 className="font-black text-white mb-6">Sprint Risk</h3>
            <RiskScoreMeter score={riskScore} label="Project Risk" size="lg" />
            <div className="mt-6 space-y-3 w-full">
              {[
                { label: 'Blocker Risk', value: blockers.length > 1 ? 'High' : 'Low', color: blockers.length > 1 ? 'text-rose-400' : 'text-emerald-400' },
                { label: 'Delivery Risk', value: 'Medium', color: 'text-amber-400' },
                { label: 'Team Risk', value: 'Low', color: 'text-emerald-400' },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-xs text-white/50 font-bold">{r.label}</span>
                  <span className={`text-xs font-black ${r.color}`}>{r.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
