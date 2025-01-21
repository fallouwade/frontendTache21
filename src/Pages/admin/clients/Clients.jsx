import LayoutAdmine from "../layout/LayoutAdmine";
import Table from "../TableRéutilisable/Table";
import CardsClient from "./CardsClients/CardsClient";
import ChartClient from "./graphique/ChartClient";


export default function Clients() {
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

  ];

  return (
    <LayoutAdmine>
      <div className="sm:px-10 mb-10">
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="bg-white rounded-lg">
            <CardsClient />
          </div>
          <ChartClient />
        </div>
        <div className="grid grid-cols-1">
          <Table columns={columns} data={data} title="Liste de clients" />
        </div>
      </div>
    </LayoutAdmine>
  )
}
