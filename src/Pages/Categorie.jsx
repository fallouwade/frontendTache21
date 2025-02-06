import { useState, useEffect } from "react";
import axios from "axios";
import CategorieListe from "./PageAdmin/Components/CategorieListe";
import CategorieAjout from "./PageAdmin/Components/CategorieAjout";
import { FaArchive, FaLayerGroup, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; 
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const Categorie = () => {
  const [categories, setCategories] = useState([]); 

  // Récupérer les catégories de l'API
  const getCategories = async () => {
    try {
      const response = await axios.get("https://backendtache21.onrender.com/api/categories/liste");

      // Filtrer les catégories ayant un nom valide
      const categoriesWithNom = response.data.filter((categorie) => {
        const nom = categorie.nom ? categorie.nom.trim() : "";
        return nom.length > 0;
      });

      setCategories(categoriesWithNom); 
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      toast.error("Erreur lors de la récupération des catégories!"); 
    }
  };

  // Ajouter une nouvelle catégorie
  const ajouterCategorie = async (categorie) => {
    try {
      const response = await axios.post("https://backendtache21.onrender.com/api/categories/ajouter", {
        nom: categorie,
      });

      if (response.status === 201) {
        setCategories((prevCategories) => [
          ...prevCategories,
          { nom: categorie, _id: response.data._id, archive: false },
        ]);
        toast.success("Catégorie ajoutée avec succès!");  
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
      toast.error("Erreur lors de l'ajout de la catégorie!");  
    }
  };

  // Archiver une catégorie
  const archiverCategorie = async (categorieId) => {
    try {
      const response = await axios.put(`https://backendtache21.onrender.com/api/categories/archiver/${categorieId}`);

      if (response.status === 200) {
        // Mettre à jour les catégories après archivage
        setCategories((prevCategories) => prevCategories.map((categorie) => 
          categorie._id === categorieId ? { ...categorie, archive: true } : categorie
        ));
        toast.info("Catégorie archivée avec succès!");  
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage de la catégorie", error);
      toast.error("Erreur lors de l'archivage de la catégorie!");  
    }
  };

  // Compter le nombre de catégories archivées
  const countArchivedCategories = categories.filter((categorie) => categorie.archive).length;

  // Compter le nombre de catégories non archivées
  const countNonArchivedCategories = categories.filter((categorie) => !categorie.archive).length;

  // Compter le nombre total de catégories
  const countTotalCategories = categories.length;

  const cards = [
    {
      title: "Total Categories",
      count: countTotalCategories, // Total de toutes les catégories
      bgColor: "bg-blue-500",
      icon: <FaLayerGroup size={30} />
    },
    {
      title: "Categories archivées",
      count: countArchivedCategories, // Nombre de catégories archivées
      bgColor: "bg-red-500",
      icon: <FaArchive size={30} />
    },
    {
      title: "Categories non archivées",
      count: countNonArchivedCategories, // Nombre de catégories non archivées
      bgColor: "bg-green-500",
      icon: <FaCheckCircle size={30} />
    },
  ];

  useEffect(() => {
    getCategories(); // Charger les catégories au montage du composant
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-2 bg-blue-50">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/3 xl:w-[340px] p-6 rounded-lg shadow-md text-white ${card.bgColor} flex flex-col items-center`}
          >
            {/* Icône ajoutée à la carte */}
            <div className="text-4xl mb-2">{card.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-center">{card.title}</h3>
              <div className="text-4xl font-bold py-2 text-center">{card.count}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-6">
        <div className="flex-1 min-w-[300px]">
          {/* Affichage des catégories actives et archivées */}
          <CategorieListe
            categories={categories}
            archiverCategorie={archiverCategorie}
            archiverIcon={<FaArchive size={30} style={{ color: 'orange' }} />}
            archivedIcon={<FaTimesCircle size={40} style={{ color: 'red' }} />} 
          />
        </div>
        <div className="flex-1 min-w-[350px]">
          <CategorieAjout ajouterCategorie={ajouterCategorie} />
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginTop: "60px", 
          zIndex: 9999, 
        }}
      />
    </>
  );
};

export default Categorie;
