import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  ShieldAlert, 
  TrendingDown, 
  BarChart2, 
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { DependencyMap } from '../components/analytics/DependencyMap';
import { BottleneckHeatmap } from '../components/analytics/BottleneckHeatmap';

const workloadData = [
  { name: 'Sarah', tasks: 12, capacity: 85 },
  { name: 'Mike', tasks: 8, capacity: 60 },
  { name: 'Elena', tasks: 15, capacity: 98 },
  { name: 'Alex', tasks: 6, capacity: 45 },
  { name: 'David', tasks: 10, capacity: 75 },
];

const riskIndicators = [
  { id: 1, title: 'API Authentication Overdue', risk: 'High', owner: 'Sarah', delay: '2 days' },
  { id: 2, title: 'Database Migration Blocked', risk: 'Critical', owner: 'Elena', delay: '4 days' },
  { id: 3, title: 'Frontend UI Polish', risk: 'Low', owner: 'Alex', delay: '5 hours' },
];

export const WorkflowAnalytics = () => {
  return (
    <div className="flex-1 p-10 overflow-y-auto h-screen space-y-10 custom-scrollbar bg-background">
      <header className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gradient">
            Workflow Analytics
          </h1>
          <p className="text-muted">Visibility into dependencies, workload distribution, and pipeline health.</p>
        </motion.div>
        
        <div className="flex gap-4">
          <button className="glass px-6 py-3 rounded-2xl flex items-center gap-2 font-medium hover:bg-white/5 transition-all text-sm">
            <Filter className="w-4 h-4 text-accent-primary" />
            Filter View
          </button>
          <button className="bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-2 font-bold hover:scale-105 transition-transform active:scale-95 text-sm">
            Export Report
          </button>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          label="Overdue Tasks" 
          value="14" 
          sub="7 prioritized" 
          icon={Clock} 
          color="danger" 
        />
        <KPICard 
          label="Blocked Pipeline" 
          value="18%" 
          sub="+4% from last week" 
          icon={ShieldAlert} 
          color="warning" 
        />
        <KPICard 
          label="Flow Efficiency" 
          value="72%" 
          sub="Optimal: 85%" 
          icon={TrendingDown} 
          color="primary" 
        />
        <KPICard 
          label="Active Dependencies" 
          value="124" 
          sub="3 critical paths" 
          icon={Layers} 
          color="success" 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <DependencyMap />
        
        <div className="glass rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold">Workload Distribution</h3>
            <span className="text-xs text-muted flex items-center gap-1">
              <BarChart2 className="w-3 h-3" /> Team Utilization
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#16161a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="tasks" radius={[6, 6, 0, 0]} barSize={40}>
                  {workloadData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.capacity > 90 ? '#ef4444' : '#6366f1'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
          <BottleneckHeatmap />
        </div>
        
        <div className="glass rounded-3xl p-8 space-y-6">
          <h3 className="text-xl font-bold">Risk Indicators</h3>
          <div className="space-y-4">
            {riskIndicators.map((risk) => (
              <motion.div 
                key={risk.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ x: 5 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    risk.risk === 'Critical' ? 'bg-accent-danger/20 text-accent-danger' : 
                    risk.risk === 'High' ? 'bg-accent-warning/20 text-accent-warning' : 
                    'bg-accent-success/20 text-accent-success'
                  }`}>
                    {risk.risk}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-sm mb-1">{risk.title}</h4>
                <div className="flex items-center gap-3 text-[10px] text-muted">
                  <span>Owner: <span className="text-white">{risk.owner}</span></span>
                  <span>Delay: <span className="text-accent-danger">{risk.delay}</span></span>
                </div>
                {risk.risk === 'Critical' && (
                  <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-danger"
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface KPICardProps {
  label: string;
  value: string;
  sub: string;
  icon: any;
  color: 'primary' | 'success' | 'warning' | 'danger';
}

const KPICard = ({ label, value, sub, icon: Icon, color }: KPICardProps) => {
  const colorMap = {
    primary: 'text-accent-primary',
    success: 'text-accent-success',
    warning: 'text-accent-warning',
    danger: 'text-accent-danger',
  };

  const bgMap = {
    primary: 'bg-accent-primary/10',
    success: 'bg-accent-success/10',
    warning: 'bg-accent-warning/10',
    danger: 'bg-accent-danger/10',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-6 rounded-3xl space-y-4 relative overflow-hidden group"
    >
      <div className={`w-12 h-12 ${bgMap[color]} rounded-2xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${colorMap[color]}`} />
      </div>
      <div>
        <h3 className="text-muted text-xs font-bold uppercase tracking-wider mb-1">{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black">{value}</span>
          <span className="text-[10px] text-muted font-medium">{sub}</span>
        </div>
      </div>
      
      {/* Decorative pulse for danger */}
      {color === 'danger' && (
        <div className="absolute top-4 right-4 w-2 h-2">
          <div className="absolute inset-0 bg-accent-danger rounded-full animate-ping opacity-40" />
          <div className="absolute inset-0 bg-accent-danger rounded-full" />
        </div>
      )}
    </motion.div>
  );
};
