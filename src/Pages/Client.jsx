
import  { useState } from "react"
import { Button } from "flowbite-react"
import { FaFilter } from "react-icons/fa"
import Sidebar from "./PageClient/Components/SideBar"
import ServiceGrid from "./PageClient/Components/ServiceGrid"
import SearchBar from "./Composants/SearchBar"
import NavReutilisable from "./Composants/NavReutilisable"

function Client() {
  const [filters, setFilters] = useState({
    showFilters: false,
    category: "",
    locality: "",
    sortBy: "popular",
    currentPage: 1,
    searchQuery: "",
    showFavorites: false,
  })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFilters = () => handleFilterChange("showFilters", !filters.showFilters)

  return (
    <div>
      <div>
    <NavReutilisable/>
    </div>
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-4 md:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 md:mb-8">
            Trouvez un service près de chez vous
          </h1>
          <SearchBar onSearch={(query) => handleFilterChange("searchQuery", query)} />
        </div>

        <div className="flex relative">
          {filters.showFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleFilters} />
          )}

          <Sidebar
            {...filters}
            setSelectedCategory={(category) => handleFilterChange("category", category)}
            setSelectedLocality={(locality) => handleFilterChange("locality", locality)}
            onClose={toggleFilters}
            showFilters={filters.showFilters}
            setShowFavorites={(show) => handleFilterChange("showFavorites", show)}
          />

          <main className="flex-1 min-w-0 px-4 md:px-6">
            <div className="sticky top-0 z-30 bg-white py-2">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                <Button color="light" onClick={toggleFilters} className="md:hidden w-full sm:w-auto text-sm">
                  <FaFilter className="mr-2 h-4 w-4" />
                  {filters.showFilters ? "Masquer filtres" : "Afficher filtres"}
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Trier par:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 flex-1 sm:flex-none"
                  >
                    <option value="popular">Les plus pertinents</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="recent">Plus récent</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>
            </div>

            <ServiceGrid {...filters} setCurrentPage={(page) => handleFilterChange("currentPage", page)} />
          </main>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Client
