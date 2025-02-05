import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * Composant ProfilAdmin
 * Gère l'affichage et la modification du profil administrateur
 * Permet de modifier les informations personnelles et d'ajouter une photo
 */
const ProfilAdmin = () => {
  // États pour gérer les données du profil et l'interface utilisateur
  const [profil, setProfil] = useState({ nom: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editable, setEditable] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  /**
   * Effet pour charger les données du profil au montage du composant
   * Récupère les informations depuis l'API avec authentification
   */
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

  /**
   * Gère les changements dans les champs du formulaire
   * @param {Event} e - L'événement de changement
   */
  const handleChange = (e) => {
    if (message) setMessage("");
    setProfil({ ...profil, [e.target.name]: e.target.value });
  };

  /**
   * Gère la soumission du formulaire de modification
   * Envoie les modifications à l'API
   * @param {Event} e - L'événement de soumission
   */
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

      // Efface le message de succès après 3 secondes
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setError("Erreur lors de la modification du profil.");
    }
  };

  /**
   * Gère le changement de fichier pour la photo de profil
   * @param {Event} e - L'événement de changement de fichier
   */
  const handleFileChange = (e) => {
    if (message) setMessage("");
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  /**
   * Fonction utilitaire pour rendre un champ du formulaire
   * Alterne entre mode lecture (div) et mode édition (input)
   * @param {string} label - Le label du champ
   * @param {string} name - Le nom du champ
   * @param {string} value - La valeur du champ
   * @param {string} type - Le type d'input (défaut: "text")
   */
  const renderField = (label, name, value, type = "text") => {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
        {editable ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
          />
        ) : (
          // En mode lecture, on utilise un div simple sans bordure
          <div className="w-full p-2 text-gray-700">
            {value}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mt-10">
      {/* Section photo de profil mobile */}
      <div className="flex flex-col items-center mb-8 md:hidden">
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
          className="bg-gray-700 text-white px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-gray-600 transition-colors"
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

      <div className="flex flex-col md:flex-row">
        {/* Section principale du formulaire */}
        <div className="flex flex-col md:w-2/3 md:pr-8 md:border-r border-gray-300">
          {loading && <p className="text-blue-600">Chargement du profil...</p>}

          {error && (
            <div className="mb-6 text-red-600 p-3 bg-red-100 rounded">
              {error}
            </div>
          )}

          {!loading && (
            <>
              {renderField("Nom complet", "nom", profil.nom)}
              {renderField("Adresse email", "email", profil.email, "email")}

              {message && <p className="text-green-500 mb-6">{message}</p>}

              {/* Bouton qui change selon le mode (édition ou lecture) */}
              {!editable ? (
                <button
                  onClick={() => setEditable(true)}
                  className="w-full px-4 py-2.5 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Modifier Mes Informations
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-2.5 bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
                >
                  Sauvegarder
                </button>
              )}
            </>
          )}
        </div>

        {/* Section photo de profil desktop */}
        <div className="hidden md:flex flex-col items-center md:ml-8 md:w-1/3">
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
            className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors"
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