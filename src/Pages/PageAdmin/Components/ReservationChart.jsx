import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ReservationChart = ({ 
    className = "", 
    reservationData = null 
}) => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [chartData, setChartData] = useState([
        { name: 'Réservations reçues', value: 120, color: '#2563eb' },
        { name: 'Réservations acceptées', value: 80, color: '#16a34a' },
        { name: 'Réservations annulées', value: 30, color: '#dc2626' },
        { name: 'En attente', value: 10, color: '#f59e0b' }
    ]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Si des données sont passées en props, mettre à jour le graphique
        if (reservationData && Array.isArray(reservationData)) {
            const formattedData = [
                { 
                    name: 'Réservations reçues', 
                    value: reservationData.filter(r => r.statut === 'reçue').length, 
                    color: '#2563eb' 
                },
                { 
                    name: 'Réservations acceptées', 
                    value: reservationData.filter(r => r.statut === 'acceptée').length, 
                    color: '#16a34a' 
                },
                { 
                    name: 'Réservations annulées', 
                    value: reservationData.filter(r => r.statut === 'annulée').length, 
                    color: '#dc2626' 
                },
                { 
                    name: 'En attente', 
                    value: reservationData.filter(r => r.statut === 'en attente').length, 
                    color: '#f59e0b' 
                }
            ];

            setChartData(formattedData);
        }
    }, [reservationData]);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const percentage = ((payload[0].value / total) * 100).toFixed(1);
            return (
                <div className="bg-white p-2 shadow rounded border">
                    <p className="font-semibold text-xs md:text-sm">{payload[0].name}</p>
                    <p className="text-xs md:text-sm">{payload[0].value} ({percentage}%)</p>
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
                className="font-medium text-xs"
            >
                {percentage}%
            </text>
        );
    };

    return (
        <div className={`w-full h-full ${className}`}>
            <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4'>
                    <h2 className="text-md font-bold">Statistiques des Réservations</h2>
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        className="p-2 border rounded w-full md:w-auto"
                    >
                        <option value="day">Par jour</option>
                        <option value="week">Par semaine</option>
                        <option value="month">Par mois</option>
                    </select>
                </div>
                
                {/* Hauteur augmentée pour les petits écrans */}
                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={windowWidth < 480 ? "35%" : "40%"}
                                outerRadius={windowWidth < 480 ? "60%" : "70%"}
                                paddingAngle={4}
                                dataKey="value"
                                label={renderCustomizedLabel}
                                labelLine={false}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                verticalAlign="bottom"
                                height={100}
                                formatter={(value, entry) => (
                                    <span className="text-xs md:text-sm inline-flex items-center gap-1">
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