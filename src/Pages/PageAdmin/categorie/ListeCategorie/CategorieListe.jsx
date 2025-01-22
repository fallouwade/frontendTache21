import Table from "../../TableRéutilisable/Table";

const CategorieListe = () => {
  const columns = [
    {
      header: 'Nom de categorie',
      accessorKey: 'categorie',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    }
  ];

  const data = [
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
    {
      categorie : 'Plombier',
      description: 'Plombier', 
    },
  ];

  return (
    <div className="ml-6">
      {/* Tableau des catégories */}
      <div className="overflow-x-auto">
        <Table columns={columns} data={data} title="Mes Categorie" />
      </div>
    </div>
  );
}

export default CategorieListe;
