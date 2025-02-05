import { useState } from 'react';
import TableStatique from './TableStatique';

const CardStatic = () => {
  const [activeTab, setActiveTab] = useState('Services');
  const API_URL_services = "https://backendtache21.onrender.com/api/services/tous-les-services";
  
  // Données des services disponibles
  const servicesData = {
    headers: ['Service', 'Description'],
    data: [
      {
        service: 'Réparation PC',
        description: 'Diagnostic et réparation d\'ordinateurs',
      },
      {
        service: 'Installation Réseau',
        description: 'Configuration et mise en place de réseaux',
      }
    ]
  };


  // Rendu du contenu en fonction de l'onglet sélectionné
  const renderContent = () => {
    switch (activeTab) {
      case 'Services':
        return <TableStatique headers={servicesData.headers} data={servicesData.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
      <div className="border-b">
        <div className="flex">
          {['Services'].map((tab) => (
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