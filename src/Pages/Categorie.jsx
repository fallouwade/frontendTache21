import { useState, useEffect } from "react";
import axios from "axios"; 
import CategorieListe from "./PageAdmin/Components/CategorieListe";
import CategorieAjout from "./PageAdmin/Components/CategorieAjout";
import { FaList, FaArchive, FaRegClipboard } from "react-icons/fa"; 

const Categorie = () => {
  const [categories, setCategories] = useState([]);  

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
          { nom: categorie, archive: false },
        ]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  };

  const archiverCategorie = async (categorieId) => {
    try {
      // Effectuer la requête pour archiver ou restaurer la catégorie via l'API
      const response = await axios.put(`https://backendtache21.onrender.com/api/categories/archiver/${categorieId}`);

      if (response.status === 200) {
        // Si la requête est réussie, mettre à jour localement l'état des catégories
        setCategories((prevCategories) =>
          prevCategories.map((cat) => {
            // Vérifier si la catégorie correspond à l'ID et inverser l'état de l'archive
            if (cat._id === categorieId) {  // Assurez-vous que chaque catégorie a un `_id` unique
              return { ...cat, archive: !cat.archive };
            }
            return cat;
          })
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage de la catégorie", error);
    }
  };

  const categoriesArchivées = categories.filter(cat => cat.archive).length;
  const categoriesNonArchivees = categories.filter(cat => !cat.archive).length;

  const cards = [
    {
      title: "Total Categories",
      count: categories.length,
      description: "",
      bgColor: "bg-blue-500",
      icon: <FaList className="text-4xl mb-2" />  // Icône pour Total Categories
    },
    {
      title: "Categories archivés",
      count: categoriesArchivées,
      description: "",
      bgColor: "bg-red-500",
      icon: <FaArchive className="text-4xl mb-2" />  // Icône pour Categories archivés
    },
    {
      title: "Categories non archivées",  
      count: categoriesNonArchivees,
      description: "",
      bgColor: "bg-green-500",
      icon: <FaRegClipboard className="text-4xl mb-2" />  // Icône pour Categories non archivées
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
            className={`w-[330px] p-6 rounded-lg shadow-md text-white ${card.bgColor} flex flex-col items-center`}
          >
            <div className="mb-4">{card.icon}</div>  {/* Icône ajoutée ici */}
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
            archiverCategorie={archiverCategorie}  // Passer la fonction archiverCategorie
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
