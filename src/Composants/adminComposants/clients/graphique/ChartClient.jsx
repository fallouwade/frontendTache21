import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MonthlyUsersChart = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const yearlyData = {
    '2023': [
      { month: 'Jan', users: 280 },
      { month: 'Fév', users: 310 },
      { month: 'Mar', users: 350 },
      { month: 'Avr', users: 290 },
      { month: 'Mai', users: 320 },
      { month: 'Juin', users: 380 },
      { month: 'Juil', users: 400 },
      { month: 'Août', users: 420 },
      { month: 'Sept', users: 390 },
      { month: 'Oct', users: 360 },
      { month: 'Nov', users: 340 },
      { month: 'Déc', users: 370 }
    ],
    '2024': [
      { month: 'Jan', users: 350 },
      { month: 'Fév', users: 280 },
      { month: 'Mar', users: 420 },
      { month: 'Avr', users: 310 },
      { month: 'Mai', users: 250 },
      { month: 'Juin', users: null },
      { month: 'Juil', users: null },
      { month: 'Août', users: null },
      { month: 'Sept', users: null },
      { month: 'Oct', users: null },
      { month: 'Nov', users: null },
      { month: 'Déc', users: null }
    ],
    '2025': [
      { month: 'Jan', users: null },
      { month: 'Fév', users: null },
      { month: 'Mar', users: null },
      { month: 'Avr', users: null },
      { month: 'Mai', users: null },
      { month: 'Juin', users: null },
      { month: 'Juil', users: null },
      { month: 'Août', users: null },
      { month: 'Sept', users: null },
      { month: 'Oct', users: null },
      { month: 'Nov', users: null },
      { month: 'Déc', users: null }
    ]
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-blue-600">
            {payload[0].value !== null ? `${payload[0].value} utilisateurs` : 'Pas de données'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Utilisateurs Inscrits</h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Utilisateurs actifs</span>
            </div>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
      </div>
      <div className="h-64 w-full relative -z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={yearlyData[selectedYear]} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="month" 
              fontSize={12}
              tickMargin={5}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis fontSize={12} />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              position={{ y: 50 }}
            />
            <Bar 
              dataKey="users" 
              fill="#4a90e2" 
              name="Utilisateurs"
              radius={[4, 4, 0, 0]}
              barSize={30}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyUsersChart;