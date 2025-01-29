import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaCamera, FaUserCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import LayoutClients from '../layout/LayoutClients';

const ProfileClient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    prenom: '',
    nom: '',
    email: '',
    photo: null
  });
  const [tempProfile, setTempProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('https://backendtache21.onrender.com/api/clients/profil-client', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Profil récupéré:', response.data);
      setProfile(response.data);
      setTempProfile(response.data);
      if (response.data.photo) setImagePreview(response.data.photo);
    } catch (error) {
      console.error('Erreur fetchProfile:', error.response || error);
      setError('Erreur lors de la récupération du profil');
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validation
      if (!tempProfile.prenom || !tempProfile.nom || !tempProfile.email) {
        setError('Tous les champs sont requis');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('prenom', tempProfile.prenom);
      formData.append('nom', tempProfile.nom);
      formData.append('email', tempProfile.email);
      
      if (tempProfile.photo instanceof File) {
        formData.append('photo', tempProfile.photo);
      }

      // Log formData content
      for (let pair of formData.entries()) {
        console.log('FormData content:', pair[0], pair[1]);
      }

      const response = await axios.put(
        'https://backendtache21.onrender.com/api/clients/mettre-a-jour-client',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Réponse mise à jour:', response.data);

      if (response.data) {
        // Immédiatement récupérer le profil mis à jour
        await fetchProfile();
        
        setIsEditing(false);
        setSuccessMessage('Profil mis à jour avec succès');
        
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }
      
    } catch (error) {
      console.error('Erreur handleSave:', error.response || error);
      const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour du profil';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({...profile});
    setError(null);
    setSuccessMessage(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempProfile({...profile});
    setError(null);
    setSuccessMessage(null);
    setImagePreview(profile.photo);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 5) {
        setError('L\'image est trop grande. Taille maximum: 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setTempProfile(prev => ({
          ...prev,
          photo: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br to-indigo-50 py-12 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h2 className="text-2xl font-bold text-white text-center">Mon Profil</h2>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 mx-6">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 mx-6">
              {successMessage}
            </div>
          )}

          <div className="p-8">
            <div className="flex flex-col items-center">
              <div className="relative group mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition duration-300">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <FaUserCircle className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <div className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition duration-300">
                      <FaCamera size={20} />
                    </div>
                  </label>
                )}
              </div>

              <div className="w-full space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="prenom"
                        value={tempProfile.prenom || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="nom"
                        value={tempProfile.nom || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={tempProfile.email || ''}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre email"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <FaUser className="text-blue-500" />
                      <span className="text-gray-700 font-medium">{profile.prenom} {profile.nom}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-blue-500" />
                      <span className="text-gray-700">{profile.email}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4 pt-6">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition duration-300 flex items-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        <FaSave />
                        <span>{isLoading ? 'Enregistrement...' : 'Enregistrer'}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition duration-300 flex items-center space-x-2"
                      >
                        <FaTimes />
                        <span>Annuler</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition duration-300 flex items-center space-x-2"
                    >
                      <FaEdit />
                      <span>Modifier</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProfileClient;