import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'completed' | 'blocked' | 'in-progress' | 'pending';
}

interface Edge {
  from: string;
  to: string;
}

const nodes: Node[] = [
  { id: '1', label: 'Auth System', x: 100, y: 150, status: 'completed' },
  { id: '2', label: 'API Gateway', x: 300, y: 150, status: 'in-progress' },
  { id: '3', label: 'Database Mig', x: 100, y: 300, status: 'completed' },
  { id: '4', label: 'Frontend UI', x: 500, y: 100, status: 'blocked' },
  { id: '5', label: 'Admin Panel', x: 500, y: 250, status: 'pending' },
];

const edges: Edge[] = [
  { from: '1', to: '2' },
  { from: '3', to: '2' },
  { from: '2', to: '4' },
  { from: '2', to: '5' },
];

export const DependencyMap = () => {
  return (
    <div className="glass rounded-3xl p-8 h-[400px] relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Dependency Map</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-accent-success" />
            <span className="text-muted">Completed</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-accent-danger" />
            <span className="text-muted">Blocked</span>
          </div>
        </div>
      </div>

      <svg className="w-full h-full" viewBox="0 0 600 400">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
          </marker>
        </defs>

        {/* Draw Edges */}
        {edges.map((edge, index) => {
          const from = nodes.find(n => n.id === edge.from)!;
          const to = nodes.find(n => n.id === edge.to)!;
          return (
            <motion.line
              key={`edge-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#ffffff10"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
            />
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 100, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="40"
              className={cn(
                "fill-card stroke-2",
                node.status === 'completed' && "stroke-accent-success/50",
                node.status === 'blocked' && "stroke-accent-danger/50 shadow-glow-danger",
                node.status === 'in-progress' && "stroke-accent-primary/50",
                node.status === 'pending' && "stroke-white/10"
              )}
              style={{
                filter: node.status === 'blocked' ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.4))' : 'none'
              }}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dy=".3em"
              className="fill-white text-[10px] font-bold pointer-events-none"
            >
              {node.label}
            </text>
            {node.status === 'blocked' && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="45"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        ))}
      </svg>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/40 to-transparent" />
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
