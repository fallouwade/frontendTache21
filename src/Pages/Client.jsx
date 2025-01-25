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
      <div className="bg-white grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-4">
        <CardService service="Plombier" src="https://www.diallobtp.com/assets/images/slider/diallogistique-220120022343-blog-0.jpeg" />
        <CardService service="Electricien" src="https://www.equonet.net/photo/art/default/56226825-41898769.jpg?v=1620767585" />
        <CardService service="Développeur" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRCIy6GPNXHsOaDZHGzde14J-zg1GLywIng&s" />
        <CardService service="Maçon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7zcMRMq9uFz5fb6Y-qK484AENdFl1Wgmtw&s" />
        <CardService service="Jardinier" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIKzyHLvkPcUrXHPb8ogVQcgK91avU-m7sA&s" />
        <CardService service="Menuisier " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-8OhCaYs0maYjuWreRtMEntJFjzxSnCgeA&s" />
        <CardService service="Menuisier Metalique" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_PgxQqLnwgJOGjXwoizxhL0MprLRm757o-A&s" />
        <CardService service="carreleur" src="https://media.bazarafrique.com/upload/post/6231252ee3b33390643763.jpg" />
      </div>
      <ServiceGrid {...filters} setCurrentPage={(page) => handleFilterChange("currentPage", page)} />
    </LayoutClients>
    // <>
    //   <NavReutilisable 
    //       buttonPrest= {<Link to="/inscriptionPrestataire" className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">
    //       Devenir Prestataire
    //     </Link>} 
    //   />
    //   <div className="flex flex-col min-h-screen pt-16 relative bg-gray-300 z-5">
    //     <div className="flex-grow">
    //       <div className="container mx-auto px-4 py-4 md:py-8">
    //         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 md:mb-8">
    //           Trouvez un service près de chez vous
    //         </h1>
    //         <SearchBar onSearch={(query) => handleFilterChange("searchQuery", query)} />
    //       </div>

    //       <div className="flex flex-col-reverse md:justify-between md:flex-row items-center gap-4 px-2">
    //         {/* Boutton de filtre */}
    //         <Button color="light" onClick={toggleFilters} className="md:hidden w-full sm:w-auto text-sm">
    //           <FaFilter className="mr-2 h-4 w-4" />
    //           {filters.showFilters ? "Masquer filtres" : "Afficher filtres"}
    //         </Button>

    //         {/* filtre par classement */}
    //         <form className="flex justify-between items-center">
    //           <label
    //             className=" font-bold text-gray-900 me-6"
    //             htmlFor="countries">
    //             Trie par :
    //           </label>
    //           <select
    //             className="bg-gray-50 text-gray-900 text-ms rounded block py-2"
    //             id="countries">
    //             <option selected>Plus pertinents</option>
    //             <option value="US">Plus récent</option>
    //           </select>
    //         </form>
    //         <div>
    //           <div className="flex ms-10">
    //             <CardMessage title="Message" >
    //               <span>3</span>
    //             </CardMessage>
    //             <CardMessage title="Favoris" >
    //               <span>3</span>
    //             </CardMessage>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex relative mt-10">
    //         {filters.showFilters && (
    //           <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleFilters} />
    //         )}

    //         <Sidebar
    //           {...filters}
    //           setSelectedCtegory={(category) => handleFilterChange("category", category)}
    //           setSelectedLocality={(locality) => handleFilterChange("locality", locality)}
    //           onClose={toggleFilters}
    //           showFilters={filters.showFilters}
    //           setShowFavorites={(show) => handleFilterChange("showFavorites", show)}
    //         />

    //         <main className="flex-1 min-w-0 sm:px-4 md:px-6">
    //           <div className="bg-white grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:p-4">
    //             <CardService service="Plombier" src="https://www.diallobtp.com/assets/images/slider/diallogistique-220120022343-blog-0.jpeg" />
    //             <CardService service="Electricien" src="https://www.equonet.net/photo/art/default/56226825-41898769.jpg?v=1620767585" />
    //             <CardService service="Développeur" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRCIy6GPNXHsOaDZHGzde14J-zg1GLywIng&s"/>
    //             <CardService service="Maçon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7zcMRMq9uFz5fb6Y-qK484AENdFl1Wgmtw&s"/>
    //             <CardService service="Jardinier" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtIKzyHLvkPcUrXHPb8ogVQcgK91avU-m7sA&s"/>
    //             <CardService service="Menuisier " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-8OhCaYs0maYjuWreRtMEntJFjzxSnCgeA&s"/>
    //             <CardService service="Menuisier Metalique" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_PgxQqLnwgJOGjXwoizxhL0MprLRm757o-A&s"/>
    //             <CardService service="carreleur" src="https://media.bazarafrique.com/upload/post/6231252ee3b33390643763.jpg"/>
    //           </div>
    //           <ServiceGrid {...filters} setCurrentPage={(page) => handleFilterChange("currentPage", page)} />
    //         </main>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default Client;