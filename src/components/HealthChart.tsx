
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Generate random data for health metrics over time
const generateData = () => {
  const data = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      heartRate: 65 + Math.floor(Math.random() * 20),
      sleepHours: 5 + Math.random() * 3,
      stress: 30 + Math.floor(Math.random() * 40),
      brainActivity: 70 + Math.floor(Math.random() * 20),
    });
  }
  
  return data;
};

export const HealthChart = () => {
  const [data, setData] = useState(generateData());
  const [hoveredData, setHoveredData] = useState<any>(null);
  
  // Regenerate data every minute to simulate updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...data];
      const lastEntry = newData[newData.length - 1];
      
      // Slightly modify the last entry to show movement
      lastEntry.heartRate = Math.max(65, Math.min(100, lastEntry.heartRate + (Math.random() > 0.5 ? 1 : -1)));
      lastEntry.brainActivity = Math.max(70, Math.min(95, lastEntry.brainActivity + (Math.random() > 0.5 ? 2 : -2)));
      
      setData(newData);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [data]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      setHoveredData(payload[0].payload);
      
      return (
        <div className="glass-panel p-3 rounded-lg border border-white/10 text-sm">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(entry.name === 'sleepHours' ? 1 : 0)}
              {entry.name === 'heartRate' ? ' bpm' : entry.name === 'sleepHours' ? ' hrs' : '%'}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff6384" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ff6384" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSleep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBrain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            tick={{ fill: '#888', fontSize: 12 }}
            axisLine={{ stroke: '#444' }}
          />
          <YAxis 
            tick={{ fill: '#888', fontSize: 12 }}
            axisLine={{ stroke: '#444' }}
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-xs">{value}</span>}
          />
          <Area 
            type="monotone" 
            dataKey="heartRate" 
            stroke="#ff6384" 
            fillOpacity={1} 
            fill="url(#colorHeartRate)" 
            name="Heart Rate"
          />
          <Area 
            type="monotone" 
            dataKey="sleepHours" 
            stroke="#9b87f5" 
            fillOpacity={1} 
            fill="url(#colorSleep)" 
            name="Sleep Hours"
          />
          <Area 
            type="monotone" 
            dataKey="stress" 
            stroke="#F97316" 
            fillOpacity={1} 
            fill="url(#colorStress)" 
            name="Stress Level"
          />
          <Area 
            type="monotone" 
            dataKey="brainActivity" 
            stroke="#8B5CF6" 
            fillOpacity={1} 
            fill="url(#colorBrain)" 
            name="Brain Activity"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
