import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const ChartInfosStatus = () => {
  const data = [
    { name: 'actif', value: 50 },
    { name: 'inactif', value: 50 }
  ];

  const COLORS = ['#86E2D5', '#FFB6C1']; // Turquoise clair et rose clair

  const renderLegend = (props) => {
    const { payload } = props;
    
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span className="text-sm text-gray-600">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm relative -z-10">
      <h2 className="text-lg font-medium mb-4 text-center">
        Répartition des statuts
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index]} 
                  stroke="none"
                />
              ))}
            </Pie>
            <Legend 
              content={renderLegend}
              verticalAlign="bottom"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartInfosStatus;