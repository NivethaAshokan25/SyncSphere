import React from 'react';
import { motion } from 'framer-motion';

const stages = ['Requirements', 'Design', 'Development', 'Testing', 'Deployment'];
const teams = ['Platform', 'Core', 'UI/UX', 'QA', 'DevOps'];

// Mock data: Heat value from 0 to 1
const data = [
  [0.2, 0.1, 0.4, 0.1, 0.2],
  [0.1, 0.8, 0.3, 0.2, 0.1],
  [0.3, 0.2, 0.9, 0.4, 0.3],
  [0.1, 0.1, 0.2, 0.7, 0.2],
  [0.1, 0.0, 0.1, 0.2, 0.5],
];

export const BottleneckHeatmap = () => {
  return (
    <div className="glass rounded-3xl p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gradient">Bottleneck Detection</h3>
        <span className="text-xs text-muted">Intensity: Delay Duration</span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        <div />
        {stages.map(s => (
          <div key={s} className="text-[10px] font-bold text-muted text-center uppercase tracking-wider">{s}</div>
        ))}

        {teams.map((team, i) => (
          <React.Fragment key={team}>
            <div className="text-[10px] font-bold text-muted flex items-center">{team}</div>
            {data[i].map((val, j) => (
              <motion.div
                key={`${i}-${j}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i * 5 + j) * 0.02 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="aspect-square rounded-lg flex items-center justify-center cursor-help relative group"
                style={{
                  backgroundColor: `rgba(168, 85, 247, ${val})`,
                  border: val > 0.7 ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: val > 0.8 ? '0 0 15px rgba(239, 68, 68, 0.3)' : 'none'
                }}
              >
                {val > 0.7 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-danger animate-pulse" />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-white/10 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 w-32 shadow-xl">
                  <p className="text-[10px] text-white font-bold">{team} @ {stages[j]}</p>
                  <p className="text-[8px] text-muted">Delay: {(val * 48).toFixed(1)}h</p>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-accent-secondary/20" />
            <span className="text-[10px] text-muted">Low</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-accent-secondary" />
            <span className="text-[10px] text-muted">High</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm border border-accent-danger shadow-glow-danger" />
            <span className="text-[10px] text-muted">Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};
