import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa"; // Import de l'icône utilisateur
import { Link, useParams } from "react-router-dom";
import CardStatic from "./PageAdmin/static/CardStatic";

const ProfilPrestataire = () => {
    const { id } = useParams(); // Récupérer l'ID depuis l'URL
    const API_URL_prestataire = "https://backendtache21.onrender.com/api/prestataires/liste-prestataires";

    // State pour stocker les données du prestataire
    const [prestataire, setPrestataire] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer le token depuis le localStorage
    const token = localStorage.getItem("token");

    // Requête API pour récupérer la liste des prestataires et filtrer celui correspondant à l'ID
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
            }
            setLoading(false);
        })
        .catch(error => {
            console.error("Erreur lors de la récupération du prestataire:", error);
            setError("Problème de connexion au serveur.");
            setLoading(false);
        });
    }, [id, token]);

    if (loading) return <p className="text-center text-gray-500">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
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
                            <FaUserCircle className="w-32 h-32 text-gray-400 mx-auto mb-4 border-2 border-[#0a2342] rounded-full" /> // Icône utilisateur
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
                        <p><strong>ID du prestataire :</strong> {id}</p>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 
                                            hover:text-white py-2 rounded-lg transition-all duration-200 transform active:scale-95">
                            Bloqué
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilPrestataire;
