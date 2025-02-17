import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegFileAlt, FaTag, FaTrashAlt, FaCheckCircle, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";
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

  // Charger les catégories depuis l'API
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
        if (!token) return;

        const response = await axios.get("https://backendtache21.onrender.com/api/services/service-par-utilisateur", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const services = response.data;
        setServicesCount(services.length);

        if (services.length > 0) {
          const service = services[0];
          setServiceId(service._id);
          setNomDeservice(service.nomDeservice);
          setCategorie(service.categorie);
          setDescriptionDeService(service.descriptionDeService);

          if (service.imageUrl) {
            setImagePreview(service.imageUrl);
          }
        }
      } catch (error) {
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
      setErreur("Une erreur est survenue lors de l'ajout ou modification du service.");
      toast.error("Une erreur est survenue, veuillez réessayer.", {
        icon: <FaExclamationCircle />,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <SidebarPrestataire>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-100 to-gray-200 p-2 sm:p-4">
        <div className="block sm:hidden px-2 mb-2">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Retour
          </button>
        </div>

        <div className="w-full flex-1 flex justify-center">
          <div className="w-full max-w-2xl bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-700 mb-4">
              {serviceId ? "Modifier votre Service" : servicesCount < 2 ? "Ajouter un Service" : "Vous ne pouvez pas ajouter plus de 2 services"}
            </h2>

            {erreur && <p className="text-red-600 text-center font-semibold mb-4">{erreur}</p>}

            {servicesCount < 2 ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700 flex items-center">
                    <FaRegFileAlt className="mr-2 text-blue-500" /> Nom du service
                  </label>
                  <input
                    type="text"
                    value={nomDeservice}
                    onChange={(e) => setNomDeservice(e.target.value)}
                    className="w-full p-2 border rounded-full focus:ring focus:ring-blue-300 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700 flex items-center">
                    <FaTag className="mr-2 text-blue-500" /> Catégorie
                  </label>
                  <select
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                    className="w-full p-2 border rounded-full focus:ring focus:ring-blue-300 focus:outline-none appearance-none bg-white pl-4 pr-10"
                    required
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\"/></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.nom}>{cat.nom}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700 flex items-center">
                    <FaRegFileAlt className="mr-2 text-blue-500" /> Description du service
                  </label>
                  <textarea
                    value={descriptionDeService}
                    onChange={(e) => setDescriptionDeService(e.target.value)}
                    className="w-full p-2 border rounded-2xl focus:ring focus:ring-blue-300 focus:outline-none"
                    rows="4"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="font-medium text-gray-700">Image du Service</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border rounded-full cursor-pointer bg-white"
                  />
                  {(imagePreview || service?.imageUrl) && (
                    <div className="relative inline-block mt-2">
                      <img
                        src={imagePreview || service?.imageUrl}
                        alt="Aperçu"
                        className="w-20 h-20 object-cover rounded-full"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-0 right-0 text-red-500 hover:text-red-700 transition-colors bg-white rounded-full p-1"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded-full shadow-md text-base ${
                      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "En cours..." : serviceId ? "Modifier" : "Ajouter"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-red-600">Vous avez atteint la limite de 2 services. Vous ne pouvez pas ajouter d'autres services.</p>
                <a 
                  href="/services" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                >
                  Voir mes services
                </a>
              </div>
            )}
          </div>
        </div>

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