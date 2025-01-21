import { useState } from 'react';

const Table = ({ headers, data, onBlockService }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 text-sm text-gray-500">
                {cell}
              </td>
            ))}
            {/* Afficher le bouton "Bloqué" uniquement si l'onglet actuel est "Services" */}
            {onBlockService && (
              <td>
                <button
                  className="border border-red-600 hover:bg-red-600 text-red-600 hover:text-white py-2 px-4 rounded-lg
                              transition-all duration-200 transform active:scale-95"
                >
                  Bloqué
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CardStatic = () => {
  const [activeTab, setActiveTab] = useState('Services');
  
  // Statut de chaque service (bloqué ou non)
  const [blockedServices, setBlockedServices] = useState([]);

  // Données des services disponibles
  const servicesData = {
    headers: ['Service', 'Description', 'Disponibilité', 'Action'],
    data: [
      {
        service: 'Réparation PC',
        description: 'Diagnostic et réparation d\'ordinateurs',
        disponibilite: 'Lun-Ven, 9h-18h'
      },
      {
        service: 'Installation Réseau',
        description: 'Configuration et mise en place de réseaux',
        disponibilite: 'Lun-Sam, 8h-20h'
      }
    ]
  };

  // Fonction pour gérer le blocage d'un service
  const onBlockService = (index) => {
    setBlockedServices((prev) => {
      // Si le service est déjà bloqué, on le débloque, sinon on le bloque
      if (prev.includes(index)) {
        return prev.filter((id) => id !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Statistiques d'utilisation des services
  const statisticsData = {
    headers: ['Service', 'Fréquence d\'exécution'],
    data: [
      {
        service: 'Réparation PC',
        clients: '150',
      },
      {
        service: 'Installation Réseau',
        clients: '45',
      }
    ]
  };

  // Rendu du contenu en fonction de l'onglet sélectionné
  const renderContent = () => {
    switch (activeTab) {
      case 'Services':
        return <Table headers={servicesData.headers} data={servicesData.data} onBlockService={onBlockService} />;
      case 'Statistics':
        return <Table headers={statisticsData.headers} data={statisticsData.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
      <div className="border-b">
        <div className="flex">
          {['Services', 'Statistics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-center transition-colors ${activeTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default CardStatic;
