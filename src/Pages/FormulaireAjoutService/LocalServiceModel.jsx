import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';

// Définition de l'état initial du service
const INITIAL_SERVICE_STATE = {
  nomDeservice: '',
  categorie: '',
  descriptionDeService: '',
  imageService: [], // Doit être un tableau
  imageDiplomes: [] // Doit être un tableau
};

const LocalServiceModel = () => {
  const [newService, setNewService] = useState(INITIAL_SERVICE_STATE);
  const [categories, setCategories] = useState([]); // État pour stocker les catégories récupérées
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/categories/liste');
        setCategories(response.data); // On stocke les catégories dans l'état
      } catch (err) {
        setError('Erreur de chargement des catégories');
        console.error('Erreur lors de la récupération des catégories', err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewService(prev => ({
        ...prev,
        imageService: [...prev.imageService, { file, preview: imageUrl }],
      }));
    }
  };

  const handleCertificationUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const certUrl = URL.createObjectURL(file);
      setNewService(prev => ({
        ...prev,
        imageDiplomes: [...prev.imageDiplomes, { file, preview: certUrl }],
      }));
    }
  };

  const removePhoto = () => {
    setNewService(prev => ({
      ...prev,
      imageService: []
    }));
  };

  const removeCertification = () => {
    setNewService(prev => ({
      ...prev,
      imageDiplomes: []
    }));
  };

  const addService = async () => {
    if (!newService.nomDeservice || !newService.categorie) {
      setError('Veuillez remplir le nom et la catégorie du service');
      return;
    }

    const formData = new FormData();
    formData.append('nomDeservice', newService.nomDeservice);
    formData.append('categorie', newService.categorie);
    formData.append('descriptionDeService', newService.descriptionDeService || '');

    newService.imageService.forEach(image => {
      formData.append('imageService', image.file);
    });

    newService.imageDiplomes.forEach(cert => {
      formData.append('imageDiplomes', cert.file);
    });

    const token = localStorage.getItem('token');

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('https://backendtache21.onrender.com/api/services/ajouter', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Réponse du serveur:", response.data);

      setNewService(INITIAL_SERVICE_STATE);
      setSuccess('Service ajouté avec succès !');

      // Révoquer les URL temporaires pour libérer la mémoire
      newService.imageService.forEach(photo => URL.revokeObjectURL(photo.preview));
      newService.imageDiplomes.forEach(cert => URL.revokeObjectURL(cert.preview));

    } catch (error) {
      console.error('Erreur lors de l\'ajout du service', error);
      setError('Une erreur est survenue lors de l\'ajout du service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Service</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Service</label>
          <input
            type="text"
            name="nomDeservice"
            value={newService.nomDeservice}
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
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat.nom}>{cat.nom}</option>
              ))
            ) : (
              <option value="">Aucune catégorie disponible</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="descriptionDeService"
            value={newService.descriptionDeService}
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
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex gap-2 mt-2">
            {newService.imageService.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Réalisation ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

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
          <div className="mt-2 space-y-2">
            {newService.imageDiplomes.map((cert, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FaFileAlt className="mr-2 text-blue-600" />
                  <span>{cert.file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={removeCertification}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={addService}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? 'Ajout en cours...' : 'Ajouter Service'}
        </button>
      </form>
    </div>
  );
};

export default LocalServiceModel;
