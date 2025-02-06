
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';

const ProfilCli = () => {
  // États pour gérer les données et l'interface utilisateur
  const [isEditing, setIsEditing] = useState(false);        // Mode édition
  const [profile, setProfile] = useState({                  // Données du profil
    id: '',
    prenom: '',
    nom: '',
    email: '',
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);   // Aperçu de l'image
  const [error, setError] = useState(null);                 // Messages erreur
  const [isLoading, setIsLoading] = useState(true);        // État de chargement
  const [updateSuccess, setUpdateSuccess] = useState(false);// Message de succès

  // Charger les données du profil ci moments montage composant bi
  useEffect(() => {
    getProfile();
  }, []);

  // Fonction biy récupérer les données du profil depuis l'API
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://backendtache21.onrender.com/api/clients/profil-client', {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setProfile(data);
      // TODO: Pour que la photo du dem après actualisation,(meme si k marcher gul coter backend)
      // le backend doit renvoyer l'URL complète de l'image dans data.photo
      if (data.photo) setImagePreview(data.photo);
      setError(null);
    } catch (error) {
      console.error('Erreur getProfile:', error);
      setError('Impossible de récupérer les informations du profil.');
    } finally {
      setIsLoading(false);
    }
  };

  // pour activer le mode édition
  const handleEdit = () => {
    setIsEditing(true);
    setUpdateSuccess(false);
  };

  // Sauvegarder les modifications du profil
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Utilisation de FormData pour pouvoir envoyer des fichiers
      const formData = new FormData();
      formData.append('prenom', profile.prenom);
      formData.append('nom', profile.nom);
      formData.append('email', profile.email);
      if (profile.photo instanceof File) {
        formData.append('photo', profile.photo);
      }

      const response = await fetch(
        'https://backendtache21.onrender.com/api/clients/mettre-a-jour-client',
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const updatedData = await response.json();
      setProfile(updatedData);
      setIsEditing(false);
      setError(null);
      setUpdateSuccess(true);
      
      // Rafraîchir les données pour avoir les dernières modifications
      getProfile();
      
      // Masquer le message de succès après 3 secondes
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur handleSave:', error);
      setError('Erreur lors de la mise à jour du profil. Veuillez réessayer.');
    }
  };

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // pour gérer le changement d'image de profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier la taille du fichier (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB');
        return;
      }

      // Créer un aperçu de l'image
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

  // Afficher un loader pendant le chargement
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
          {/* Affichage des messages d'erreur */}
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

          {/* Message de succès */}
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
              {/* Section photo de profil */}
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
                  {/* Bouton pour changer la photo (mais c visible uniquement en mode édition) */}
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
                
                {/* Bouton Modifier/Sauvegarder */}
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

              {/* Section informations du profil */}
              <div className="flex-1 mt-8 lg:mt-0">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">
                  Mes Informations
                </h1>
                
                {/* Formulaire d'édition ou affichage des informations */}
                {isEditing ? (
                  <div className="space-y-8">
                    {/* Champ prénom */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="prenom"
                        value={profile.prenom}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Prénom"
                      />
                    </div>
                    {/* Champ nom */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="nom"
                        value={profile.nom}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Nom"
                      />
                    </div>
                    {/* Champ email */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                ) : (
                  // Affichage des informations en mode lecture
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
