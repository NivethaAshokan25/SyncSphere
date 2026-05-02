import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface Props { score: number; label?: string; size?: 'sm' | 'md' | 'lg'; }

export const RiskScoreMeter = ({ score, label = 'Risk Score', size = 'md' }: Props) => {
  const clamped = Math.max(0, Math.min(100, score));
  const level = clamped < 30 ? 'low' : clamped < 65 ? 'medium' : 'high';
  const color = level === 'low' ? '#10b981' : level === 'medium' ? '#f59e0b' : '#ef4444';
  const label2 = level === 'low' ? 'LOW RISK' : level === 'medium' ? 'MODERATE' : 'HIGH RISK';
  const sizes = { sm: { w: 80, stroke: 6, text: 'text-xl' }, md: { w: 120, stroke: 8, text: 'text-3xl' }, lg: { w: 160, stroke: 10, text: 'text-4xl' } };
  const s = sizes[size];
  const r = (s.w - s.stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (clamped / 100) * circ * 0.75; // 270° arc

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ width: s.w, height: s.w * 0.75 }} className="relative">
        <svg width={s.w} height={s.w * 0.75} viewBox={`0 0 ${s.w} ${s.w * 0.75}`} style={{ overflow: 'visible' }}>
          {/* Track */}
          <path
            d={`M ${s.stroke} ${s.w * 0.75 - s.stroke} A ${r} ${r} 0 1 1 ${s.w - s.stroke} ${s.w * 0.75 - s.stroke}`}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={s.stroke} strokeLinecap="round"
          />
          {/* Fill */}
          <motion.path
            d={`M ${s.stroke} ${s.w * 0.75 - s.stroke} A ${r} ${r} 0 1 1 ${s.w - s.stroke} ${s.w * 0.75 - s.stroke}`}
            fill="none" stroke={color} strokeWidth={s.stroke} strokeLinecap="round"
            strokeDasharray={`${circ * 0.75}`}
            initial={{ strokeDashoffset: circ * 0.75 }}
            animate={{ strokeDashoffset: circ * 0.75 - dash }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center pb-3">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className={cn('font-black tabular-nums', s.text)}
              style={{ color }}
            >
              {clamped}
            </motion.span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color }}>{label2}</p>
        <p className="text-[10px] text-white/30 font-bold mt-0.5">{label}</p>
      </div>
    </div>
  );
};
