import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ChartInfosStatus = ({prestataires}) => {
  const prestatairesActifs = prestataires.filter(p => p.actif === true).length;
  const prestatairesBloque = prestataires.filter(p => p.actif === false).length;

  const data = [
    { name: 'actifs', value: prestatairesActifs },
    { name: 'bloqués', value: prestatairesBloque }
  ];

  const COLORS = ['#228B22', '#E53E3E']; 

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow-lg">
          <p className="font-bold">{data.name}</p>
          <p>Nombre: {data.value}</p>
          <p>Pourcentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

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
              {`${entry.value} (${dataWithPercentage[index].percentage}%)`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${dataWithPercentage[index].percentage}%`}
      </text>
    );
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm relative">
      <h2 className="text-lg font-medium mb-4 text-center">
        Répartition des statuts
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index]} 
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
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