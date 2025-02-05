import { ToastContainer, toast } from 'react-toastify'; // Importer react-toastify
import { FaCheckCircle, FaTimesCircle, FaUser, FaEnvelope, FaPhoneAlt, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa'; // Icônes pour succès et erreur et les champs
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles
import SidebarPrestataire from './SidebarPrestataire';
import { RingLoader } from 'react-spinners'; // Importer le spinner

const ProfilPrestataire = () => {
  const [profil, setProfil] = useState(null);
  const [erreur, setErreur] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [nomDeLentreprise, setNomDeLentreprise] = useState("");
  const [region, setRegion] = useState("");
  const [departement, setDepartement] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErreur("Token manquant, veuillez vous reconnecter.");
          return;
        }

        const response = await axios.get(
          "https://backendtache21.onrender.com/api/prestataires/profil-prestataire",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.prestataire) {
          const prestataire = response.data.prestataire;
          setProfil(prestataire);
          setNom(prestataire.nom);
          setPrenom(prestataire.prenom);
          setEmail(prestataire.email);
          setTelephone(prestataire.telephone);
          setNomDeLentreprise(prestataire.nomDeLentreprise);
          setRegion(prestataire.region);
          setDepartement(prestataire.departement);
          setDescription(prestataire.description);
        } else {
          setErreur("Données du prestataire introuvables.");
        }
      } catch (error) {
        console.error("Erreur API :", error);
        setErreur("Erreur lors de la récupération du profil.");
      }
    };

    fetchProfil();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://backendtache21.onrender.com/api/prestataires/mettre-a-jour-prestataire",
        {
          nom,
          prenom,
          email,
          telephone,
          nomDeLentreprise,
          region,
          departement,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.prestataire) {
        setProfil(response.data.prestataire);
        setErreur("");
        toast.success("Profil mis à jour avec succès!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          icon: <FaCheckCircle />, // Icône de succès
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          },
        });
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      setErreur("Erreur lors de la mise à jour du profil.");
      toast.error("Erreur lors de la mise à jour du profil.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        icon: <FaTimesCircle />, // Icône d'erreur
        style: {
          backgroundColor: "#F44336",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontWeight: "bold",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (erreur) return <p className="text-red-600 text-center mt-4">{erreur}</p>;
  if (isLoading) return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <RingLoader size={100} color="#3498db" loading={true} />
      <p className="text-white text-xl ml-4">Chargement...</p>
    </div>
  );

  return (
    <SidebarPrestataire>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
        <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Modifier votre Profil
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaUser className="mr-2" /> Nom
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaUser className="mr-2" /> Prénom
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaPhoneAlt className="mr-2" /> Téléphone
                </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaBuilding className="mr-2" /> Entreprise
                </label>
                <input
                  type="text"
                  value={nomDeLentreprise}
                  onChange={(e) => setNomDeLentreprise(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Région
                </label>
                <input
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Département
                </label>
                <input
                  type="text"
                  value={departement}
                  onChange={(e) => setDepartement(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="col-span-1 sm:col-span-2">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                  rows="3"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Mise à jour..." : "Mettre à jour"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer /> {/* Afficher le ToastContainer */}
    </SidebarPrestataire>
  );
};

export default ProfilPrestataire;
