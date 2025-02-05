import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Image from "/images/electricien.jpg";
import { toast } from "react-toastify";

const EditerProfil = () => {
    const { id } = useParams()
    const [userData, setUserData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        nomDeLentreprise: "",
        description: "",
    });
    const [prestataire, setPrestataire] = useState({});

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Récupérer les données du profil existant
    const fetchPrestataireData = async () => {
        if (!token) {
          setError("Token manquant. Veuillez vous reconnecter.");
          setIsLoading(false);
          return;
        }   
        try {
          const response = await axios.get("https://backendtache21.onrender.com/api/prestataires/profil-prestataire", {
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            }
          });
    
          const data = response.data;
          console.log("Données reçues :", data);
        // afficher les autres infos du profil
        setPrestataire(data);
        // recupérer les données à mettre à jour    
        setUserData({
            nom: data.prestataire?.nom || "Non renseigné",
            prenom: data.prestataire?.prenom || "Non renseigné",
            email: data.prestataire?.email || "Non renseigné",
            telephone: data.prestataire?.telephone || "Non renseigné",
            description: data.prestataire?.description || "Non renseigné",
            nomDeLentreprise: data.prestataire?.nomDeLentreprise || "Non renseigné",
        });
          setIsLoading(false);
        } catch (error) {
          setError(error.response ? error.response.data : "Impossible de charger les données");
          setIsLoading(false);
        }
      };
      useEffect(() => {
        fetchPrestataireData();
      }, [id]);
  
    // Gérer les changements dans le formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value,
        });
      };
    
    // Soumettre les modifications
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);
        try {
            const response = await axios.post('https://backendtache21.onrender.com/api/prestataires/profil-prestataire', userData, {
                    headers: {
                      'Content-Type': 'application/json',
                    //    Authorization: `Bearer ${token}`,
                    }
              });
            toast.success('Mis à jour effectuée !');
            setTimeout(() => {
            navigate('/profil');
            }, 3000);
            
          } catch (err) {
            console.error('Erreur : ', err);
            setError(err.message);
            toast.error(err.message || "Une erreur est survenue lors de la mis à jour");
          } finally {
            setIsLoading(false);
          }
    };

    if (isLoading) return <p className="text-center text-gray-700">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <Layout>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 pt-6 mt-6">
                Éditer Profil
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    name="nom"
                                    value={userData.nom}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    name="prenom"
                                    value={userData.prenom}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={userData.telephone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input
                                    type="texte"
                                    name="description"
                                    value={userData.description}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                    Nom Entreprise
                                </label>
                                <input
                                    type="texte"
                                    name="nomDeLentreprise"
                                    value={userData.nomDeLentreprise}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                {isSaving ? "Enregistrement..." : "Enregistrer"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img
                        src={Image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold text-center mb-2">
                        {prestataire.prestataire?.prenom || "Non renseigné"}
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                        {prestataire.prestataire?.nomDeLentreprise || "Non renseigné"}
                    </p>
                    <p className="text-center mb-4">
                        {prestataire.prestataire?.description || "Non renseigné"}
                    </p>
                    <Link
                        to="/profil"
                        className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                    >
                        Voir Profil
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default EditerProfil;
