import { useState } from "react";
import ServiceGrid from "./PageClient/Components/ServiceGrid";
import CardService from "./PageClient/Components/CardService";
import LayoutClients from "./PageClient/layout/LayoutClients";


function Client() {
  const [filters, setFilters] = useState({
    showFilters: false,
    category: "",
    locality: "",
    sortBy: "popular",
    currentPage: 1,
    searchQuery: "",
    showFavorites: false,
  });
   
  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <LayoutClients handleFilterChange={handleFilterChange}>
      {/* <div className="bg-white grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-4">
        <CardService service="Plombier" src="https://www.diallobtp.com/assets/images/slider/diallogistique-220120022343-blog-0.jpeg" />
        <CardService service="Electricien" src="https://www.equonet.net/photo/art/default/56226825-41898769.jpg?v=1620767585" />
        <CardService service="Développeur" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRCIy6GPNXHsOaDZHGzde14J-zg1GLywIng&s" />
        <CardService service="Maçon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7zcMRMq9uFz5fb6Y-qK484AENdFl1Wgmtw&s" />
        <CardService service="Jardinier" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIKzyHLvkPcUrXHPb8ogVQcgK91avU-m7sA&s" />
        <CardService service="Menuisier " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-8OhCaYs0maYjuWreRtMEntJFjzxSnCgeA&s" />
        <CardService service="Menuisier Metalique" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_PgxQqLnwgJOGjXwoizxhL0MprLRm757o-A&s" />
        <CardService service="carreleur" src="https://media.bazarafrique.com/upload/post/6231252ee3b33390643763.jpg" />
      </div> */}
        <ServiceGrid {...filters} setCurrentPage={(page) => handleFilterChange("currentPage", page)} />
    </LayoutClients>
   
  );
}

export default Client;