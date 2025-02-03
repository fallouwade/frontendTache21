import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell
} from 'recharts';

const ChartNouveauInscription = ({ prestataires }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Fonction pour formater la date et obtenir le mois
  const getMois = (date) => {
    const mois = new Date(date).toLocaleString('fr-FR', { month: 'long' });
    return mois.charAt(0).toUpperCase() + mois.slice(1);
  };

  // Traitement des données pour regrouper par mois
  const processData = () => {
    const inscriptionParMois = {};
    
    prestataires.forEach(prestataire => {
      const mois = getMois(prestataire.createdAt);
      inscriptionParMois[mois] = (inscriptionParMois[mois] || 0) + 1;
    });

    // Conversion en tableau pour Recharts
    return Object.entries(inscriptionParMois).map(([mois, count]) => ({
      mois,
      inscriptions: count
    }));
  };

  const data = processData();
  const defaultColor = '#3b82f6';
  const hoverColor = '#2563eb';

  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Nouvelles inscriptions par mois
        </h2>
      </div>
      <div className=" h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barSize={40}
            onMouseMove={(state) => {
              if (state?.activeTooltipIndex !== undefined) {
                setActiveIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="mois" 
              tick={{ fill: '#666' }}
            />
            <YAxis 
              tick={{ fill: '#666' }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="inscriptions" 
              name="Inscriptions"
              radius={[4, 4, 0, 0]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === activeIndex ? hoverColor : defaultColor}
                  style={{ transition: 'fill 0.3s ease' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartNouveauInscription;