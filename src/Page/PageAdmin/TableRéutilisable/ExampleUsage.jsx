import Table from "./Table";

export default function ExampleUsage (){
    const columns = [
      {
        header: 'Nom complet',
        accessorKey: 'fullName',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Téléphone',
        accessorKey: 'phone',
      },
      {
        header: 'Date de naissance',
        accessorKey: 'birthDate',
      },
      {
        header: 'Adresse',
        accessorKey: 'address',
      },
    ];
  
    const data = [
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890',
        birthDate: '15/04/1990',
        address: '123 Rue Example, Ville',
      },
      // Ajoutez plus de données ici
    ];
  
    return <Table columns={columns} data={data} />;
  };