import { 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Activity,
  Zap,
  Calendar,
  Search,
  Bell,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { StatCard } from '../components/dashboard/StatCard';
import { ProductivityChart } from '../components/dashboard/ProductivityChart';
import { TaskStatusChart } from '../components/dashboard/TaskStatusChart';
import { BlockersPanel } from '../components/dashboard/BlockersPanel';
import { AICoordinatorPanel } from '../components/dashboard/AICoordinatorPanel';

export const Dashboard = () => {
  return (
    <div className="flex-1 h-screen overflow-y-auto custom-scrollbar bg-[#0a0a0c] text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50 w-[300px] transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-muted" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full border-2 border-[#0a0a0c]" />
            </button>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1 rounded-xl transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Avatar" />
              </div>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-bold leading-none">Sarah Jenkins</p>
              <p className="text-[10px] text-muted font-bold uppercase mt-1">Product Lead</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted" />
          </div>
        </div>
      </header>

      <div className="p-10 space-y-10">
        {/* Welcome Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-[10px] font-black tracking-widest text-accent-primary uppercase">
                Dashboard Overview
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tight mb-3 text-gradient">
              SyncSphere <span className="text-white">AI</span>
            </h1>
            <p className="text-muted font-medium max-w-lg">
              Good morning, Sarah. Your team's velocity is <span className="text-accent-success font-bold">up 12%</span> this week. AI has detected 2 blockers.
            </p>
          </motion.div>
          
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-6 py-3.5 rounded-2xl flex items-center gap-2 font-bold hover:bg-white/10 transition-all border-white/10"
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="accent-gradient px-8 py-3.5 rounded-2xl flex items-center gap-2 font-black shadow-glow-primary hover:shadow-glow-secondary transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              GENERATE STANDUP
            </motion.button>
          </div>
        </header>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Team Capacity" value="94.2%" icon={Users} trend="+5.2%" color="primary" delay={0.1} />
          <StatCard label="Sprint Velocity" value="48 pts" icon={Activity} trend="On Track" color="success" delay={0.2} />
          <StatCard label="Active Blockers" value="2" icon={AlertCircle} trend="Immediate" color="danger" delay={0.3} />
          <StatCard label="Comm. Health" value="98/100" icon={CheckCircle2} color="warning" delay={0.4} />
        </div>

        {/* Charts & Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-[500px]">
            <ProductivityChart />
          </div>
          <div className="lg:col-span-4 h-[500px]">
            <AICoordinatorPanel />
          </div>
        </div>

        {/* Bottom Section: Blockers & AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <div className="h-full">
            <BlockersPanel />
          </div>
          <div className="h-full">
            <TaskStatusChart />
          </div>
        </div>
      </div>
    </div>
  );
};

