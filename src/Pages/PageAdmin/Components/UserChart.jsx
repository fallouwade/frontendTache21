import { useState, useMemo, useEffect } from 'react';
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

const UserChart = ({ data, className = "" }) => {
  const [timeFrame, setTimeFrame] = useState('month');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatPeriod = (date, timeFrame) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const isMobile = windowWidth < 768;

    switch (timeFrame) {
      case 'day':
        return isMobile 
          ? `${day}/${month}/${year.toString().slice(-2)}` 
          : `${day}/${month}/${year}`;
      case 'week':
        return isMobile 
          ? `S${Math.ceil(day / 7)}/${month}/${year.toString().slice(-2)}` 
          : `Sem ${Math.ceil(day / 7)} - ${month}/${year}`;
      case 'month':
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        return isMobile 
          ? `${monthNames[month-1]}/${year.toString().slice(-2)}` 
          : `${monthNames[month-1]} ${year}`;
      default:
        return '';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-lg">
          <p className="font-bold text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.stroke }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartData = useMemo(() => {
    if (!data || !data.length) return [];

    const sortedData = [...data].sort((a, b) => 
      new Date(a.createdAt) - new Date(b.createdAt)
    );

    const periodData = new Map();

    sortedData.forEach(user => {
      const date = new Date(user.createdAt);
      const periodLabel = formatPeriod(date, timeFrame);
      
      if (!periodData.has(periodLabel)) {
        periodData.set(periodLabel, {
          period: periodLabel,
          clients: 0,
          prestataires: 0,
          total: 0,
          date: date
        });
      }

      const periodStats = periodData.get(periodLabel);
      if (user.role === 'professional') {
        periodStats.prestataires++;
      } else {
        periodStats.clients++;
      }
      periodStats.total++;
    });

    let periodsArray = Array.from(periodData.values())
      .sort((a, b) => a.date - b.date);

    let cumulClients = 0;
    let cumulPrestataires = 0;
    
    return periodsArray.map(period => {
      cumulClients += period.clients;
      cumulPrestataires += period.prestataires;
      return {
        period: period.period,
        clients: cumulClients,
        prestataires: cumulPrestataires,
        total: cumulClients + cumulPrestataires
      };
    });
  }, [data, timeFrame, windowWidth]);

  return (
    <div className={`w-full h-[500px] md:h-full ${className}`}>
      <div className="w-full h-full bg-white rounded-lg shadow-lg p-3 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
          <h2 className="text-md font-bold">Croissance des Utilisateurs</h2>
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
          
        <div className="flex-grow w-full min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={chartData}
              margin={{
                top: 5,
                right: 20,
                left: 0,
                bottom: windowWidth < 768 ? 60 : 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="period"
                angle={windowWidth < 768 ? -45 : 0}
                textAnchor={windowWidth < 768 ? "end" : "middle"}
                height={windowWidth < 768 ? 80 : 30}
                tick={{ fontSize: windowWidth < 768 ? 10 : 12 }}
                interval={windowWidth < 768 ? 1 : 0}
              />
              <YAxis width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign={windowWidth < 768 ? "bottom" : "top"}
                height={36}
              />
              <Line
                type="monotone"
                dataKey="clients"
                stroke="#2563eb"
                name="Clients"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="prestataires"
                stroke="#16a34a"
                name="Prestataires"
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
  );
};

export default UserChart;