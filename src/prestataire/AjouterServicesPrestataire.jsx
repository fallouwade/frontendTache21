import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegFileAlt, FaTag, FaTrashAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SidebarPrestataire from "./SidebarPrestataire";

const AjouterServicesPrestataire = () => {
  const [nomDeservice, setNomDeservice] = useState("");
  const [categorie, setCategorie] = useState("");
  const [descriptionDeService, setDescriptionDeService] = useState("");
  const [imageService, setImageService] = useState([]); // Stocke plusieurs images
  const [imagePreview, setImagePreview] = useState([]); // Stocke les aperçus d'images
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
        toast.error("Erreur lors du chargement des catégories.", { icon: <FaExclamationCircle />, theme: "colored" });
      }
    };

    fetchCategories();
  }, []);

  // Charger les services existants
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
          if (service.imagesService) {
            setImagePreview(service.imagesService.map(img => `https://backendtache21.onrender.com/uploads/images/${img}`));
          }
        }
      } catch (error) {
        toast.error("Erreur lors du chargement des services.", { icon: <FaExclamationCircle />, theme: "colored" });
      }
    };

    fetchServices();
  }, []);

  // Gérer la sélection de plusieurs images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageService.length > 5) {
      toast.error("Vous ne pouvez pas ajouter plus de 5 images.", { icon: <FaExclamationCircle />, theme: "colored" });
      return;
    }

    setImageService([...imageService, ...files]);
setImagePreview([...imagePreview, ...files.map(file => URL.createObjectURL(file))]);

  };

  // Supprimer une image sélectionnée
  const removeImage = (index) => {
    const newImages = [...imageService];
    const newPreviews = [...imagePreview];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImageService(newImages);
    setImagePreview(newPreviews);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErreur("");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Veuillez vous connecter pour continuer.", { icon: <FaExclamationCircle />, theme: "colored" });
      setIsLoading(false);
      return;
    }

    if (!nomDeservice || !categorie || !descriptionDeService) {
      toast.error("Tous les champs doivent être remplis.", { icon: <FaExclamationCircle />, theme: "colored" });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nomDeservice", nomDeservice);
    formData.append("categorie", categorie);
    formData.append("descriptionDeService", descriptionDeService);

    imageService.forEach(file => {
      formData.append("imagesService", file); // Ajout multiple d'images
    });

    try {
      let response;
      if (serviceId) {
        response = await axios.put(
          `http://localhost:5000/api/services/modifier/${serviceId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
        );
        toast.success("Service mis à jour avec succès !", { icon: <FaCheckCircle />, theme: "colored" });
      } else {
        response = await axios.post(
          "https://backendtache21.onrender.com/api/services/ajouter",
          formData,
          { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
        );
        setServiceId(response.data._id);
        toast.success("Service ajouté avec succès !", { icon: <FaCheckCircle />, theme: "colored" });
      }
    } catch (error) {
      toast.error("Une erreur est survenue, veuillez réessayer.", { icon: <FaExclamationCircle />, theme: "colored" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SidebarPrestataire>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
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
                  className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300"
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
                  className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300"
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
                  className="w-full p-3 border rounded-xl focus:ring focus:ring-blue-300"
                  rows="3"
                  required
                />
              </div>
  
              <div className="flex flex-col">
                <label className="font-medium text-gray-700">Images du Service</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg cursor-pointer"
                />
  
                {/* Aperçu des images sélectionnées */}
                {imagePreview.length > 0 && (
                  <div className="flex flex-wrap mt-2 gap-2">
                    {imagePreview.map((src, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <img src={src} alt={`Aperçu ${index}`} className="w-full h-full object-cover rounded-md" />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    ))}
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