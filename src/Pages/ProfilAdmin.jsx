import React, { useEffect, useState } from "react";
import axios from "axios";

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
    // Clear message when editing
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

      // Remove message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError("Erreur lors de la modification du profil.");
    }
  };

  const handleFileChange = (e) => {
    // Clear message when changing file
    if (message) setMessage("");
    
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-10">
      {/* Photo section on top for mobile */}
      <div className="flex flex-col items-center mb-6 md:hidden">
        <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-gray-400 shadow-lg mb-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Photo de profil"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-4xl">👤</span>
          )}
        </div>

        <label
          htmlFor="photo"
          className="mt-3 bg-gray-700 text-white px-2 py-1 text-sm rounded cursor-pointer hover:bg-gray-600 transition-colors"
        >
          📷 Photo
        </label>
        <input
          type="file"
          id="photo"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Main content in row for desktop, column for mobile */}
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:w-2/3 md:pr-6 md:border-r border-gray-300">
          {loading && <p className="text-blue-600">Chargement du profil...</p>}

          {error && (
            <div className="mb-4 text-red-600 p-2 bg-red-100 rounded">
              {error}
            </div>
          )}

          {!loading && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="nom"
                  value={profil.nom}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  disabled={!editable}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profil.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                  disabled={!editable}
                />
              </div>

              {message && <p className="text-green-500 mb-4">{message}</p>}

              {!editable ? (
                <button
                  onClick={() => setEditable(true)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Modifier
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
                >
                  Sauvegarder
                </button>
              )}
            </>
          )}
        </div>

        {/* Photo section hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-col items-center md:ml-6 md:w-1/3">
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-4 border-gray-400 shadow-lg mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-4xl">👤</span>
            )}
          </div>

          <label
            htmlFor="photo"
            className="mt-3 bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors"
          >
            📷 Ajouter une photo
          </label>
          <input
            type="file"
            id="photo"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilAdmin;