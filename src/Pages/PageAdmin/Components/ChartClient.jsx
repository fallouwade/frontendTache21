import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const ChartClient = ({ clients }) => {
  const [selectedYear, setSelectedYear] = useState(null); // initialisé à null pour déterminer dynamiquement l'année à afficher
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fonction pour organiser les données par mois et année
  const getYearlyData = (clients) => {
    const data = {};
    
    clients.forEach((client) => {
      const date = new Date(client.createdAt);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });

      if (!data[year]) {
        data[year] = Array(12).fill({ month: '', users: 0 });
      }

      const monthIndex = date.getMonth();
      data[year][monthIndex] = { month, users: data[year][monthIndex].users + 1 };
    });

    return data;
  };

  // Fonction pour obtenir l'année du premier client inscrit
  const getFirstYear = (clients) => {
    if (clients.length === 0) return null;
    const sortedClients = [...clients].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    const firstClientYear = new Date(sortedClients[0].createdAt).getFullYear();
    return firstClientYear;
  };

  const yearlyData = useMemo(() => getYearlyData(clients), [clients]);
  const firstYear = useMemo(() => getFirstYear(clients), [clients]);

  const years = useMemo(() => {
    // Filtrer les années pour ne garder que celles après l'année de la première inscription
    const filteredYears = Object.keys(yearlyData).filter(year => parseInt(year) >= firstYear);
    return filteredYears;
  }, [yearlyData, firstYear]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-lg shadow-lg p-3 text-sm">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">
            {payload[0].value !== null ? `${payload[0].value} utilisateurs` : 'Pas de données'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Sélecteur d'année pour choisir une année spécifique
  const YearSelector = () => (
    <div className="relative min-w-[100px]">
      <button
        className="flex items-center justify-between w-full text-sm px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-sm font-medium">{selectedYear || firstYear}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-full bg-white border rounded-lg shadow-lg z-50">
          {years.map((year) => (
            <button
              key={year}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 
                ${year === selectedYear ? 'bg-blue-50 text-blue-600' : ''} 
                ${year === years[0] ? 'rounded-t-lg' : ''}
                ${year === years[years.length - 1] ? 'rounded-b-lg' : ''}`}
              onClick={() => {
                setSelectedYear(year);
                setIsDropdownOpen(false);
              }}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Filtrer les données en fonction de l'année sélectionnée
  const dataForSelectedYear = data[selectedYear] || [];

  return (
    <div className="w-full max-w-full p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Utilisateurs Inscrits</h2>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Utilisateurs actifs</span>
            </div>
            <YearSelector />
          </div>
        </div>
      </div>

      {/* Conteneur du graphique avec hauteur ajustée */}
      <div className="w-full h-[500px] sm:h-[550px] md:h-[600px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearlyData[selectedYear || firstYear]} // Si aucun année sélectionnée, utilise la première année d'inscription
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="horizontal"
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis
              dataKey="month"
              fontSize={12}
              tickMargin={10}
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
              radius={[6, 6, 0, 0]}
              barSize={30}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartClient;
