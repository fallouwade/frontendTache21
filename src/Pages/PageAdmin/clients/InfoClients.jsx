import LayoutAdmine from "../layout/LayoutAdmine";
import Table from "../TableRéutilisable/Table";
import CardsClient from "./CardsClients/CardsClient";
import ChartClient from "./graphique/ChartClient";


export default function InfoClients() {
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
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
    },

  ];

  return (
    <LayoutAdmine>
      <div className="sm:px-5 mb-10">
        <div className="grid md:grid-cols-2 gap-6 p-4">
          <div className="bg-white bg-opacity-10 rounded-lg relative -z-10">
            <CardsClient />
          </div>
          <ChartClient />
        </div> 
        <div className="grid grid-cols-1 p-5 md:p-0 mx-8">
          <Table columns={columns} data={data} title="Liste de clients" />
        </div>
      </div>
    </LayoutAdmine>
  )
}