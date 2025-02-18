import RentalCard from "./RentalCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

function RentalSection({
  services,
  servicesPerPage,
  totalServices,
  paginate,
  currentPage,
  isLoading,
  error,
  noResults,
  id,
  favorites = [],
  onToggleFavorite,
  isLoggedIn = false,
  searchTerm,
  highlightSearch,
}) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i++) {
    pageNumbers.push(i)
  }
  
  if (isLoading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-gray-600">Chargement des services...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  if (noResults) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-gray-600">
            Aucun service ne correspond à votre recherche. Veuillez essayer avec d'autres critères.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-gray-50 rounded">
      <div className="max-w-screen-xl mx-auto md:px-6 px-3">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Services disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:mr-1 mr-3 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const isHighlighted =
              highlightSearch &&
              service.services.some((s) => s.categorie.toLowerCase().includes(searchTerm.service.toLowerCase()))

            return (
              <div key={service.id}>
                <RentalCard
                  {...service}
                  identifiant={id}
                  isFavorite={isLoggedIn && favorites.includes(service.services[0].id)}
                  onToggleFavorite={isLoggedIn ? () => onToggleFavorite(service.services[0].id) : undefined}
                  isLoggedIn={isLoggedIn}
                />
              </div>
            )
          })}
        </div>
        {totalServices > servicesPerPage && (
          <div className="flex justify-center items-center mt-8 text-sm text-gray-600">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="mx-4">
              Page {currentPage} sur {Math.ceil(totalServices / servicesPerPage)}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalServices / servicesPerPage)}
              className="p-2 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default RentalSection

