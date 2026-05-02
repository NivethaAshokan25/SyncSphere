import { motion } from 'framer-motion';
import { Clock, User, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  isBlocked: boolean;
  dueDate: string;
  assignee: string;
}

const tasks: Task[] = [
  { id: '1', title: 'Implement Auth Flow', status: 'In Progress', priority: 'high', isBlocked: false, dueDate: 'Jun 12', assignee: 'Alex' },
  { id: '2', title: 'Design System Audit', status: 'Todo', priority: 'medium', isBlocked: true, dueDate: 'Jun 15', assignee: 'Elena' },
  { id: '3', title: 'API Documentation', status: 'In Progress', priority: 'low', isBlocked: false, dueDate: 'Jun 10', assignee: 'Sarah' },
];

export const MissionBoard = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-lg font-bold">Priority Missions</h2>
        <button className="text-sm text-accent-primary font-medium hover:underline">View All</button>
      </div>
      <div className="grid gap-4">
        {tasks.map((task, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={task.id}
            className="glass p-5 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg group-hover:text-accent-primary transition-colors">
                {task.title}
              </h3>
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                task.priority === 'high' ? "bg-accent-danger/20 text-accent-danger" :
                task.priority === 'medium' ? "bg-accent-warning/20 text-accent-warning" :
                "bg-accent-success/20 text-accent-success"
              )}>
                {task.priority}
              </div>
            </div>

            <div className="flex items-center gap-6 text-muted text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{task.dueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{task.assignee}</span>
              </div>
              {task.isBlocked && (
                <div className="flex items-center gap-2 text-accent-danger animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-bold">BLOCKED</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
