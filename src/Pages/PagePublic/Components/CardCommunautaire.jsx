
import { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from './ServicesCard';

export default function CardCommunautaire() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/services/tous-les-services');
        setServices(response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
        setError('Une erreur est survenue lors de la récupération des services');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  if (loading) return <div>Chargement...</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {error && <div className="error-message">{error}</div>}
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.nomDeservice} 
          description={service.descriptionDeService} 
          imgSrc={`https://backendtache21.onrender.com/uploads/images/${service.imageService}`} 
        />
      ))}
    </div>
  );
  
}