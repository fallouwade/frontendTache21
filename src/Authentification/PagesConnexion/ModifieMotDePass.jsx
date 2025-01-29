import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ModifieMotDePass = () => {
  const [formData, setFormData] = useState({ email: "", codeReset: "", nouveauMotDePasse: "" });
  const navigate = useNavigate(); // Initialisation de la navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Données envoyées au backend", formData);

    // Validation basique des champs côté front
    if (!formData.email || !formData.codeReset || !formData.nouveauMotDePasse) {
      return toast.error("Tous les champs sont requis.");
    }
    
    if (formData.nouveauMotDePasse.length < 6) {
      return toast.error("Le mot de passe doit comporter au moins 6 caractères.");
    }

    try {
      // URL dynamique pour l'API (utilisation d'une variable d'environnement)
      const response = await axios.post(`https://backendtache21.onrender.com/api/mot-de-passe/modifier`, formData);

      toast.success(response.data.message || "Mot de passe réinitialisé avec succès !");
      
      // Rediriger vers la page de connexion après succès
      navigate("/connexion");
    } catch (err) {
      // Gestion plus précise des erreurs
      console.log(err.response);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Une erreur est survenue.");
      } else {
        toast.error("Problème de connexion au serveur. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <div className="container mx-auto my-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Réinitialisation de mot de passe</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow focus:outline-none"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="codeReset" className="block text-gray-700 text-sm font-bold mb-2">Code de réinitialisation</label>
          <input
            type="text"
            id="codeReset"
            name="codeReset"
            value={formData.codeReset}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow focus:outline-none"
            placeholder="Code de réinitialisation"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nouveauMotDePasse" className="block text-gray-700 text-sm font-bold mb-2">Nouveau mot de passe</label>
          <input
            type="password"
            id="nouveauMotDePasse"
            name="nouveauMotDePasse"
            value={formData.nouveauMotDePasse}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow focus:outline-none"
            placeholder="Nouveau mot de passe"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ModifieMotDePass;
