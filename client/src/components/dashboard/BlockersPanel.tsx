import { AlertCircle, ChevronRight, User } from 'lucide-react';

const blockers = [
  { id: 1, title: 'Auth flow failing in staging', assignee: 'Alex R.', severity: 'high', time: '2h ago' },
  { id: 2, title: 'Design specs for mobile v2 pending', assignee: 'Elena V.', severity: 'medium', time: '5h ago' },
];

export const BlockersPanel = () => {
  return (
    <div className="glass p-8 rounded-[2.5rem] h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-white">Active Blockers</h3>
        <span className="px-3 py-1 bg-accent-danger/20 text-accent-danger rounded-full text-[10px] font-black uppercase tracking-widest">
          Action Required
        </span>
      </div>

      <div className="space-y-4">
        {blockers.map((blocker) => (
          <div 
            key={blocker.id}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-danger/30 transition-all cursor-pointer"
          >
            <div className={`p-3 rounded-xl ${blocker.severity === 'high' ? 'bg-accent-danger/20 text-accent-danger' : 'bg-accent-warning/20 text-accent-warning'}`}>
              <AlertCircle className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">{blocker.title}</h4>
              <div className="flex items-center gap-3 text-[10px] text-muted font-bold uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {blocker.assignee}
                </div>
                <span>•</span>
                <span>{blocker.time}</span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
          </div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-4 rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">
        View All Issues
      </button>
    </div>
  );
};
