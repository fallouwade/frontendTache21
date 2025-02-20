import { useEffect, useState } from "react";
import SidebarPrestataire from "./SidebarPrestataire";
import axios from "axios";

export default function LesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [filtre, setFiltre] = useState("Nouveaux messages");
  const [search, setSearch] = useState("");
  const [allDemandes, setAllDemandes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false); // Nouvel état pour gérer le message de traitement
  const token = localStorage.getItem('token');

  function getFormattedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Fonction de tri par date
  const sortByDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

  useEffect(() => {
    const reccupDemande = async () => {
      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/demandes-services/clientAll');
        const prestataireId = JSON.parse(atob(token.split('.')[1])).id;
        const prestataireServices = response.data.demandes
          .filter(service => service.prestataire.id === prestataireId)
          .sort(sortByDateDesc); // Tri initial des données
        setAllDemandes(prestataireServices);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    reccupDemande();
  }, [token]);

  useEffect(() => {
    // Filtrer par statut puis trier par date
    const demandesFiltrees = allDemandes
      .filter(demande => {
        switch (filtre) {
          case "Nouveaux messages":
            return demande.statut === "attente";
          case "Demandes acceptées":
            return demande.statut === "accepte";
          case "Demandes refusées":
            return demande.statut === "refuse";
          default:
            return false;
        }
      })
      .sort(sortByDateDesc); // Tri après filtrage

    setDemandes(demandesFiltrees);
    setCurrentPage(1);
  }, [filtre, allDemandes]);

  const handleActionDemande = async (demandeId, action) => {
    setIsProcessing(true); // Afficher le message de traitement
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.put(`https://backendtache21.onrender.com/api/demandes-services/${demandeId}/${action}`, {}, config);
      
      const updatedStatus = action === 'accepter' ? 'accepte' : 'refuse';
      const updatedAllDemandes = allDemandes.map(demande =>
        demande._id === demandeId
          ? { ...demande, statut: updatedStatus }
          : demande
      ).sort(sortByDateDesc); // Tri après mise à jour
      
      setAllDemandes(updatedAllDemandes);
      setFiltre(updatedStatus === 'accepte' ? "Demandes acceptées" : "Demandes refusées");
    } catch (error) {
      console.error(`Erreur lors de l'action ${action}:`, error);
    } finally {
      setIsProcessing(false); // Cacher le message après traitement
    }
  };

  const indexOfLastDemande = currentPage * itemsPerPage;
  const indexOfFirstDemande = indexOfLastDemande - itemsPerPage;

  // Appliquer la recherche sur les demandes déjà triées
  const filteredDemandes = demandes
    .filter(demande => demande.description.toLowerCase().includes(search.toLowerCase()))
    .sort(sortByDateDesc); // Maintenir le tri après la recherche

  const currentDemandes = filteredDemandes.slice(indexOfFirstDemande, indexOfLastDemande);
  const totalPages = Math.max(1, Math.ceil(filteredDemandes.length / itemsPerPage));

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

  const renderDemandeContent = (demande) => {
    const baseContent = (
      <>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
          <h3 className="text-base sm:text-xl font-semibold text-gray-800 truncate">
            Demande de {demande.demandeur?.nom || 'Client'}
          </h3>
          <span className="text-sm sm:text-base text-gray-600">
            {getFormattedDate(demande.date)}
          </span>
        </div>

        <div className="mt-3 sm:mt-4">
          <p className="text-sm sm:text-base text-gray-800 break-words">
            <span className="text-gray-600 font-medium">Description : </span>
            <span className="line-clamp-4 break-words transition-all duration-200">
              {demande.description}
            </span>
          </p>
        </div>
      </>
    );

    const statusContent = {
      refuse: (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">
            Cette demande a été refusée. Les informations de contact du client ne sont plus accessibles.
          </p>
        </div>
      ),
      attente: (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">
            En acceptant cette demande, vous aurez accès aux informations de contact du client.
          </p>
        </div>
      ),
      accepte: (
        <div className="mt-4 space-y-2 sm:space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Numéro de téléphone:
            </p>
            <p className="text-gray-800 text-sm sm:text-base break-all">
              {demande.numeroTelephone}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
            <p className="text-gray-600 font-medium text-sm sm:text-base">Email :</p>
            <p className="text-gray-800 text-sm sm:text-base break-all">
              {demande.demandeur?.email || 'Non disponible'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
            <p className="text-gray-600 font-medium text-sm sm:text-base">Adresse:</p>
            <p className="text-gray-800 text-sm sm:text-base break-all">
              {demande.adresse}
            </p>
          </div>
        </div>
      )
    };

    return (
      <>
        {baseContent}
        {statusContent[demande.statut]}
      </>
    );
  };

  return (
    <SidebarPrestataire>
      <div className="min-h-screen p-2 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg shadow-xl bg-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-blue-600 mb-4 md:mb-6">
            Vos demandes de services
          </h2>

          <input
            type="text"
            placeholder="Rechercher une demande..."
            className="w-full p-2 border rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row border-b pb-2 mb-4 gap-2 sm:gap-0">
            {["Nouveaux messages", "Demandes acceptées", "Demandes refusées"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base ${
                  filtre === tab
                    ? "border-b-2 border-black font-semibold bg-gray-50"
                    : "text-gray-500 hover:bg-gray-50"
                } rounded-t-lg transition-colors`}
                onClick={() => setFiltre(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4 sm:space-y-6">
            {currentDemandes.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Aucune demande trouvée.</p>
            ) : (
              currentDemandes.map((demande) => (
                <div
                  key={demande._id}
                  className="bg-slate-100 p-3 sm:p-6 rounded-lg shadow-sm hover:shadow-lg transition-all"
                >
                  {renderDemandeContent(demande)}

                  {isProcessing && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-600">Traitement en cours...</p>
                    </div>
                  )}

                  {demande.statut === 'attente' && (
                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-end gap-2">
                      <button
                        onClick={() => handleActionDemande(demande._id, 'accepter')}
                        className="w-full sm:w-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200 text-sm sm:text-base"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => handleActionDemande(demande._id, 'refuser')}
                        className="w-full sm:w-auto bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 text-sm sm:text-base"
                      >
                        Refuser
                      </button>
                    </div>
                  )}

                  {(demande.statut === 'accepte' || demande.statut === 'refuse') && (
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <button
                        disabled
                        className={`
                          ${demande.statut === 'accepte' ? 'bg-green-300' : 'bg-red-300'} 
                          text-white py-2 px-6 rounded-lg cursor-not-allowed w-full sm:w-auto text-sm sm:text-base
                        `}
                      >
                        {demande.statut === 'accepte' ? 'Acceptée' : 'Refusée'}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:space-x-2 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
                  : 'bg-blue-500 text-gray-100 hover:bg-blue-600'
              }`}
            >
              Précédent
            </button>

            <p className="px-4 py-2 text-gray-700 text-sm sm:text-base">
              Page {currentPage} / {Math.max(1, totalPages)}
            </p>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 1}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto ${
                currentPage === totalPages || totalPages === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-gray-100 hover:bg-blue-600'
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </SidebarPrestataire>
  );
}
