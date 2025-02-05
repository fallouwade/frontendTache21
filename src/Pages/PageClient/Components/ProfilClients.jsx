import { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaEdit, FaSave, FaCamera, FaUserCircle } from 'react-icons/fa';

const ProfileClient = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    id: '',
    prenom: '',
    nom: '',
    email: '',
    role: '',
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch('https://backendtache21.onrender.com/api/clients/profil-client', {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du profil');
      }
      
      const data = await response.json();
      console.log('Données du profil reçues:', data);
      setProfile(data);
      if (data.photo) setImagePreview(data.photo);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la récupération du profil');
      console.error('Erreur getProfile:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Créer l'objet de données à envoyer
      const updateData = {
        prenom: profile.prenom,
        nom: profile.nom,
        email: profile.email
      };

      console.log('Données à envoyer:', updateData);

      const response = await fetch(
        'https://backendtache21.onrender.com/api/clients/mettre-a-jour-client', // URL sans ID
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json', // Changer en JSON
          },
          body: JSON.stringify(updateData) // Envoyer les données en JSON
        }
      );

      console.log('Status de la réponse:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Réponse erreur:', errorText);
        throw new Error(errorText || 'Erreur lors de la mise à jour');
      }

      const updatedData = await response.json();
      console.log('Données mises à jour reçues:', updatedData);
      
      setProfile(updatedData);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
      console.error('Erreur handleSave:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">Mon Profil</h2>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center">
            <div className="relative group mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
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
                  <div className="p-2 bg-blue-500 rounded-full text-white">
                    <FaCamera size={20} />
                  </div>
                </label>
              )}
            </div>

            <div className="w-full space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="prenom"
                      value={profile.prenom || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                      placeholder="Prénom"
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="nom"
                      value={profile.nom || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                      placeholder="Nom"
                      required
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <FaUser className="text-blue-500" />
                    <span className="text-gray-700 font-medium">
                      {profile.prenom} {profile.nom}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaEnvelope className="text-blue-500" />
                    <span className="text-gray-700">{profile.email}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-6">
                <button
                  onClick={isEditing ? handleSave : handleEdit}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center"
                >
                  {isEditing ? (
                    <>
                      <FaSave className="mr-2" size={20} />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-2" size={20} />
                      Modifier
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;