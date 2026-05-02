import { useMemo, useCallback } from 'react';
import { motion as m } from 'framer-motion';
import { Users, CheckCircle2, AlertCircle, Activity, Play, FileText } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { TopNav } from '../components/layout/TopNav';
import { TeamHealthRadar } from '../components/ui/TeamHealthRadar';
import { Card, Button, Badge } from '../components/common';
import { cn } from '../utils/cn';

const velocityData = [
  { day: 'Mon', pts: 8 }, { day: 'Tue', pts: 5 }, { day: 'Wed', pts: 12 },
  { day: 'Thu', pts: 7 }, { day: 'Fri', pts: 14 }, { day: 'Sat', pts: 2 }, { day: 'Sun', pts: 0 },
];

const COLORS = ['#10b981', '#6366f1', '#64748b', '#ef4444'];

/**
 * Dashboard: The Strategic Intelligence Hub
 * Refactored for senior-grade performance and visual excellence.
 */
export const Dashboard = ({ onStartTour }: { onStartTour: () => void }) => {
  const { 
    tasks, team, blockers, 
    setActivePage, setShowHealthReport 
  } = useAppStore();

  // Optimized derived metrics
  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const blocked = tasks.filter(t => t.isBlocked).length;
    const todo = tasks.filter(t => t.status === 'todo').length;

    return {
      completed, inProgress, blocked, todo,
      total: tasks.length,
      pie: [
        { name: 'Done', value: completed },
        { name: 'In Progress', value: inProgress },
        { name: 'Todo', value: todo },
        { name: 'Blocked', value: blocked },
      ]
    };
  }, [tasks]);

  const kpis = useMemo(() => [
    { label: 'Team Capacity', value: '94.2%', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', trend: '+5%' },
    { label: 'Sprint Velocity', value: '48 pts', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', trend: '+12%' },
    { label: 'Active Blockers', value: `${blockers.length}`, icon: AlertCircle, color: 'text-rose-400', bg: 'bg-rose-500/10', trend: blockers.length > 2 ? '⚠ High' : 'Low' },
    { label: 'Tasks Done', value: `${stats.completed}/${stats.total}`, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-500/10', trend: `${Math.round((stats.completed/stats.total)*100)}%` },
  ], [blockers.length, stats.completed, stats.total]);

  // Command handlers
  const handleStartTour = useCallback(() => {
    onStartTour();
  }, [onStartTour]);

  const handleGenerateReport = useCallback(() => {
    setShowHealthReport(true);
  }, [setShowHealthReport]);

  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-background">
      <TopNav title="Mission Control" subtitle="AI-powered team intelligence" showReportBtn />

      <div className="p-8 space-y-8 pb-20">
        {/* Header Section */}
        <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
              <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Real-time Intelligence</span>
            </div>
            <h1 className="text-4xl font-black text-gradient tracking-tight">Good morning, Sarah 👋</h1>
            <p className="text-white/50 mt-1 font-medium">
              Your team velocity is <span className="text-emerald-400 font-bold">up 12%</span>. 
              {blockers.length > 0 && <span> AI detected <span className="text-rose-400 font-bold">{blockers.length} blockers</span> requiring orchestration.</span>}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="secondary" 
              onClick={handleStartTour}
              icon={Play}
              className="bg-accent-primary/5 border-accent-primary/20 text-accent-primary hover:bg-accent-primary/10"
            >
              Run Guided Tour
            </Button>
            <Button 
              variant="primary" 
              onClick={handleGenerateReport}
              icon={FileText}
            >
              Executive Report
            </Button>
          </div>
        </m.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Workspace (3 cols) */}
          <div className="xl:col-span-3 space-y-6">
            {/* KPI Matrix */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {kpis.map((kpi) => (
                <Card key={kpi.label} className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn('p-2.5 rounded-xl', kpi.bg)}>
                      <kpi.icon className={cn('w-5 h-5', kpi.color)} />
                    </div>
                    <span className="text-[10px] font-black text-white/40 bg-white/5 px-2 py-1 rounded-lg">{kpi.trend}</span>
                  </div>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-2xl font-black text-white">{kpi.value}</h3>
                </Card>
              ))}
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-black text-white">Sprint Velocity</h3>
                    <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Daily points distribution</p>
                  </div>
                  <Badge label="This Week" variant="success" />
                </div>
                <div className="h-56">
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
              </Card>

              <Card className="p-6">
                <h3 className="font-black text-white mb-6">Task Delivery Status</h3>
                <div className="flex items-center gap-8">
                  <div className="h-40 w-40 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stats.pie} innerRadius={42} outerRadius={60} paddingAngle={4} dataKey="value">
                          {stats.pie.map((_, i) => <Cell key={i} fill={COLORS[i]} stroke="none" />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#13131a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 flex-1">
                    {stats.pie.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                        <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider flex-1">{d.name}</span>
                        <span className="text-sm font-black text-white">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Strategic Missions */}
            <Card className="p-0">
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-black text-white">Priority Missions</h3>
                <Button variant="ghost" size="sm" onClick={() => setActivePage('Meeting Parser')}>+ Add Intel</Button>
              </div>
              <div className="divide-y divide-white/5">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className={cn('p-4 flex items-center gap-4 hover:bg-white/3 transition-colors', task.isBlocked && 'blocker-pulse')}>
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black text-white shrink-0', task.assigneeColor)}>
                      {task.assigneeInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white truncate">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-black text-white/30 uppercase">{task.project}</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/30 font-bold uppercase tracking-tighter italic">Due {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {task.isBlocked && <Badge label="Blocked" variant="high" />}
                      <Badge label={task.priority} variant={task.priority as any} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Intelligence Sidebar (1 col) */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-black text-white mb-6">Health Intelligence</h3>
              <TeamHealthRadar />
            </Card>

            <Card className="p-0">
              <div className="px-6 py-4 border-b border-white/5">
                <h3 className="font-black text-white">Team Load</h3>
              </div>
              <div className="p-4 space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="group cursor-help">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white', member.color)}>
                          {member.initials}
                        </div>
                        <span className="text-xs font-bold text-white/80">{member.name}</span>
                      </div>
                      <span className={cn('text-[10px] font-black', member.workloadPercent > 85 ? 'text-rose-400' : 'text-emerald-400')}>
                        {member.workloadPercent}%
                      </span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <m.div
                        initial={{ width: 0 }}
                        animate={{ width: `${member.workloadPercent}%` }}
                        className={cn('h-full', member.workloadPercent > 85 ? 'bg-rose-500' : 'bg-emerald-500')}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
