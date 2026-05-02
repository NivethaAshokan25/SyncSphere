import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Completed', value: 400, color: '#22c55e' },
  { name: 'In Progress', value: 300, color: '#6366f1' },
  { name: 'Todo', value: 200, color: '#94a3b8' },
  { name: 'Blocked', value: 100, color: '#ef4444' },
];

export const TaskStatusChart = () => {
  return (
    <div className="glass p-8 rounded-[2.5rem] h-full flex flex-col">
      <h3 className="text-xl font-black text-white mb-6">Task Distribution</h3>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#16161a', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 'bold'
              }} 
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
