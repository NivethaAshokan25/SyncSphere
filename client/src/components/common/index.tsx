import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

/**
 * Common Card Component
 * Implements the unified glassmorphism style
 */
export const Card = ({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) => (
  <div className={cn(
    "glass-card rounded-3xl border border-white/5 overflow-hidden transition-all duration-300",
    hover && "hover:border-white/10 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/20",
    className
  )}>
    {children}
  </div>
);

/**
 * Premium Button Component
 */
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className, 
  onClick,
  disabled,
  icon: Icon
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger',
  size?: 'sm' | 'md' | 'lg',
  className?: string,
  onClick?: () => void,
  disabled?: boolean,
  icon?: any
}) => {
  const variants = {
    primary: 'accent-gradient text-white shadow-lg glow-primary',
    secondary: 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20',
    ghost: 'bg-transparent text-white/40 hover:text-white hover:bg-white/5',
    danger: 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[10px]',
    md: 'px-4 py-2.5 text-xs',
    lg: 'px-6 py-3.5 text-sm',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl font-black uppercase tracking-wider transition-all outline-none focus-visible:ring-2 focus-visible:ring-accent-primary disabled:opacity-40 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
      {children}
    </motion.button>
  );
};

/**
 * Status Badge Component
 */
export const Badge = ({ label, variant = 'neutral' }: { label: string, variant?: 'high' | 'medium' | 'low' | 'success' | 'neutral' }) => {
  const styles = {
    high: 'badge-high',
    medium: 'badge-medium',
    low: 'badge-low',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    neutral: 'bg-white/5 text-white/40 border border-white/10',
  };

  return (
    <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter", styles[variant])}>
      {label}
    </span>
  );
};
