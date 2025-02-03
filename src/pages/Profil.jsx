import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import Image from "/images/electricien.jpg";
import { Link } from "react-router-dom";

const Profil = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  console.log("Token récupéré :", token);

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
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response ? error.response.data : "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestataireData();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-700">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
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
              <p className="text-gray-800">{formData.nom || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Prénom</p>
              <p className="text-gray-800">{formData.prenom || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Téléphone</p>
              <p className="text-gray-800">{formData.telephone || "Non renseigné"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="text-gray-800">{formData.email || "Non renseigné"}</p>
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
            {formData.prenom || "Non renseigné"}
          </h2>
          <p className="text-gray-600 text-center mb-4">
            {formData.nomDeLentreprise || "Non renseigné"}
          </p>
          <p className="text-center mb-4">{formData.description || "Non renseigné"}</p>
          <Link
            to="/editerprofil"
            className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Éditer Profil
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Profil;
