import { useState } from "react";

const CategorieAjout = ({ ajouterCategorie }) => {
  const [categorie, setCategorie] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!categorie.trim()) {
      setError("Le nom de la catégorie est requis.");
      return;
    }

    setError(""); 
    setLoading(true); 

    try {
      
      await ajouterCategorie(categorie);

      
      setCategorie("");
      console.log("Catégorie ajoutée:", categorie);

    } catch (error) {
      setError("Erreur lors de l'ajout de la catégorie.");
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="p-6 max-w-xs mx-auto bg-white rounded-lg shadow-md md:max-w-md lg:max-w-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Ajouter une catégorie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="categorie" className="block text-gray-700">Nom de la catégorie</label>
          <input
            type="text"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} 
        </div>
        <button
          type="submit"
          disabled={loading} 
          className={`w-full p-3 text-white rounded-xl ${loading ? 'bg-gray-500' : 'bg-blue-500'} hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? "Chargement..." : "Ajouter une catégorie"}
        </button>
      </form>
    </div>
  );
};

export default CategorieAjout;