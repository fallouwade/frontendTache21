import { useState } from "react";  

const CategorieAjout = () => {
  const [categorie, setCategorie] = useState("");  
  const [error, setError] = useState("");  

  const handleSubmit = (e) => {
    e.preventDefault();  

    if (!categorie.trim()) {
      setError("Le nom de la catégorie est requis.");
      return;
    }

    setError("");  
    console.log("Categorie ajoutée :", categorie);
    setCategorie("");  
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Ajouter une catégorie
        </button>
      </form>
    </div>
  );
};

export default CategorieAjout;
