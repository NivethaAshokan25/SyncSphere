import { motion } from 'framer-motion';
import { CommunicationVisibilityEngine } from '../components/timeline/CommunicationVisibilityEngine';
import { Search, Bell, ChevronDown, MessageSquare } from 'lucide-react';

export const TeamPulse = () => {
  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-[#0a0a0c] text-white">
      {/* Top Navigation Bar */}
      <header className="glass border-b border-white/5 px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-accent-primary/20 rounded-lg flex items-center justify-center border border-accent-primary/30">
               <MessageSquare className="w-4 h-4 text-accent-primary" />
             </div>
             <h2 className="text-lg font-bold">Team Pulse</h2>
          </div>
          <div className="h-6 w-[1px] bg-white/10" />
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search activity..." 
              className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-primary/50 w-[250px] transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full border-2 border-[#0a0a0c]" />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Avatar" />
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-10 overflow-hidden flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <h1 className="text-4xl font-black tracking-tight text-gradient mb-2">
            Communication Engine
          </h1>
          <p className="text-muted font-medium">
            Monitoring team velocity, blockers, and collaborative patterns in real-time.
          </p>
        </motion.div>

        <div className="flex-1 min-h-0">
          <CommunicationVisibilityEngine />
        </div>
      </main>
    </div>
  );
};
