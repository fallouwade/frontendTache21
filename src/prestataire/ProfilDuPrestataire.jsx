import { ToastContainer, toast } from "react-toastify"; // Importer react-toastify
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa"; // Icônes pour succès et erreur et les champs
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"; // Importer les styles
import SidebarPrestataire from "./SidebarPrestataire";
import * as motion from "motion/react-client";
import logo from "../../public/images/logo.png";

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
  // empêcher que la page ne scrolle pas
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Empêcher le scroll de la page
    return () => {
      document.body.style.overflow = "auto";
    };
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
  if (isLoading)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
        </motion.div>
      </div>
    );

  return (
    <SidebarPrestataire>
      {/* Conteneur principal avec padding adaptatif pour mobile */}
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* En-tête avec disposition verticale sur mobile */}
          <div className="bg-blue-900 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-center">Mise à jour de profil</h2>
          </div>
          <div className="p-8">
            {/* Formulaire avec espacement vertical augmenté pour mobile */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                    <FaUser className="inline-block mr-2" /> Nom
                  </label>
                  {/* Input avec gestion du débordement de texte */}
                  <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                    <FaUser className="inline-block mr-2" /> Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    <FaEnvelope className="inline-block mr-2" /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                    <FaPhoneAlt className="inline-block mr-2" /> Téléphone
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="inline-block mr-2" /> Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {/* Bouton centré avec marge supérieure augmentée sur mobile */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Mise à jour..." : "Mettre à jour"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SidebarPrestataire>
  );
};

export default ProfilPrestataire;