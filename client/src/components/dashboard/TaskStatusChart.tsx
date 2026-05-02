import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Completed', value: 400, color: '#22c55e' },
  { name: 'In Progress', value: 300, color: '#6366f1' },
  { name: 'Delayed', value: 150, color: '#ef4444' },
  { name: 'To Do', value: 200, color: '#94a3b8' },
];

export const TaskStatusChart = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass p-8 rounded-[2rem] h-full"
    >
      <h3 className="text-xl font-bold text-white mb-2">Task Distribution</h3>
      <p className="text-muted text-sm mb-8">Current sprint health status</p>
      
      <div className="h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#16161a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-white">85%</span>
          <span className="text-[10px] uppercase font-bold text-muted">Efficiency</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs font-semibold text-white/80">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
