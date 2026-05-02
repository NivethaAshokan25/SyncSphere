import { BarChart3, TrendingUp, Users, Target } from 'lucide-react';
import { ProductivityChart } from '../components/dashboard/ProductivityChart';
import { TaskStatusChart } from '../components/dashboard/TaskStatusChart';

export const WorkflowAnalytics = () => {
  return (
    <div className="flex-1 p-10 space-y-10 overflow-y-auto h-screen custom-scrollbar bg-[#0a0a0c]">
      <header>
        <h1 className="text-5xl font-black tracking-tight text-gradient mb-3">Workflow Analytics</h1>
        <p className="text-muted font-medium">Deep insights into team efficiency and bottleneck patterns.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Cycle Time', value: '3.2 Days', icon: Target, color: 'text-accent-primary' },
          { label: 'Throughput', value: '18 Tasks/Wk', icon: TrendingUp, color: 'text-accent-success' },
          { label: 'Collaboration Rate', value: '85%', icon: Users, color: 'text-accent-secondary' },
          { label: 'Focus Score', value: '92/100', icon: BarChart3, color: 'text-accent-warning' },
        ].map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-[2rem] border border-white/5">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
            <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="h-[400px]">
          <ProductivityChart />
        </div>
        <div className="h-[400px]">
          <TaskStatusChart />
        </div>
      </div>

      <div className="glass p-10 rounded-[2.5rem]">
        <h3 className="text-2xl font-black mb-6">Efficiency Heatmap</h3>
        <div className="grid grid-cols-7 gap-4">
          {Array.from({ length: 28 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-12 rounded-lg ${
                i % 5 === 0 ? 'bg-accent-primary/40' : 
                i % 3 === 0 ? 'bg-accent-primary/20' : 
                'bg-white/5'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
