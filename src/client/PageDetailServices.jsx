import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function PageDetailServices() {
  const { serviceId } = useParams(); // Récupérer l'ID du service depuis l'URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const [typeService, setTypeService] = useState("");
  
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des détails du service.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token"); // Récupérer le token depuis localStorage
      if (!token) {
        alert("Vous devez être connecté pour envoyer une demande.");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/demandes-services/demande", // L'URL de l'API
        {
          typeService: service.nomDeservice,  // Nom du service sélectionné
          numeroTelephone,                    // Numéro de téléphone
          description: message,               // Description de la demande
          adresse,                            // Adresse du service
          date,                               // Date prévue pour le service
          prestataireId: service.prestataire._id,  // ID du prestataire
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Ajouter le token dans les headers
          },
        }
      );
  
      alert("Demande envoyée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi de la demande.");
    }
  };
  
  

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">{service.nomDeservice}</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <img
          src={service.imageUrl}
          alt={service.nomDeservice}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-600">{service.descriptionDeService}</p>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Faire une demande</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre numéro de téléphone"
          className="w-full p-4 border border-gray-300 rounded-md mb-4"
          value={numeroTelephone}
          onChange={(e) => setNumeroTelephone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Adresse où le service est requis"
          className="w-full p-4 border border-gray-300 rounded-md mb-4"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded-md mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md mb-4"
          placeholder="Dites-nous ce que vous avez en tête"
          rows="5"
         
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Envoyer la demande
        </button>
      </form>
    </div>
  );
}
