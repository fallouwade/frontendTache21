import { useState, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const UserChart = () => {
  const [timeFrame, setTimeFrame] = useState('month');

  const generateData = useCallback(() => {
    const data = [];
    const periods = timeFrame === 'day' ? 30 : timeFrame === 'week' ? 12 : 12;
    let clients = 100;
    let pros = 50;
    
    for (let i = 0; i < periods; i++) {
      // Ajuster la croissance en fonction de la période
      const growthDivider = timeFrame === 'day' ? 5 : timeFrame === 'week' ? 3 : 1;
      const clientGrowth = Math.floor((Math.random() * 30) + 10) / growthDivider;
      const proGrowth = Math.floor((Math.random() * 15) + 5) / growthDivider;
      
      clients += clientGrowth;
      pros += proGrowth;

      const periodLabel = 
        timeFrame === 'day' ? `J${i + 1}` :
        timeFrame === 'week' ? `S${i + 1}` :
        `M${i + 1}`;

      data.push({
        period: periodLabel,
        clients: Math.round(clients),
        professionnels: Math.round(pros),
        total: Math.round(clients + pros)
      });
    }
    return data;
  }, [timeFrame]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative -z-10">
      <div className="bg-white rounded-lg shadow-lg p-3">
        <div className="p-1 rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-bold">Croissance des Utilisateurs</h2>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="day">Par jour</option>
              <option value="week">Par semaine</option>
              <option value="month">Par mois</option>
            </select>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip wrapperStyle={{ zIndex: 0 }} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clients"
                  stroke="#2563eb"
                  name="Clients"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="professionnels"
                  stroke="#16a34a"
                  name="Professionnels"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#6b7280"
                  name="Total"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserChart;