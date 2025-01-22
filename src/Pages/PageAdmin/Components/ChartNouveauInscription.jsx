import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

const ChartNouveauInscription = () => {
  const data = [
    { month: 'janvier', inscriptions: 0.9 },
    { month: 'mars', inscriptions: 0.9 }
  ];

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm relative -z-10">
      <h2 className="text-lg font-medium mb-4">
        Nouvelles inscriptions par mois
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 1]}
              ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
            />
            <Tooltip 
              cursor={{ fill: '#F3F4F6' }}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px'
              }}
            />
            <Bar 
              dataKey="inscriptions" 
              fill="#86E2D5"
              name="Nouvelles inscriptions"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartNouveauInscription;