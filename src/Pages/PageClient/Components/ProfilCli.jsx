import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';

const ProfilCli = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    prenom: '',
    nom: '',
    email: '',
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    verifyUserAndLoadProfile();
  }, []);

  const verifyUserAndLoadProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('https://backendtache21.onrender.com/api/clients/profil-client', {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          navigate('/profil-prestataire');
          return;
        }
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setProfile(data);
      if (data.photo) setImagePreview(data.photo);
      setError(null);
    } catch (error) {
      console.error('Erreur de vérification:', error);
      if (error.message.includes('401') || error.message.includes('403')) {
        navigate('/profil-prestataire');
      } else {
        setError('Erreur lors du chargement du profil');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('prenom', profile.prenom);
      formData.append('nom', profile.nom);
      formData.append('email', profile.email);
      if (profile.photo && profile.photo instanceof File) {
        formData.append('photo', profile.photo);
      }

      const response = await fetch(
        'https://backendtache21.onrender.com/api/clients/mettre-a-jour-client',
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prenom: profile.prenom,
            nom: profile.nom,
            email: profile.email
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('Profil mis à jour:', data);
      
      setIsEditing(false);
      setError(null);
      setUpdateSuccess(true);

      // Recharger les informations du profil
      await verifyUserAndLoadProfile();

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfile(prev => ({
          ...prev,
          photo: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-800 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {error && (
            <div className="p-4 mx-4 mt-6 bg-red-100 text-red-700 rounded-xl flex items-center justify-between">
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {updateSuccess && (
            <div className="p-4 mx-4 mt-6 bg-green-100 text-green-700 rounded-xl flex items-center justify-between">
              <span>Profil mis à jour avec succès!</span>
              <button 
                onClick={() => setUpdateSuccess(false)}
                className="text-green-500 hover:text-green-700"
              >
                ×
              </button>
            </div>
          )}

          <div className="p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-600">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <FaUserCircle className="w-32 h-32 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <div className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                        <FaCamera size={20} />
                      </div>
                    </label>
                  )}
                </div>
                
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
                >
                  {isEditing ? (
                    <>
                      <FaSave size={20} />
                      <span>Enregistrer</span>
                    </>
                  ) : (
                    <>
                      <FaEdit size={20} />
                      <span>Modifier le profil</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 mt-8 lg:mt-0">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">
                  Mes Informations
                </h1>
                
                {isEditing ? (
                  <div className="space-y-8">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="prenom"
                        value={profile.prenom}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-1 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Prénom"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="nom"
                        value={profile.nom}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-1 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Nom"
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-1 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 bg-gray-50 p-8 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <FaUser className="text-indigo-600 w-8 h-8 flex-shrink-0" />
                      <div>
                        <h3 className="text-base font-medium text-gray-500">Nom complet</h3>
                        <p className="text-xl font-medium text-gray-900 mt-1">
                          {profile.prenom} {profile.nom}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FaEnvelope className="text-indigo-600 w-8 h-8 flex-shrink-0" />
                      <div>
                        <h3 className="text-base font-medium text-gray-500">Email</h3>
                        <p className="text-xl text-gray-900 mt-1">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCli;