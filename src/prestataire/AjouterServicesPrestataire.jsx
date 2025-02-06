import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegFileAlt, FaTag, FaTrashAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarPrestataire from "./SidebarPrestataire";

const AjouterServicesPrestataire = () => {
  const [service, setService] = useState(null);
  const [nomDeservice, setNomDeservice] = useState("");
  const [categorie, setCategorie] = useState("");
  const [descriptionDeService, setDescriptionDeService] = useState("");
  const [imageService, setImageService] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [servicesCount, setServicesCount] = useState(0);
  const [categories, setCategories] = useState([]);

  // Charger les catégories depuis 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://backendtache21.onrender.com/api/categories/liste");
        setCategories(response.data);
      } catch (error) {
        toast.error("Une erreur est survenue lors du chargement des catégories.", {
          icon: <FaExclamationCircle />,
          theme: "colored",
        });
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);

        const prestataireId = localStorage.getItem("id");

        if (!token) return;

        const response = await axios.get("https://backendtache21.onrender.com/api/services/tous-les-services", {
          headers: { Authorization: `Bearer ${token}` },
        });
     
        // Filtrer les services par l'ID du prestataire connecté
        const servicesDuPrestataire = response.data.filter(
          service => service.prestataire.toString() === prestataireId
        );

        const services = response.data;
        setServicesCount(services.length);

        if (services.length > 0) {
          const service = servicesDuPrestataire[0];
          setServiceId(service._id);
          setNomDeservice(service.nomDeservice);
          setCategorie(service.categorie);
          setDescriptionDeService(service.descriptionDeService);

          if (service.imageUrl) {
            setImagePreview(service.imageUrl);
          }
        }
      } catch (error) {
        console.log(error)
        toast.error("Une erreur est survenue lors du chargement des services.", {
          icon: <FaExclamationCircle />,
          theme: "colored",
        });
      }
    };

    fetchServices();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageService(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageService(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErreur("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErreur("Vous devez être connecté pour effectuer cette action.");
      setIsLoading(false);
      toast.error("Veuillez vous connecter pour continuer.", {
        icon: <FaExclamationCircle />,
        theme: "colored",
      });
      return;
    }

    if (!nomDeservice || !categorie || !descriptionDeService) {
      setErreur("Veuillez remplir tous les champs requis.");
      setIsLoading(false);
      toast.error("Tous les champs doivent être remplis.", {
        icon: <FaExclamationCircle />,
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("nomDeservice", nomDeservice);
    formData.append("categorie", categorie);
    formData.append("descriptionDeService", descriptionDeService);
    if (imageService) formData.append("imageService", imageService);

    try {
      let response;
      if (serviceId) {
        // Mode modification
        response = await axios.put(
          `https://backendtache21.onrender.com/api/services/modifier/${serviceId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Service mis à jour avec succès !", {
          icon: <FaCheckCircle />,
          theme: "colored",
        });
      } else {
        // Mode ajout
        response = await axios.post(
          "https://backendtache21.onrender.com/api/services/ajouter",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setServiceId(response.data._id);
        toast.success("Service ajouté avec succès !", {
          icon: <FaCheckCircle />,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
      setErreur("Une erreur est survenue lors de l'ajout ou modification du service.");
      toast.error("Une erreur est survenue, veuillez réessayer.", {
        icon: <FaExclamationCircle />,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarPrestataire>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
            {serviceId ? "Modifier votre Service" : servicesCount < 2 ? "Ajouter un Service" : "Vous ne pouvez pas ajouter plus de 2 services"}
          </h2>

          {erreur && <p className="text-red-600 text-center font-semibold">{erreur}</p>}

          {servicesCount < 2 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaRegFileAlt className="mr-2 text-blue-500" /> Nom du service
                </label>
                <input
                  type="text"
                  value={nomDeservice}
                  onChange={(e) => setNomDeservice(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaTag className="mr-2 text-blue-500" /> Catégorie
                </label>
                <select
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.nom}>{cat.nom}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700 flex items-center">
                  <FaRegFileAlt className="mr-2 text-blue-500" /> Description du service
                </label>
                <textarea
                  value={descriptionDeService}
                  onChange={(e) => setDescriptionDeService(e.target.value)}
                  className="w-full p-2 rounded-xl focus:ring focus:ring-blue-300"
                  rows="3"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Image du Service</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded-xl cursor-pointer"
                />
                {(imagePreview || service?.imageUrl) && (
                  <div className="mt-3 flex items-center space-x-4">
                    <img
                      src={imagePreview || service?.imageUrl}
                      alt="Aperçu"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-lg flex items-center space-x-1"
                    >
                      <FaTrashAlt /> <span>Supprimer</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-xl shadow-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                  disabled={isLoading}
                >
                  {isLoading ? "En cours..." : serviceId ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center text-red-600">Vous avez atteint la limite de 2 services. Vous ne pouvez pas ajouter d'autres services.</p>
          )}
        </div>

        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"
          className="z-50"
        />
      </div>
    </SidebarPrestataire>
  );
};

export default AjouterServicesPrestataire;
