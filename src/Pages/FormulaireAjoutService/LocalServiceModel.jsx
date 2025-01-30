import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';

// Définition des catégories de services
const SERVICE_CATEGORIES = [
  'Informatique',
  'Santé',
  'Éducation',
  'Bâtiment',
  'Événementiel',
  'Marketing',
  'Autre'
];

// Définition de l'état initial du service
const INITIAL_SERVICE_STATE = {
  nomDeservice: '',
  categorie: '',
  descriptionDeService: '',
  imageService: '',
  imageDiplomes: ''
};

const LocalServiceModel = () => {
  // const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(INITIAL_SERVICE_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  // const handlePhotoUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setNewService(prev => ({
  //     ...prev,
  //     imageService: [...prev.imageService, ...files.map(file => ({
  //       file: file,
  //       preview: URL.createObjectURL(file)
  //     }))],
  //   }));
  // };
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]; // Récupère seulement le premier fichier
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crée l'URL de prévisualisation pour le fichier
      setNewService(prev => ({
        ...prev,
        imageService: [imageUrl], // Remplace le tableau avec un seul élément (l'URL de l'image)
      }));
    }
  };
  
  // const handleCertificationUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setNewService(prev => ({
  //     ...prev,
  //     imageDiplomes: [...prev.imageDiplomes, ...files.map(file => ({
  //       file: file,
  //       name: file.name,
  //       preview: URL.createObjectURL(file)
  //     }))],
  //   }));
  // };
  const handleCertificationUpload = (e) => {
    const file = e.target.files[0]; // Récupère seulement le premier fichier
    if (file) {
      const certUrl = URL.createObjectURL(file); // Crée l'URL de prévisualisation pour le fichier
      setNewService(prev => ({
        ...prev,
        imageDiplomes: [certUrl], // Remplace le tableau avec un seul élément (l'URL de la certification)
      }));
    }
  };
  
  const removePhoto = () => {
    setNewService(prev => ({
      ...prev,
      imageService: ""
    }));
  };

  const removeCertification = () => {
    setNewService(prev => ({
      ...prev,
      imageDiplomes: ""
    }));
  };

  const addService = async () => {
    if (!newService.nomDeservice || !newService.categorie) {
      setError('Veuillez remplir le nom et la catégorie du service');
      return;
    }

    console.log(newService);
    // const formData = new FormData();

    // formData.append('nom', newService.nomDeservice);
    // formData.append('categorie', newService.categorie);
    // formData.append('description', newService.descriptionDeService || '');

    // newService.imageService.forEach((imageService) => {
    //   formData.append('photos', imageService.file);
    // });

    // newService.imageDiplomes.forEach((cert) => {
    //   formData.append('certifications', cert.file);
    // });

    const token = localStorage.getItem('token');

    setLoading(true);
    setError(null);
    setSuccess(null);
    
    // console.log(formData)
    
    try {
      const response = await axios.post('https://backendtache21.onrender.com/api/services/ajouter', {
        nomDeservice: newService.nomDeservice,
        categorie: newService.categorie,
        descriptionDeService: newService.descriptionDeService,
        imageService: newService.imageService,
        imageDiplomes: newService.imageDiplomes,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      });

      // setServices(prev => [...prev, response.data]);
      setNewService(INITIAL_SERVICE_STATE);
      setSuccess('Service ajouté avec succès !');

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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
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
            {SERVICE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
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
            {/* {newService.imageService.map((imageService, index) => ( */}
              {newService.imageService && <div  className="relative">
                <img
                  src={newService.imageService}
                  alt={`Réalisation ${ 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removePhoto()}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash size={12} />
                </button>
              </div>}
            {/* ))} */}
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
            {/* {newService.imageDiplomes.map((cert, index) => ( */}
              {newService.imageDiplomes && <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="flex items-center">
                  <FaFileAlt className="mr-2 text-blue-600" />
                  <span>{newService.imageDiplomes}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCertification()}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>}
            {/* ))} */}
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