import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartNouveauInscription = ({ prestataires }) => {
  const [selectedYear, setSelectedYear] = useState(null);

  // Mapping des mois en français
  const MONTHS_FR = {
    'Jan': 'Janv',
    'Feb': 'Févr',
    'Mar': 'Mars',
    'Apr': 'Avr',
    'May': 'Mai',
    'Jun': 'Juin',
    'Jul': 'Juil',
    'Aug': 'Août',
    'Sep': 'Sept',
    'Oct': 'Oct',
    'Nov': 'Nov',
    'Dec': 'Déc'
  };

  const availableYears = useMemo(() => {
    if (!prestataires?.length) return [new Date().getFullYear()];
    
    const years = prestataires.map(p => {
      const date = new Date(p.createdAt);
      return date.getFullYear();
    });
    
    return [...new Set(years)].sort((a, b) => a - b);
  }, [prestataires]);

  useEffect(() => {
    if (!selectedYear && availableYears.length) {
      setSelectedYear(availableYears[availableYears.length - 1]);
    }
  }, [availableYears, selectedYear]);

  const monthlyData = useMemo(() => {
    if (!prestataires?.length) return [];

    const monthCounts = {
      'Janv': 0, 'Févr': 0, 'Mars': 0, 'Avr': 0,
      'Mai': 0, 'Juin': 0, 'Juil': 0, 'Août': 0,
      'Sept': 0, 'Oct': 0, 'Nov': 0, 'Déc': 0
    };
    
    prestataires.forEach(p => {
      const date = new Date(p.createdAt);
      if (date.getFullYear() === selectedYear) {
        const monthEn = date.toLocaleString('en', { month: 'short' });
        const monthFr = MONTHS_FR[monthEn];
        if (monthFr) {
          monthCounts[monthFr] += 1;
        }
      }
    });

    return Object.entries(monthCounts).map(([month, value]) => ({
      month,
      value
    }));
  }, [prestataires, selectedYear]);

  const totalInscriptions = useMemo(() => {
    return monthlyData.reduce((sum, item) => sum + item.value, 0);
  }, [monthlyData]);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="sm:flex justify-between items-center w-full">
          <h1 className="font-semibold text-xl">Prestataires par année</h1>
          <div>
            <label htmlFor="year-select" className="mr-2">Filtrer par année :</label>
            <select
              id="year-select"
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-[200px] sm:h-[250px] md:h-[225px] lg:h-[225px] xl:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis
              domain={[0, 'auto']}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              name="Inscriptions"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-right text-sm text-gray-600">
        Total des inscriptions pour {selectedYear}: {totalInscriptions}
      </div>
    </div>
  );
};

export default ChartNouveauInscription;