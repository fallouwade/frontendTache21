import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import axios from 'axios';

const ReservationChart = ({ className = "" }) => {
    const [timeFrame, setTimeFrame] = useState('month');
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getWeekNumber = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return `${d.getFullYear()}-W${weekNo}`;
    };

    const calculateAverages = (services, period = 'day') => {
        const servicesByPeriod = services.reduce((acc, service) => {
            let periodKey;
            const serviceDate = new Date(service.date);

            if (period === 'day') {
                periodKey = serviceDate.toDateString();
            } else if (period === 'week') {
                periodKey = getWeekNumber(serviceDate);
            }

            if (!acc[periodKey]) {
                acc[periodKey] = [];
            }
            acc[periodKey].push(service);
            return acc;
        }, {});

        const totalPeriods = Object.keys(servicesByPeriod).length || 1;
        const periodTotals = Object.values(servicesByPeriod).reduce((acc, periodServices) => {
            const statuts = {
                accepte: periodServices.filter(s => s.statut === 'accepte').length,
                refuse: periodServices.filter(s => s.statut === 'refuse').length,
                attente: periodServices.filter(s => s.statut === 'attente').length
            };
            acc.accepte += statuts.accepte;
            acc.refuse += statuts.refuse;
            acc.attente += statuts.attente;
            return acc;
        }, { accepte: 0, refuse: 0, attente: 0 });

        return {
            accepte: Math.round(periodTotals.accepte / totalPeriods),
            refuse: Math.round(periodTotals.refuse / totalPeriods),
            attente: Math.round(periodTotals.attente / totalPeriods),
            services: services,
            totalPeriods
        };
    };

    const filterServicesByDate = (services) => {
        const currentDate = new Date();
        return services;
    };

    useEffect(() => {
        const fetchServices = async () => {
            const API_URL = "https://backendtache21.onrender.com/api/demandes-services/clientAll";
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
              
                setServices(response.data.demandes);
                
                const filteredServices = filterServicesByDate(response.data.demandes);
                
                let formattedData;
                if (timeFrame === 'day' || timeFrame === 'week') {
                    const averages = calculateAverages(filteredServices, timeFrame);
                    const periodLabel = timeFrame === 'day' ? '/jour' : '/semaine';
                    formattedData = [
                        { 
                            name: `Réservations acceptées (moyenne${periodLabel})`, 
                            value: averages.accepte,
                            color: '#16a34a',
                            services: averages.services.filter(s => s.statut === 'accepte'),
                            totalPeriods: averages.totalPeriods
                        },
                        { 
                            name: `Réservations refusées (moyenne${periodLabel})`, 
                            value: averages.refuse,
                            color: '#dc2626',
                            services: averages.services.filter(s => s.statut === 'refuse'),
                            totalPeriods: averages.totalPeriods
                        },
                        { 
                            name: `En attente (moyenne${periodLabel})`, 
                            value: averages.attente,
                            color: '#f59e0b',
                            services: averages.services.filter(s => s.statut === 'attente'),
                            totalPeriods: averages.totalPeriods
                        }
                    ].filter(item => item.value > 0);
                } else {
                    const sortedServices = {
                        accepte: filteredServices.filter(service => service.statut === 'accepte'),
                        refuse: filteredServices.filter(service => service.statut === 'refuse'),
                        attente: filteredServices.filter(service => service.statut === 'attente')
                    };
                    
                    formattedData = [
                        { 
                            name: 'Réservations acceptées', 
                            value: sortedServices.accepte.length,
                            color: '#16a34a',
                            services: sortedServices.accepte
                        },
                        { 
                            name: 'Réservations refusées', 
                            value: sortedServices.refuse.length,
                            color: '#dc2626',
                            services: sortedServices.refuse
                        },
                        { 
                            name: 'En attente', 
                            value: sortedServices.attente.length,
                            color: '#f59e0b',
                            services: sortedServices.attente
                        }
                    ].filter(item => item.value > 0);
                }

                setChartData(formattedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchServices();
    }, [timeFrame]);

    const getTimeFrameLabel = () => {
        if (timeFrame === 'day' || timeFrame === 'week') {
            if (!chartData.length) return timeFrame === 'day' ? '(moyenne journalière)' : '(moyenne hebdomadaire)';
            
            const periodText = timeFrame === 'day' ? 'jours' : 'semaines';
            return `(moyenne sur ${chartData[0].totalPeriods} ${periodText})`;
        }

        const currentDate = new Date();
        return `en ${currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`;
    };

    const total = Math.round(chartData.reduce((sum, item) => sum + item.value, 0));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const percentage = ((payload[0].value / total) * 100).toFixed(1);
            const services = payload[0].payload.services;
            return (
                <div className="bg-white p-2 shadow rounded border">
                    <p className="font-semibold text-xs md:text-sm">{payload[0].name}</p>
                    <p className="text-xs md:text-sm">
                        {(timeFrame === 'day' || timeFrame === 'week')
                            ? `${payload[0].value} réservations${timeFrame === 'day' ? '/jour' : '/semaine'}` 
                            : `${payload[0].value} réservations`} ({percentage}%)
                    </p>
                    <div className="mt-2 text-xs">
                        <p className="font-semibold">Services :</p>
                        {services.slice(0, 3).map((service, index) => (
                            <p key={index} className="text-gray-600">
                                • {service.typeService} - {service.adresse.substring(0, 20)}
                            </p>
                        ))}
                        {services.length > 3 && (
                            <p className="text-gray-500 italic">
                                et {services.length - 3} autres...
                            </p>
                        )}
                    </div>
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

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full flex items-center justify-center text-red-500">
                Une erreur est survenue lors du chargement des données
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div className={`w-full h-full ${className}`}>
                <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4'>
                        <div>
                            <h2 className="text-md font-bold">Statistiques des Réservations</h2>
                            <p className="text-sm text-gray-600">
                                {timeFrame === 'day' 
                                    ? 'Moyenne : 0 réservation par jour' 
                                    : timeFrame === 'week'
                                        ? 'Moyenne : 0 réservation par semaine'
                                        : 'Total: 0 réservation'} {getTimeFrameLabel()}
                            </p>
                        </div>
                        <select
                            value={timeFrame}
                            onChange={(e) => setTimeFrame(e.target.value)}
                            className="p-2 border rounded w-full md:w-auto"
                        >
                            <option value="day">Moyenne journalière</option>
                            <option value="week">Moyenne hebdomadaire</option>
                            <option value="month">Par mois</option>
                        </select>
                    </div>
                    
                    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <p className="text-lg font-medium mb-2">Aucune demande {getTimeFrameLabel()}</p>
                            <p className="text-sm">Les statistiques apparaîtront ici une fois que vous aurez des réservations</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full h-full ${className}`}>
            <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col">
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4'>
                    <div>
                        <h2 className="text-md font-bold">Statistiques des Réservations</h2>
                        <p className="text-sm text-gray-600">
                            {timeFrame === 'day' 
                                ? `Moyenne : ${total} réservations par jour`
                                : timeFrame === 'week'
                                    ? `Moyenne : ${total} réservations par semaine`
                                    : `Total: ${total} réservations`} {getTimeFrameLabel()}
                        </p>
                    </div>
                    <select
                        value={timeFrame}
                        onChange={(e) => setTimeFrame(e.target.value)}
                        className="p-2 border rounded w-full md:w-auto"
                    >
                        <option value="day">Moyenne journalière</option>
                        <option value="week">Moyenne hebdomadaire</option>
                        <option value="month">Par mois</option>
                    </select>
                </div>
                
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