import { Activity, GitCommit, MessageSquare } from 'lucide-react';
import { CommunicationVisibilityEngine } from '../components/timeline/CommunicationVisibilityEngine';

export const TeamPulse = () => {
  return (
    <div className="flex-1 p-10 h-screen flex flex-col bg-[#0a0a0c]">
      <header className="mb-10">
        <h1 className="text-5xl font-black tracking-tight text-gradient mb-3">Team Pulse</h1>
        <p className="text-muted font-medium">Real-time team activity and sentiment analysis.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-0">
        <div className="lg:col-span-2 space-y-10 overflow-y-auto pr-4 custom-scrollbar">
          <div className="grid grid-cols-3 gap-6">
            <div className="glass p-6 rounded-3xl border-accent-success/20">
              <Activity className="w-6 h-6 text-accent-success mb-4" />
              <p className="text-xs text-muted font-black uppercase tracking-widest mb-1">Sentiment</p>
              <h3 className="text-2xl font-black">Positive</h3>
            </div>
            <div className="glass p-6 rounded-3xl border-accent-primary/20">
              <MessageSquare className="w-6 h-6 text-[#4A154B] mb-4" />
              <p className="text-xs text-muted font-black uppercase tracking-widest mb-1">Messages</p>
              <h3 className="text-2xl font-black">1.2k today</h3>
            </div>
            <div className="glass p-6 rounded-3xl border-accent-secondary/20">
              <GitCommit className="w-6 h-6 text-accent-secondary mb-4" />
              <p className="text-xs text-muted font-black uppercase tracking-widest mb-1">Commits</p>
              <h3 className="text-2xl font-black">42 fresh</h3>
            </div>
          </div>
          
          <CommunicationVisibilityEngine />
        </div>

        <div className="glass p-8 rounded-[2.5rem] flex flex-col">
          <h3 className="text-xl font-black mb-6">Online Now</h3>
          <div className="space-y-4">
            {['Sarah Jenkins', 'Alex Rivera', 'Elena Vance', 'James Bond'].map((name) => (
              <div key={name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center text-xs font-bold">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-bold text-sm">{name}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-accent-success" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
