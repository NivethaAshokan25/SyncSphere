import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  delay?: number;
}

const colorMap = {
  primary: 'from-accent-primary/20 to-accent-secondary/20 border-accent-primary/30 text-accent-primary',
  success: 'from-accent-success/20 to-accent-success/10 border-accent-success/30 text-accent-success',
  warning: 'from-accent-warning/20 to-accent-warning/10 border-accent-warning/30 text-accent-warning',
  danger: 'from-accent-danger/20 to-accent-danger/10 border-accent-danger/30 text-accent-danger',
};

export const StatCard = ({ label, value, icon: Icon, trend, color = 'primary', delay = 0 }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "glass p-6 rounded-[2rem] border relative overflow-hidden group",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 before:transition-opacity hover:before:opacity-100",
        colorMap[color]
      )}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300",
        )}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-xs font-bold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white/90">
            {trend}
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-muted text-sm font-semibold uppercase tracking-wider mb-1">{label}</p>
        <h3 className="text-4xl font-black tracking-tight text-white group-hover:text-gradient transition-all duration-300">
          {value}
        </h3>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-32 h-32 rotate-12" />
      </div>
    </motion.div>
  );
};
