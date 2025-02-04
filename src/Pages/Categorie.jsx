import { useState, useEffect } from "react";
import axios from "axios"; 
import CategorieListe from "./PageAdmin/Components/CategorieListe";
import CategorieAjout from "./PageAdmin/Components/CategorieAjout";

const Categorie = () => {
  const [categories, setCategories] = useState([]);  
  const [categoriesArchivees, setCategoriesArchivees] = useState([]);  

  const getCategories = async () => {
    try {
      const response = await axios.get("https://backendtache21.onrender.com/api/categories/liste");
  
      console.log("Données reçues de l'API:", response.data);
  
      const categoriesWithNom = response.data.filter(categories => {
        const nom = categories.nom ? categories.nom.trim() : "";  
        console.log("Nom de la catégorie après trim:", nom);  
        return nom.length > 0;
      });
  
      console.log("Catégories filtrées avec un nom valide:", categoriesWithNom);  

      setCategories(categoriesWithNom);
  
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  const ajouterCategorie = async (categorie) => {
    try {
      const response = await axios.post("https://backendtache21.onrender.com/api/categories/ajouter", {
        nom: categorie,
      });

      if (response.status === 201) {
        setCategories((prevCategories) => [
          ...prevCategories,
          { nom: categorie },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  };

  const archiverCategorie = (categorieNom) => {
    try {
      // Mettre à jour les catégories
      setCategories((prevCategories) => prevCategories.filter(cat => cat.nom !== categorieNom));
      setCategoriesArchivees((prevArchivees) => [
        ...prevArchivees,
        { nom: categorieNom },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'archivage de la catégorie", error);
    }
  };

  const cards = [
    {
      title: "Total Categories",
      count: categories.length,
      description: "",
      bgColor: "bg-blue-500",
    },
    {
      title: "Categories archivés",
      count: categoriesArchivees.length,
      description: "",
      bgColor: "bg-green-500",
    },
  ];

  useEffect(() => {
    getCategories();
  }, []);  

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-blue-50">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-lg shadow-md text-white ${card.bgColor} flex flex-col items-center`}
          >
            <h3 className="text-lg font-semibold text-center">{card.title}</h3>
            <div className="text-4xl font-bold py-2 text-center">{card.count}</div>
            <p className="text-sm text-center">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-6">
        <div className="flex-1 min-w-[300px]">
          <CategorieListe
            categories={categories}
            archiverCategorie={archiverCategorie}
          />
        </div>
        <div className="flex-1 min-w-[300px]">
          <CategorieAjout ajouterCategorie={ajouterCategorie} />
        </div>
      </div>
    </>
  );
};

export default Categorie;
