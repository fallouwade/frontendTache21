import { useState } from 'react';
import axios from 'axios';
// import { FaCloudUploadAlt, FaFileAlt, FaTrash } from 'react-icons/fa';

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
  imageService: [],
  imageDiplomes: []
};

const LocalServiceModel = () => {
  const [newService, setNewService] = useState(INITIAL_SERVICE_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Upload d'image vers Cloudinary
  const uploadToCloudinary = async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Remplacez par votre preset
    formData.append('folder', folder);

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dnzva49jt/upload', formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Erreur lors de l\'upload sur Cloudinary:', error.response ? error.response.data : error);
      setError('Échec de l\'upload sur Cloudinary');
      return null;
    }
   
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewService(prev => ({
        ...prev,
        imageService: [...prev.imageService, { file, preview: imageUrl }],
      }));
    }
  };

  const handleCertificationUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const certUrl = URL.createObjectURL(file);
      setNewService(prev => ({
        ...prev,
        imageDiplomes: [...prev.imageDiplomes, { file, preview: certUrl }],
      }));
    }
  };

  const removePhoto = (index) => {
    setNewService(prev => ({
      ...prev,
      imageService: prev.imageService.filter((_, i) => i !== index)
    }));
  };

  const removeCertification = (index) => {
    setNewService(prev => ({
      ...prev,
      imageDiplomes: prev.imageDiplomes.filter((_, i) => i !== index)
    }));
  };

  const addService = async () => {
    if (!newService.nomDeservice || !newService.categorie) {
      setError('Veuillez remplir le nom et la catégorie du service');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Upload des images et documents sur Cloudinary
    const uploadedImages = [];
    for (const image of newService.imageService) {
      const uploadedUrl = await uploadToCloudinary(image.file, 'services');
      if (uploadedUrl) uploadedImages.push(uploadedUrl);
    }

    const uploadedDiplomes = [];
    for (const cert of newService.imageDiplomes) {
      const uploadedUrl = await uploadToCloudinary(cert.file, 'diplomes');
      if (uploadedUrl) uploadedDiplomes.push(uploadedUrl);
    }

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/services/ajouter', {
        nomDeservice: newService.nomDeservice,
        categorie: newService.categorie,
        descriptionDeService: newService.descriptionDeService || '',
        imageService: uploadedImages,
        imageDiplomes: uploadedDiplomes
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log("Réponse du serveur:", response.data);
      setNewService(INITIAL_SERVICE_STATE);
      setSuccess('Service ajouté avec succès !');

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

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{success}</div>}

      <form className="space-y-4">
        <input type="text" name="nomDeservice" value={newService.nomDeservice} onChange={e => setNewService({ ...newService, nomDeservice: e.target.value })} placeholder="Nom du service" className="w-full px-3 py-2 border rounded-md" />
        
        <select name="categorie" value={newService.categorie} onChange={e => setNewService({ ...newService, categorie: e.target.value })} className="w-full px-3 py-2 border rounded-md">
          <option value="">Sélectionnez une catégorie</option>
          {SERVICE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <textarea name="descriptionDeService" value={newService.descriptionDeService} onChange={e => setNewService({ ...newService, descriptionDeService: e.target.value })} placeholder="Décrivez votre service" className="w-full px-3 py-2 border rounded-md" rows="4" />

        <label className="block text-sm font-medium">Photos</label>
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
        {newService.imageService.map((image, index) => (
          <div key={index}>
            <img src={image.preview} alt="Preview" className="w-24 h-24" />
            <button onClick={() => removePhoto(index)}>❌</button>
          </div>
        ))}

        <label className="block text-sm font-medium">Certifications/Diplômes</label>
        <input type="file" accept=".pdf,.jpg,.png" onChange={handleCertificationUpload} />
        {newService.imageDiplomes.map((cert, index) => (
          <div key={index}>
            <span>{cert.file.name}</span>
            <button onClick={() => removeCertification(index)}>❌</button>
          </div>
        ))}

        <button type="button" onClick={addService} disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-md">{loading ? 'Ajout en cours...' : 'Ajouter Service'}</button>
      </form>
    </div>
  );
};

export default LocalServiceModel;
