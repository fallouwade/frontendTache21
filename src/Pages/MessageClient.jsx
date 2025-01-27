import Table from "./PageAdmin/tableReutilisable/Table";
import LayoutClients from "./PageClient/layout/LayoutClients";
import ServiceGrid from "./PageClient/Components/ServiceGrid";
import { useState } from "react";

export default function MessageClient() {
      const [filters, setFilters] = useState({
        showFilters: false,
        category: "",
        locality: "",
        sortBy: "popular",
        currentPage: 1,
        searchQuery: "",
        showFavorites: false,
      });

    const columns = [
        {
          header: 'id',
          accessorKey: 'id',
        },
        {
          header: 'Services',
          accessorKey: 'service',
        },
        {
          header: 'Prestataire',
          accessorKey: 'namePrestataire',
        },
        {
          header: 'Date de réservation',
          accessorKey: 'Date',
        },
      ];
    
      const data = [
        {
          id: '1',
          service: 'Plomberie',
          namePrestataire: 'Saliou Sow',
          Date: '15/04/1990',
        },    
        {
          id: '2',
          service: 'Plomberie',
          namePrestataire: 'Saliou Sow',
          Date: '15/04/1990',
        },    
        {
          id: '3',
          service: 'Plomberie',
          namePrestataire: 'Saliou Sow',
          Date: '15/04/1990',
        },    
      ];

      const handleFilterChange = (key, value) =>
        setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <LayoutClients>
        <div className="bg-white grid gap-4 sm:p-4">
           <Table 
                columns={columns} 
                data={data} 
                title="Liste des réservations"
                action={  <th className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>}
            />
           <ServiceGrid {...filters} setCurrentPage={(page) => handleFilterChange("currentPage", page)} />
        </div>
    </LayoutClients>
  )
}
