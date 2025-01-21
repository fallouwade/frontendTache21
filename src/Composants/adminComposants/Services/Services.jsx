import { FaInfoCircle } from "react-icons/fa"; // Icône "info"
import { Link } from "react-router-dom"; // Pour la navigation avec Link
import LayoutAdmine from "../Layout/LayoutAdmine";
import Table from "../TableRéutilisable/Table";

const services = [
  { id: 1, name: "Service 1", description: "Description du Service 1" },
  { id: 2, name: "Service 2", description: "Description du Service 2" },
  { id: 3, name: "Service 3", description: "Description du Service 3" },
];

export default function Services() {
  const columns = [
    {
      header: 'Nom de service',
      accessorKey: 'service',
    },
    {
      header: 'description',
      accessorKey: 'description',
    }
  ];

  const data = [
    {
      service : 'Plombier',
      description: 'Plombier', 
    },
    {
      service : 'Plombier',
      description: 'Plombier', 
    },
    {
      service : 'Plombier',
      description: 'Plombier', 
    },
  ]

  return (
    <LayoutAdmine>
      <h1 className="text-2xl font-semibold mb-4">Liste des Services</h1>
      
      {/* Tableau des services */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-100 border-b text-left">Nom du Service</th>
            <th className="px-4 py-2 bg-gray-100 border-b text-left">Description</th>
            <th className="px-4 py-2 bg-gray-100 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{service.name}</td>
              <td className="px-4 py-2 border-b">{service.description}</td>
              <td className="px-4 py-2 border-b">
                <Link
                  to={`/service/${service.id}`} // Lien vers la page de détails du service
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaInfoCircle className="mr-2" /> Détails
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-10 px-10">
          <Table columns={columns} data={data} title="Mon titre"/>
      </div>
    </LayoutAdmine>
  );
}
