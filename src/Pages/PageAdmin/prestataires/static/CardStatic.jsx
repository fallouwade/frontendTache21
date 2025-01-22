import { useState } from 'react';
import TableStatique from './TableStatique';

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
        return <TableStatique headers={servicesData.headers} data={servicesData.data} onBlockService={onBlockService} />;
      case 'Statistics':
        return <TableStatique headers={statisticsData.headers} data={statisticsData.data} />;
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
