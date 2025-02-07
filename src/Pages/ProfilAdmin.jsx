import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaUser, 
  FaEnvelope, 
  FaEdit, 
  FaSave, 
  FaCamera, 
  FaUserCircle 
} from 'react-icons/fa';

const ProfilAdmin = () => {
  const [profil, setProfil] = useState({ nom: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProfil = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("⛔ Aucun token trouvé. Veuillez vous reconnecter.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://backendtache21.onrender.com/api/admin/profil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data.administrateur) {
          throw new Error("Données du profil incomplètes !");
        }

        const { nom, email } = response.data.administrateur;
        setProfil({ nom, email });
      } catch (error) {
        setError("Impossible de charger les données du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfil();
  }, []);

  const handleChange = (e) => {
    if (message) setMessage("");
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("⛔ Aucun token trouvé. Veuillez vous reconnecter.");
        return;
      }

      await axios.put(
        "https://backendtache21.onrender.com/api/admin/modifier-profil",
        {
          nom: profil.nom,
          email: profil.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Profil mis à jour avec succès !");
      setEditable(false);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError("Erreur lors de la modification du profil.");
    }
  };

  const handleFileChange = (e) => {
    if (message) setMessage("");
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const renderField = (label, name, value, type = "text", icon = null) => {
    return (
      <div className="space-y-2">
        <label className="block text-gray-600 font-medium">{label}</label>
        {editable ? (
          <div className="relative">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {React.cloneElement(icon, { className: "text-indigo-500" })}
              </div>
            )}
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-xl ${
                icon ? 'pl-10' : ''
              } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-xl text-gray-800">
            {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="p-8 sm:p-12">
          {/* Photo et Actions */}
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Section Photo */}
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

                {editable && (
                  <label className="absolute bottom-2 right-2 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <div className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                      <FaCamera size={20} />
                    </div>
                  </label>
                )}
              </div>
              
              {/* Bouton Modifier/Sauvegarder */}
              <button
                onClick={editable ? handleSubmit : () => setEditable(true)}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-3 text-lg font-medium"
              >
                {editable ? (
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

            {/* Section Informations */}
            <div className="flex-1 mt-8 lg:mt-0">
              <h1 className="text-4xl font-bold text-gray-800 mb-10">
                Mes Informations
              </h1>
              
              {loading ? (
                <p className="text-gray-600">Chargement...</p>
              ) : (
                <div className="space-y-6">
                  {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-xl">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="bg-green-100 text-green-700 p-4 rounded-xl">
                      {message}
                    </div>
                  )}

                  {renderField("Nom complet", "nom", profil.nom, "text", <FaUser />)}
                  {renderField("Email", "email", profil.email, "email", <FaEnvelope />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;