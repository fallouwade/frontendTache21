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
          <img src={logo} alt="Chargement..." className="h-24" />
        </motion.div>
      </div>
    );

  return (
    <SidebarPrestataire>
      {/* Conteneur principal avec padding adaptatif pour mobile */}
      <div className="font-std mb-5 rounded-2xl bg-white w-2/3 relative top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2 sm:p-20 font-normal leading-relaxed text-gray-900 shadow-xl">
        {/* Conteneur flex avec espacement ajusté pour mobile */}
        <div className="flex flex-col mx-2 sm:mx-10">
          {/* En-tête avec disposition verticale sur mobile */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-5 gap-6">
            {/* Titre avec taille de texte réduite sur mobile */}
            <h2 className="mb-2 md:mb-5 text-2xl sm:text-4xl font-bold text-blue-900 text-center md:text-left">
              Mise à jour de profil
            </h2>
           
          </div>
          
          {/* Formulaire avec espacement vertical augmenté pour mobile */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center mb-1">
                  <FaUser className="mr-2" /> Nom
                </label>
                {/* Input avec gestion du débordement de texte */}
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300 text-sm sm:text-base overflow-ellipsis"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center mb-1">
                  <FaUser className="mr-2" /> Prénom
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300 text-sm sm:text-base overflow-ellipsis"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center mb-1">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300 text-sm sm:text-base overflow-ellipsis"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center mb-1">
                  <FaPhoneAlt className="mr-2" /> Téléphone
                </label>
                <input
                  type="text"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300 text-sm sm:text-base overflow-ellipsis"
                  required
                />
              </div>

              {/* Champ de description qui s'étend sur toute la largeur */}
              <div className="col-span-1 sm:col-span-2">
                <label className="font-medium text-gray-700 flex items-center mb-1">
                  <FaMapMarkerAlt className="mr-2" /> Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300 text-sm sm:text-base"
                  rows="3"
                />
              </div>
            </div>

            {/* Bouton centré avec marge supérieure augmentée sur mobile */}
            <div className="text-center mt-6 sm:mt-8">
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-900 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition duration-300 text-sm sm:text-base"
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