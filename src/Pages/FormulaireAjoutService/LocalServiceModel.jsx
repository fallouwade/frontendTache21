import  { useState } from 'react';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';
import { SERVICE_CATEGORIES, INITIAL_SERVICE_STATE } from './ServiceData';

// Composant principal 
const LocalServiceModel = () => {
  
  // États pour stocker les services ak le nouveau service bi nekk en cours de création
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(INITIAL_SERVICE_STATE);

  // Gère les changements ci champs yi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  // Gère le téléchargement des photos
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewService(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.map(file => URL.createObjectURL(file))]
    }));
  };

  // Gère le téléchargement des certifications
  const handleCertificationUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewService(prev => ({
      ...prev,
      certifications: [...prev.certifications, ...files.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }))]
    }));
  };

  // Supprime une photo
  const removePhoto = (index) => {
    setNewService(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  // Supprime une certification
  const removeCertification = (index) => {
    setNewService(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Ajoute un nouveau service à la liste
  const addService = () => {
    if (newService.nom && newService.categorie) {
      setServices([...services, newService]);
      setNewService(INITIAL_SERVICE_STATE);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajoute Services</h2>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Service</label>
          <input
            type="text"
            name="nom"
            value={newService.nom}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Entrez le nom du service"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
          <select
            name="categorie"
            value={newService.categorie}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une catégorie</option>
            {SERVICE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Décrivez votre service"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos de vos réalisations</label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100">
              <FaCloudUploadAlt className="mr-2" />
              Télécharger des photos
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          {/* Affichage des photos téléchargées */}

          <div className="flex gap-2 mt-2">
            {newService.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={photo} 
                  alt={`Réalisation ${index + 1}`} 
                  className="w-24 h-24 object-cover rounded"
                />
                <button 
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Téléchargement des certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Certifications/Diplômes</label>
          <div className="flex items-center">
            <label className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer hover:bg-blue-100">
              <FaFileAlt className="mr-2" />
              Télécharger des certifications
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleCertificationUpload}
                className="hidden"
              />
            </label>
          </div>
          {/* Affichage des certifications téléchargées */}
          <div className="mt-2 space-y-2">
            {newService.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FaFileAlt className="mr-2 text-blue-600" />
                  <span>{cert.name}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton d'ajout de service */}
        <button 
          type="button"
          onClick={addService}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Ajouter Service
        </button>
      </form>
    </div>
  );
};

// Exportation du composant
export default LocalServiceModel;