import Table from "../tableReutilisable/Table";
import { MdOutlineUnarchive, MdOutlineArchive } from "react-icons/md";
import axios from "axios";  // You can also use fetch instead of axios

const CategorieListe = ({ categories, setCategories }) => {
  const columns = [
    {
      header: 'Nom de catégorie',
      accessorKey: 'nom',
    },
  ];

  const archiverCategorie = async (categorieId) => {
    try {
      const response = await axios.put(`https://backendtache21.onrender.com/api/categories/archiver/${categorieId}`);

      if (response.status === 200) {
        // Mettre à jour l'archive pour la catégorie
        setCategories((prevCategories) => 
          prevCategories.map((categorie) => 
            categorie._id === categorieId 
              ? { ...categorie, archive: !categorie.archive } 
              : categorie
          )
        );
      } else {
        console.error("Échec de l'archivage de la catégorie.");
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage de la catégorie:", error);
    }
  };

  const actionButton = (row) => row.archive ?  
    <button onClick={() => archiverCategorie(row._id)}>
      <MdOutlineUnarchive size={30} style={{ color: 'red' }} />
    </button> : (
    <button onClick={() => archiverCategorie(row._id)}>
      <MdOutlineArchive size={30} style={{ color: 'green' }} />
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <Table 
        columns={columns} 
        data={categories}  
        title="Liste des Categories"
        action={actionButton}
      />
    </div>
  );
};

export default CategorieListe;
