import LayoutClients from '../layout/LayoutClients';
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

const ProfileClient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    prenom: '',
    nom: '',
    email: '',
    photo: null
  });
  const [tempProfile, setTempProfile] = useState(profile);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  // Configuration Axios avec le token
  const axiosInstance = axios.create({
    baseURL: 'https://backendtache21.onrender.com/api',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/clients/profil-client');
      setProfile(response.data);
      setTempProfile(response.data);
      if (response.data.photo) setImagePreview(response.data.photo);
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        setError('Erreur lors de la récupération du profil');
        console.error('Erreur:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile(profile);
  };

  const handleSave = async () => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('prenom', tempProfile.prenom);
      formData.append('nom', tempProfile.nom);
      formData.append('email', tempProfile.email);
      
      // Ajouter la photo seulement si une nouvelle photo a été sélectionnée
      if (tempProfile.photo instanceof File) {
        formData.append('photo', tempProfile.photo);
      }

      const response = await axiosInstance.put('/clients/profil-client', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfile(response.data);
      setIsEditing(false);
      if (response.data.photo) setImagePreview(response.data.photo);
      
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Session expirée. Veuillez vous reconnecter.');
      } else {
        setError(error.response?.data?.message || 'Erreur lors de la sauvegarde');
        console.error('Erreur:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 5) { // 5MB limite
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
    <LayoutClients>
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
                        value={tempProfile.prenom}
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
                        value={tempProfile.nom}
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
                        value={tempProfile.email}
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

                <div className="flex justify-center pt-6">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:opacity-90 transition duration-300 flex items-center space-x-2"
                    >
                      <FaSave />
                      <span>Enregistrer</span>
                    </button>
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
    </LayoutClients>
  );
};

export default ProfileClient;