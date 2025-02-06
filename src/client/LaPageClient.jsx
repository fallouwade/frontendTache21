import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LaPageClient() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services/tous-les-services");
        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        setError("Erreur lors de la récupération des services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <div className="text-center p-4">Chargement des services...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (services.length === 0) return <div className="text-center p-4">Aucun service disponible.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Liste des services créés</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={service.imageUrl}
              alt={service.nomDeservice}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{service.nomDeservice}</h3>
              <p className="text-gray-600 mt-2">{service.descriptionDeService}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <span className="text-sm text-gray-500">{service.categorie}</span>
              <Link
                to={`/services/${service._id}`} // Lien vers la page de détails
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Voir plus
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
