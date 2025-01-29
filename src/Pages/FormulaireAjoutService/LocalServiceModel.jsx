import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';
import { SERVICE_CATEGORIES, INITIAL_SERVICE_STATE } from './serviceData';


const LocalServiceModel = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(INITIAL_SERVICE_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewService(prev => ({
      ...prev,
      photos: [...prev.photos, ...files.map(file => ({
        file: file,
        preview: URL.createObjectURL(file)
      }))]
    }));
  };

  const handleCertificationUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewService(prev => ({
      ...prev,
      certifications: [...prev.certifications, ...files.map(file => ({
        file: file,
        name: file.name,
        preview: URL.createObjectURL(file)
      }))]
    }));
  };

  const removePhoto = (index) => {
    setNewService(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const removeCertification = (index) => {
    setNewService(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addService = async () => {
    // Validation de base
    if (!newService.nom || !newService.categorie) {
      setError('Veuillez remplir le nom et la catégorie du service');
      return;
    }

    const formData = new FormData();
    formData.append('nom', newService.nom);
    formData.append('categorie', newService.categorie);
    formData.append('description', newService.description || '');

    // Ajouter les photos
    newService.photos.forEach((photo) => {
      formData.append('photos', photo.file);
    });

    // Ajouter les certifications
    newService.certifications.forEach((cert) => {
      formData.append('certifications', cert.file);
    });

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await axios.post(
        'https://backendtache21.onrender.com/api/services/ajouter', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Réinitialiser le formulaire
      setServices(prev => [...prev, response.data]);
      setNewService(INITIAL_SERVICE_STATE);
      setSuccess('Service ajouté avec succès !');

      // Nettoyer les prévisualisations
      newService.photos.forEach(photo => URL.revokeObjectURL(photo.preview));
      newService.certifications.forEach(cert => URL.revokeObjectURL(cert.preview));

    } catch (err) {
      console.error('Erreur lors de l\'ajout du service:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ajouter un Service</h2>
      
      {/* Gestion des messages */}
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
        {/* Nom du service */}
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

        {/* Catégorie */}
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

        {/* Description */}
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

        {/* Upload Photos */}
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
          <div className="flex gap-2 mt-2">
            {newService.photos.map((photo, index) => (
              <div key={index} className="relative">
                <img 
                  src={photo.preview} 
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

        {/* Upload Certifications */}
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

        {/* Bouton d'ajout */}
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
