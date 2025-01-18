import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ReservationChart = () => {
    const [timeFrame, setTimeFrame] = useState('month');

    const data = [
        { name: 'Réservations reçues', value: 120, color: '#2563eb' },
        { name: 'Réservations acceptées', value: 80, color: '#16a34a' },
        { name: 'Réservations annulées', value: 30, color: '#dc2626' },
        { name: 'En attente', value: 10, color: '#f59e0b' }
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const percentage = ((payload[0].value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-2 shadow rounded border">
                    <p className="font-semibold text-xs">{payload[0].name}</p>
                    <p className="text-xs">{payload[0].value} ({percentage}%)</p>
                </div>
            );
        }
        return null;
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        const percentage = ((value / total) * 100).toFixed(1);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-medium"
            >
                {percentage}%
            </text>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-1 mt-1">
            <div className="bg-white rounded-lg shadow-lg p-3">
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-md font-bold">Statistiques des Réservations</h2>
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
                <div className="h-64 z-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"
                                paddingAngle={4}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={60}
                                formatter={(value, entry) => (
                                    <span className="text-xs inline-flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }}></span>
                                        {value} ({((entry.payload.value / total) * 100).toFixed(1)}%)
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ReservationChart;
