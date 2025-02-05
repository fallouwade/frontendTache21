import { useEffect, useState } from "react";
import SidebarPrestataire from "./SidebarPrestataire";

export default function LesDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [filtre, setFiltre] = useState("");
  const [page, setPage] = useState(1);
  const [erreur, setErreur] = useState("");
  const [demandesParPage] = useState(2); // Nombre de demandes par page

  // Charger les demandes des clients (simulateur pour le design)
  useEffect(() => {
    // Simuler des demandes pour le design avec plus d'informations
    const fakeDemandes = [
      { _id: 1, clientNom: "Jean Dupont", clientTel: "0123456789", clientAdresse: "123 Rue de Paris, 75000 Paris", description: "Service de nettoyage" },
      { _id: 2, clientNom: "Marie Leblanc", clientTel: "0987654321", clientAdresse: "456 Avenue des Champs, 75008 Paris", description: "Peinture de la maison" },
      { _id: 3, clientNom: "Pierre Martin", clientTel: "0145782965", clientAdresse: "789 Boulevard Saint-Germain, 75006 Paris", description: "Déménagement" },
      { _id: 4, clientNom: "Sophie Durand", clientTel: "0167382912", clientAdresse: "112 Rue de Lyon, 75012 Paris", description: "Réparation d'ordinateur" },
      { _id: 5, clientNom: "Alexandre Lefevre", clientTel: "0172618345", clientAdresse: "56 Rue de la République, 69002 Lyon", description: "Nettoyage après travaux" },
      { _id: 6, clientNom: "Clara Dubois", clientTel: "0178481920", clientAdresse: "23 Rue des Fleurs, 75015 Paris", description: "Jardinage" },
      { _id: 7, clientNom: "Lucie Gauthier", clientTel: "0134567890", clientAdresse: "99 Rue de la Paix, 75008 Paris", description: "Aide à domicile" },
      { _id: 8, clientNom: "Michel Roux", clientTel: "0158743201", clientAdresse: "24 Avenue Victor Hugo, 75016 Paris", description: "Dépannage informatique" },
    ];

    // Appliquer le filtre de recherche
    const demandesFiltres = fakeDemandes.filter((demande) =>
      demande.clientNom.toLowerCase().includes(filtre.toLowerCase())
    );

    // Calculer les demandes à afficher pour la page actuelle
    const indexOfLast = page * demandesParPage;
    const indexOfFirst = indexOfLast - demandesParPage;
    const demandesActuelles = demandesFiltres.slice(indexOfFirst, indexOfLast);

    setDemandes(demandesActuelles);
  }, [filtre, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <SidebarPrestataire>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
            Vos demandes de services
          </h2>

          {erreur && <p className="text-red-600 text-center mb-4">{erreur}</p>}

          {/* Filtre de recherche */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher par nom"
              className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
            />
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
                    Demande de {demande.clientNom}
                  </h3>
                  <p className="text-gray-600 mt-2">{demande.description}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Numéro de téléphone:</p>
                      <p className="text-gray-800">{demande.clientTel}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 font-medium">Adresse:</p>
                      <p className="text-gray-800">{demande.clientAdresse}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      Accepter
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-4">
            <button
              className={`${
                page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 px-4 rounded-lg`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Précédent
            </button>
            <button
              className={`${
                demandes.length < demandesParPage ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 px-4 rounded-lg`}
              onClick={() => handlePageChange(page + 1)}
              disabled={demandes.length < demandesParPage}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </SidebarPrestataire>
  );
}
