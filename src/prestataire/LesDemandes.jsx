import { useEffect, useState } from "react";
import SidebarPrestataire from "./SidebarPrestataire";
import axios from "axios";

export default function LesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [filtre, setFiltre] = useState("Nouveaux messages");
  const [search, setSearch] = useState("");
  const [allDemandes, setAllDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);  // 2 services par page
  const token = localStorage.getItem('token');

  useEffect(() => {
    const reccupDemande = async () => {
      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/demandes-services/clientAll');
        const prestataireId = JSON.parse(atob(token.split('.')[1])).id;
        const prestataireServices = response.data.demandes.filter(
          service => service.prestataire.id === prestataireId
        );
        setAllDemandes(prestataireServices);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    reccupDemande();
  }, [token]);

  useEffect(() => {
    setDemandes(allDemandes.filter(demande => 
      (filtre === "Nouveaux messages" && demande.statut === "en attente") ||
      (filtre === "Demandes acceptées" && demande.statut === "accepte") ||
      (filtre === "Demandes refusées" && demande.statut === "refuse")
    ));
  }, [filtre, allDemandes]);

  const handleActionDemande = async (demandeId, action) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`https://backendtache21.onrender.com/api/demandes-services/${demandeId}/${action}`, {}, config);
      setAllDemandes(allDemandes.map(demande => 
        demande._id === demandeId ? { ...demande, statut: action === 'accepter' ? 'accepte' : 'refuse' } : demande
      ));
    } catch (error) {
      console.error(`Erreur lors de l'action ${action}:`, error);
    }
  };

  // Pagination logic
  const indexOfLastDemande = currentPage * itemsPerPage;
  const indexOfFirstDemande = indexOfLastDemande - itemsPerPage;
  const currentDemandes = demandes.slice(indexOfFirstDemande, indexOfLastDemande);

  const totalPages = Math.ceil(demandes.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle "Previous" and "Next" buttons
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <SidebarPrestataire>
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Vos demandes de services</h2>
          
          <input 
            type="text" 
            placeholder="Rechercher une demande..." 
            className="w-full p-2 border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex border-b pb-2 mb-4">
            {["Nouveaux messages", "Demandes acceptées", "Demandes refusées"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 ${filtre === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"}`}
                onClick={() => setFiltre(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentDemandes.filter(demande => 
              demande.description.toLowerCase().includes(search.toLowerCase())
            ).length === 0 ? (
              <p className="text-center text-gray-500">Aucune demande trouvée.</p>
            ) : (
              currentDemandes.filter(demande => 
                demande.description.toLowerCase().includes(search.toLowerCase())
              ).map((demande) => (
                <div
                  key={demande._id}
                  className="bg-slate-100 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Demande de {demande.demandeur?.nom || 'Client'}
                  </h3>
                  <p className="text-gray-600 mt-2">{demande.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Numéro de téléphone:</p>
                      <p className="text-gray-800">{demande.numeroTelephone}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Email :</p>
                      <p className="text-gray-800">{demande.demandeur?.email || 'Non disponible'}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Adresse:</p>
                      <p className="text-gray-800">{demande.adresse}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    {demande.statut === 'accepte' || demande.statut === 'refuse' ? (
                      <button 
                        disabled 
                        className={`
                          ${demande.statut === 'accepte' ? 'bg-green-500' : 'bg-red-500'} 
                          text-white py-2 px-4 rounded-lg cursor-not-allowed
                        `}
                      >
                        {demande.statut === 'accepte' ? 'Acceptée' : 'Refusée'}
                      </button>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleActionDemande(demande._id, 'accepter')}
                          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                          Accepter
                        </button>
                        <button 
                          onClick={() => handleActionDemande(demande._id, 'refuser')}
                          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                          Refuser
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              Précédent
            </button>
            
            {/* Display current page and total pages with slash */}
            <p className="px-4 py-2 text-gray-700">
              Page {currentPage} / {totalPages}
            </p>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </SidebarPrestataire>
  );
}
