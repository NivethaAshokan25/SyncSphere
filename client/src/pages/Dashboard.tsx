import { motion } from 'framer-motion';
import { Users, CheckCircle2, AlertCircle, Activity, TrendingUp, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { RiskScoreMeter } from '../components/ui/RiskScoreMeter';
import { cn } from '../utils/cn';

const velocityData = [
  { day: 'Mon', pts: 8 }, { day: 'Tue', pts: 5 }, { day: 'Wed', pts: 12 },
  { day: 'Thu', pts: 7 }, { day: 'Fri', pts: 14 }, { day: 'Sat', pts: 2 }, { day: 'Sun', pts: 0 },
];

const COLORS = ['#10b981', '#6366f1', '#64748b', '#ef4444'];

export const Dashboard = () => {
  const { tasks, team, blockers, riskScore, setActivePage, setShowHealthReport } = useAppStore();
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const blocked = tasks.filter(t => t.isBlocked).length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const pieData = [
    { name: 'Done', value: completed },
    { name: 'In Progress', value: inProgress },
    { name: 'Todo', value: todo },
    { name: 'Blocked', value: blocked },
  ];

  const kpis = [
    { label: 'Team Capacity', value: '94.2%', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '+5%' },
    { label: 'Sprint Velocity', value: '48 pts', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+12%' },
    { label: 'Active Blockers', value: `${blockers.length}`, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: blockers.length > 2 ? '⚠ High' : 'Low' },
    { label: 'Tasks Done', value: `${completed}/${tasks.length}`, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-500/10', trend: `${Math.round((completed/tasks.length)*100)}%` },
  ];

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Mission Control" subtitle="AI-powered team intelligence" showReportBtn />

      <div className="p-8 space-y-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Live Dashboard</span>
            </div>
            <h1 className="text-4xl font-black text-gradient tracking-tight">Good morning, Sarah 👋</h1>
            <p className="text-white/50 mt-1 font-medium">Your team's velocity is <span className="text-emerald-400 font-bold">up 12%</span> this week. {blockers.length > 0 && <span>AI detected <span className="text-rose-400 font-bold">{blockers.length} blockers</span> requiring attention.</span>}</p>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setShowHealthReport(true)}
            className="shrink-0 px-6 py-3 rounded-2xl glass border border-white/10 hover:border-accent-primary/30 text-sm font-bold transition-all flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent-primary" /> View Health Report
          </motion.button>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 border border-white/5 card-hover group">
              <div className="flex items-center justify-between mb-4">
                <div className={cn('p-2.5 rounded-xl', kpi.bg)}>
                  <kpi.icon className={cn('w-5 h-5', kpi.color)} />
                </div>
                <span className="text-[10px] font-black text-white/40 bg-white/5 px-2 py-1 rounded-lg">{kpi.trend}</span>
              </div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black text-white">{kpi.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Velocity Chart */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card rounded-3xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-black text-white">Sprint Velocity</h3>
                <p className="text-xs text-white/40 mt-0.5">Story points completed per day</p>
              </div>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">This Week</span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={velocityData}>
                  <defs>
                    <linearGradient id="velGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="day" stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <YAxis stroke="transparent" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, fontSize: 12 }} />
                  <Area type="monotone" dataKey="pts" stroke="#6366f1" strokeWidth={3} fill="url(#velGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Task Distribution + Risk */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="glass-card rounded-3xl p-6 border border-white/5">
              <h3 className="font-black text-white mb-4">Task Status</h3>
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={36} outerRadius={52} paddingAngle={4} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 flex-1">
                  {pieData.map((d, i) => (
                    <div key={d.name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                      <span className="text-xs text-white/60 flex-1">{d.name}</span>
                      <span className="text-xs font-bold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col items-center">
              <RiskScoreMeter score={riskScore} label="Sprint Risk" size="md" />
            </motion.div>
          </div>
        </div>

        {/* Tasks + Team */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          {/* Priority Tasks */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5">
              <h3 className="font-black text-white">Priority Missions</h3>
              <button onClick={() => setActivePage('Meeting Parser')} className="text-xs font-bold text-accent-primary hover:underline">+ Add from Meeting</button>
            </div>
            <div className="divide-y divide-white/5">
              {tasks.slice(0, 4).map((task) => (
                <div key={task.id} className={cn('p-5 flex items-center gap-4 hover:bg-white/3 transition-colors', task.isBlocked && 'blocker-pulse')}>
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0', task.assigneeColor)}>
                    {task.assigneeInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-white/40">{task.project}</span>
                      <span className="flex items-center gap-1 text-[10px] text-white/40"><Clock className="w-3 h-3" /> {task.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {task.isBlocked && <span className="text-[9px] font-black text-rose-400 bg-rose-500/15 border border-rose-500/20 px-2 py-0.5 rounded-full">BLOCKED</span>}
                    <span className={cn('text-[9px] font-black px-2 py-0.5 rounded-full', 
                      task.priority === 'high' ? 'badge-high' : task.priority === 'medium' ? 'badge-medium' : 'badge-low'
                    )}>{task.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Workload Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="glass-card rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 pb-4 border-b border-white/5">
              <h3 className="font-black text-white">Team Workload</h3>
            </div>
            <div className="p-4 space-y-3">
              {team.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="relative shrink-0">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black text-white', member.color)}>
                      {member.initials}
                    </div>
                    <span className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card',
                      member.status === 'online' ? 'status-online' : member.status === 'busy' ? 'status-busy' : member.status === 'away' ? 'status-away' : 'status-offline'
                    )} />
                    {member.workloadPercent > 85 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 border-2 border-card flex items-center justify-center">
                        <span className="text-[6px] font-black text-white">!</span>
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-white">{member.name}</span>
                      <span className={cn('text-xs font-black', member.workloadPercent > 85 ? 'text-rose-400' : member.workloadPercent > 65 ? 'text-amber-400' : 'text-emerald-400')}>
                        {member.workloadPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.workloadPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                        className={cn('h-full rounded-full', member.workloadPercent > 85 ? 'danger-gradient' : member.workloadPercent > 65 ? 'bg-amber-500' : 'success-gradient')}
                      />
                    </div>
                    <p className="text-[10px] text-white/30 mt-1">{member.tasksCount} tasks · {member.completedCount} done</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
