import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import Image from "/images/electricien.jpg";

const EditerProfil = () => {
    const [userData, setUserData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        entreprise: "",
        description: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Récupérer les données du profil existant
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "https://backendtache21.onrender.com/api/prestataires/profil-prestataire",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUserData(response.data);
                setIsLoading(false);
            } catch (error) {
                setError("Impossible de récupérer les informations du profil.");
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.id]: e.target.value });
    };

    // Soumettre les modifications
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            await axios.put(
                "https://backendtache21.onrender.com/api/prestataires/profil-prestataire",
                userData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIsSaving(false);
            navigate("/profil"); // Redirige vers le profil après la mise à jour
        } catch (error) {
            setError("Erreur lors de la mise à jour du profil.");
            setIsSaving(false);
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
                                    id="nom"
                                    value={userData.nom}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="prenom"
                                    value={userData.prenom}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    value={userData.telephone}
                                    onChange={handleChange}
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
                        {userData.prenom || "Non renseigné"}
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                        {userData.entreprise || "Non renseigné"}
                    </p>
                    <p className="text-center mb-4">
                        {userData.description || "Non renseigné"}
                    </p>
                    <a
                        href="/profil"
                        className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                    >
                        Voir Profil
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default EditerProfil;
