import { useState, useEffect } from 'react';
import axios from 'axios';
import TableStatique from './TableStatique';
import { useParams } from 'react-router-dom';

const CardStatic = () => {
  const [activeTab, setActiveTab] = useState('Services');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL_services = "https://backendtache21.onrender.com/api/services/tous-les-services";
  const { id } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(API_URL_services, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const reccupServices = response.data;
        
        // Filtrer les services par l'ID du prestataire
        const filteredServices = reccupServices.filter(service => service.prestataire._id === id ).map(service => ({
          service: service.nomDeservice,
          categorie: service.categorie,
          description: service.descriptionDeService,
        }));
        
        setServices(filteredServices);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des services:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  // Rendu du contenu en fonction de l'onglet sélectionné
  const renderContent = () => {
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    // Contrôle si aucun service n'est trouvé
    if (services.length === 0) {
      return (
        <div className="text-center text-gray-600 p-6 bg-gray-100 rounded-lg">
          <p className="text-lg font-semibold">Aucun service n'a été trouvé pour ce prestataire!</p>
        </div>
      );
    }

    return (
      <TableStatique 
        headers={['Service','Catégorie', 'Description']} 
        data={services} 
      />
    );
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto border rounded-lg shadow-lg">
      <div className="border-b">
        <div className="flex">
          {['Services'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 text-center transition-colors ${
                activeTab === tab
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