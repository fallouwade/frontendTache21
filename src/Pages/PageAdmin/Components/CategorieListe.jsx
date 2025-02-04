import Table from "../tableReutilisable/Table";
import { FaArchive } from "react-icons/fa";

const CategorieListe = ({ categories}) => {
  const columns = [
    {
      header: 'Nom de catégorie',
      accessorKey: 'nom',
    },
    
  ];
  const archiverCategorie = (categories) => {
    console.log(`Archiver la catégorie: ${categories}`);
  };

  return (
    <div className="overflow-x-auto">
      <Table 
        columns={columns} 
        data={categories} 
        title="Liste des Categories"
        action={<button onClick={() => archiverCategorie(categories)}><FaArchive size={20} style={{ color: 'orange' }} /></button>} 
      />
    </div>
  );
};

export default CategorieListe;
