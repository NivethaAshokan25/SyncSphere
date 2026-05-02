import { 
  LayoutDashboard, 
  Target, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Video,
  AlertCircle,
  ClipboardList
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar = ({ activePage, onPageChange }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Mission Control' },
    { icon: ClipboardList, label: 'Meeting Parser' },
    { icon: Target, label: 'Task Matrix' },
    { icon: MessageSquare, label: 'Team Pulse' },
    { icon: Video, label: 'Meetings' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: AlertCircle, label: 'Blockers', count: 3 },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 glass h-screen flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center shadow-glow">
          <Target className="text-white w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">SyncSphere</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = activePage === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onPageChange(item.label)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-left",
                isActive 
                  ? "bg-accent-primary/10 text-accent-primary shadow-sm" 
                  : "text-muted hover:bg-white/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-accent-primary" : "text-muted group-hover:text-foreground"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
              {item.count && (
                <span className="ml-auto bg-accent-danger/20 text-accent-danger text-xs px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-primary to-accent-secondary flex items-center justify-center text-[10px] font-bold">SC</div>
          <div>
            <p className="text-xs font-bold">Sarah Chen</p>
            <p className="text-[10px] text-muted">Pro Plan</p>
          </div>
        </div>
        <button className="w-full py-2 rounded-xl bg-white text-black text-[10px] font-black hover:scale-105 transition-transform">
          UPGRADE PLAN
        </button>
      </div>
    </aside>
  );
};
