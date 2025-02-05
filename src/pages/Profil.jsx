import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import Image from "/images/electricien.jpg";
import { Link } from "react-router-dom";

const Profil = () => {
  const [userData, setUserData] = useState({});
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log("Token récupéré :", token);

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
      setUserData(data);
      setIsLoading(false);
      setUpdate(prev => !prev); // Force un re-render
    } catch (error) {
      setError(error.response ? error.response.data : "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestataireData();
  }, [update]);

  if (isLoading) {
    return <p className="text-center text-gray-700">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  // fonction de mis à jour
  const handleUpdate = (id) => {
    navigate(`/editerprofil/${id}`)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 mt-10">Profil</h1>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">
            Informations personnelles
          </h2>
          <div className="grid grid-cols-2">
            <div className="mb-3">
              <p className="font-semibold text-gray-600">Nom</p>
              <p className="text-gray-800">{userData.prestataire?.nom || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Prénom</p>
              <p className="text-gray-800">{userData.prestataire?.prenom || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Téléphone</p>
              <p className="text-gray-800">{userData.prestataire?.telephone || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="text-gray-800">{userData.prestataire?.email || "Non renseigné"}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={Image}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center mb-2">
            {userData.prestataire?.prenom || "Non renseigné"}
          </h2>
          <p className="text-gray-600 text-center mb-4">
            {userData.prestataire?.nomDeLentreprise || "Non renseigné"}
          </p>
          <p className="text-center mb-4">{userData.prestataire?.description || "Non renseigné"}</p>
          <button
             onClick={() => handleUpdate(userData.prestataire?.id)}
            //  to="/editerprofil/:id"
            className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Éditer Profil
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profil;
