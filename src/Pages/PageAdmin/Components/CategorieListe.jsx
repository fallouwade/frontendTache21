import Table from "../tableReutilisable/Table";  
import { MdOutlineUnarchive, MdOutlineArchive } from "react-icons/md";

const CategorieListe = ({ categories, archiverCategorie }) => {

  const columns = [
    {
      header: 'Nom de catégorie',
      accessorKey: 'nom',
    },
  ];

  const actionButton = (row) => row.archive ?  
    <button onClick={() => archiverCategorie(row.nom)}>
      <MdOutlineUnarchive size={30} style={{ color: 'red' }} />
    </button> : (
    <button onClick={() => archiverCategorie(row.nom)}>
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
