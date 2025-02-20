import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CardStatic from "./PageAdmin/static/CardStatic";

const ProfilPrestataire = () => {
    const { id } = useParams();
    const API_URL_prestataire = "https://backendtache21.onrender.com/api/prestataires/liste-prestataires";
    const BLOCK_URL = `https://backendtache21.onrender.com/api/admin/prestataire/bloquer/${id}`;
    const UNBLOCK_URL = `https://backendtache21.onrender.com/api/admin/prestataire/debloquer/${id}`;

    const [prestataire, setPrestataire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBlocked, setIsBlocked] = useState(false);
    const [notification, setNotification] = useState(null);

    const token = localStorage.getItem("token");

    // Fonction pour reccuperer seulement la date 
    function getFormattedDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    }

    // Requête pour récupérer les prestataires et vérifier l'attribut 'actif'
    useEffect(() => {
        if (!token) {
            setError("Authentification requise !");
            setLoading(false);
            return;
        }

        axios.get(API_URL_prestataire, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (!Array.isArray(response.data)) {
                    setError("Données invalides reçues de l'API !");
                    setLoading(false);
                    return;
                }

                const foundPrestataire = response.data.find(p => p._id && p._id.toString() === id);
                if (!foundPrestataire) {
                    setError("Prestataire non trouvé !");
                } else {
                    setPrestataire(foundPrestataire);
                    // Initialiser le statut bloqué basé sur l'attribut 'actif'
                    const isPrestataireBlocked = foundPrestataire.actif === false;
                    setIsBlocked(isPrestataireBlocked);

                    // Sauvegarder l'état de blocage dans le localStorage
                    localStorage.setItem(`prestataire-blocked-${id}`, isPrestataireBlocked.toString());
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du prestataire:", error);
                setError("Problème de connexion au serveur.");
                setLoading(false);
            });
    }, [id, token]);

    // Fonction pour bloquer ou débloquer le prestataire
    const toggleBlockStatus = () => {
        const url = isBlocked ? UNBLOCK_URL : BLOCK_URL;

        axios.put(url, { id, actif: !isBlocked }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(() => {
                // Recharger les données après mise à jour
                axios.get(API_URL_prestataire, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        const updatedPrestataire = response.data.find(p => p._id === id);
                        if (updatedPrestataire) {
                            setPrestataire(updatedPrestataire);
                            setIsBlocked(!updatedPrestataire.actif);
                            // Sauvegarder l'état dans le localStorage
                            localStorage.setItem(`prestataire-blocked-${id}`, !updatedPrestataire.actif);

                            // Ajouter une notification
                            setNotification({
                                message: `Le prestataire ${updatedPrestataire.nom} ${updatedPrestataire.prenom} a été ${updatedPrestataire.actif ? "débloqué" : "bloqué"}.`,
                                type: updatedPrestataire.actif ? 'success' : 'red'
                            });

                            // Effacer la notification après 3 secondes
                            setTimeout(() => setNotification(null), 3000);
                        }
                    });
            })
            .catch(error => {
                console.error("Erreur lors du changement de statut :", error);
                setError("Impossible de changer le statut du prestataire");

                // Ajouter une notification d'erreur
                setNotification({
                    message: "Impossible de changer le statut du prestataire.",
                    type: 'error'
                });

                // Effacer la notification après 3 secondes
                setTimeout(() => setNotification(null), 2000);
            });
    };

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10 relative">
            {/* Notification Toast */}
            {notification && (
                <div className={`right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-200
                    ${notification.type === 'success' ? 'bg-green-500 text-white' :
                        notification.type === 'red' ? 'bg-red-500 text-white' :
                            'bg-red-500 text-white'}`}>
                    {notification.message}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <Link to={"/dashboardAdmin/prestataire"} className="flex items-center text-gray-600">
                    <HiOutlineArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Colonne gauche */}
                <div className="md:col-span-1">
                    <div className="text-center mb-6">
                        {prestataire.image ? (
                            <img
                                src={prestataire.image}
                                alt="Profile"
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        ) : (
                            <FaUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4 border-2 border-[#0a2342] rounded-full" />
                        )}
                        <h2 className="text-xl font-bold">{prestataire.nom} {prestataire.prenom}</h2>
                        <p className="text-gray-600">{prestataire.metier}</p>
                    </div>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        {prestataire.description || "Aucune description disponible."}
                    </p>
                </div>

                {/* Colonne droite */}
                <div className="md:col-span-2">
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4 text-center border">Informations</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 text-sm">RÉGION</p>
                                <p className="font-medium">{prestataire.region}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">ADRESSE E-MAIL</p>
                                <p className="font-medium">{prestataire.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">DÉPARTEMENT</p>
                                <p className="font-medium">{prestataire.departement}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">TÉLÉPHONE</p>
                                <p className="font-medium">{prestataire.telephone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <CardStatic />
                    </div>

                    <div className="text-center text-gray-600 mt-6">
                        <p><strong>Date de creation du prestataire: </strong> {getFormattedDate(prestataire.createdAt)}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={toggleBlockStatus}
                            className={`flex-1 border py-2 rounded-lg transition-all duration-200 transform active:scale-95 ${isBlocked
                                ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                }`}
                        >
                            {isBlocked ? "Débloquer" : "Bloquer"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilPrestataire;
