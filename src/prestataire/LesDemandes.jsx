import { useEffect, useState } from "react";
import SidebarPrestataire from "./SidebarPrestataire";
import axios from "axios";

export default function LesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [page, setPage] = useState(1);
  const [erreur, setErreur] = useState("");
  const [demandesParPage] = useState(2);
  const [allDemandes, setAllDemandes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const reccupDemande = async () => {
      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/demandes-services/toutes');
        const prestataireId = JSON.parse(atob(token.split('.')[1])).id;
        const prestataireServices = response.data.demandes.filter(
          service => service.prestataire.id === prestataireId
        );
        
        setAllDemandes(prestataireServices);
        updateDisplayedDemandes(prestataireServices);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    reccupDemande();
  }, [token]);

  useEffect(() => {
    updateDisplayedDemandes(allDemandes);
  }, [filtre, page, allDemandes]);

  const updateDisplayedDemandes = (services) => {
    const demandesFiltrees = services.filter((demande) =>
      demande.client?.nom?.toLowerCase().includes(filtre.toLowerCase()) ||
      demande.description?.toLowerCase().includes(filtre.toLowerCase())
    );

    const indexOfLast = page * demandesParPage;
    const indexOfFirst = indexOfLast - demandesParPage;
    setDemandes(demandesFiltrees.slice(indexOfFirst, indexOfLast));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(allDemandes.filter(demande => 
    demande.client?.nom?.toLowerCase().includes(filtre.toLowerCase()) ||
    demande.description?.toLowerCase().includes(filtre.toLowerCase())
  ).length / demandesParPage);

  return (
    <SidebarPrestataire>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            Vos demandes de services
          </h2>

          {erreur && <p className="text-red-600 text-center mb-4">{erreur}</p>}

          <div className="flex items-center relative w-full pb-5">
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full p-3 pl-10 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/3 transform -translate-y-1/2 text-gray-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {filtre && (
              <button
                onClick={() => setFiltre('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          <div className="space-y-6">
            {demandes.length === 0 ? (
              <p className="text-center text-gray-500">Aucune demande trouvée.</p>
            ) : (
              demandes.map((demande) => (
                <div
                  key={demande._id}
                  className="bg-slate-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Demande de {demande.client?.nom || 'Client'}
                  </h3>
                  <p className="text-gray-600 mt-2">{demande.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Numéro de téléphone:</p>
                      <p className="text-gray-800">{demande.numeroTelephone}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Email :</p>
                      <p className="text-gray-800">{demande.client?.email || 'Non disponible'}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Adresse:</p>
                      <p className="text-gray-800">{demande.adresse}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
                      Accepter
                    </button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">
                      Refuser
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              className={`${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                text-white py-2 px-4 rounded-lg`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </button>
            <span className="text-gray-600">
              Page {page} sur {totalPages}
            </span>
            <button
              className={`${page >= totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} 
                text-white py-2 px-4 rounded-lg`}
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </SidebarPrestataire>
  );
}