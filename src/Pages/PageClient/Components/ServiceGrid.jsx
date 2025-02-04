import { useState, useEffect } from "react"
import { FaStar, FaMapMarkerAlt, FaClock, FaCheck, FaHeart } from "react-icons/fa"
import { Card, Badge, Button } from "flowbite-react"
import { Link } from "react-router-dom"

function ServiceGrid({ currentPage, setCurrentPage, category, locality, sortBy, searchQuery, showFavorites, id }) {
  const [services, setServices] = useState([])
  const itemsPerPage = 9

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("http://localhost:5000/api/prestataires/complets")
      const data = await response.json()
      setServices(data)
    }

    fetchServices()
  }, [])

  let filteredServices = services.filter((service) => service.services.length > 0)

  if (showFavorites) {
    filteredServices = filteredServices.filter((service) => service.isFavorite)
  }

  if (searchQuery) {
    const searchTerms = searchQuery.toLowerCase().split(" ")
    filteredServices = filteredServices.filter((service) => {
      const searchableText =
        `${service.services[0].categorie} ${service.services[0].nomService} ${service.departement}`.toLowerCase()
      return searchTerms.every((term) => searchableText.includes(term))
    })
  }

  if (category) {
    filteredServices = filteredServices.filter((service) => service.services[0].categorie === category)
  }
  if (locality) {
    filteredServices = filteredServices.filter((service) => service.region === locality)
  }

  filteredServices.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "recent":
        return new Date(b.services[0].dateCreation) - new Date(a.services[0].dateCreation)
      case "price-asc":
        return a.services[0].prix - b.services[0].prix
      case "price-desc":
        return b.services[0].prix - a.services[0].prix
      case "pertinent":
      default:
        if (searchQuery) {
          const aRelevance = `${a.services[0].nomService} ${a.services[0].categorie}`.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0
          const bRelevance = `${b.services[0].nomService} ${b.services[0].categorie}`.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0
          if (aRelevance !== bRelevance) return bRelevance - aRelevance
        }
        return b.rating - a.rating
    }
  })

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const currentServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  if (filteredServices.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-6">
        <p>Aucun service trouvé pour les filtres actuels. Essayez de modifier vos critères de recherche.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentServices.map((service) => (
          <Card
            key={service.id}
            className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={service.services[0].imageUrl}
                alt={service.services[0].nomService}
                className="w-full h-36 sm:h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              {service.verifiedPro && (
                <Badge
                  color="success"
                  icon={FaCheck}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4"
                >
                  Vérifié
                </Badge>
              )}
              <Button
                color={service.isFavorite ? "failure" : "light"}
                className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 p-2 rounded-full"
                aria-label={service.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                  {service.services[0].nomService}
                </h3>
                <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500">
                  <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="font-semibold text-sm sm:text-base">{service.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-500">({service.reviews})</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4">{service.services[0].categorie}</p>
              <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-2 sm:mb-3 md:mb-4">
                <FaMapMarkerAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-500" />
                <span className="text-xs sm:text-sm">
                  {service.region} ({service.departement})
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-0.5 sm:gap-1">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                    {service.services[0].prix}€
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">/heure</span>
                </div>
                <Badge color="info" icon={FaClock} className="text-xs sm:text-sm">
                  {service.services[0].disponibilite}
                </Badge>
              </div>
              <div className="mb-0 flex justify-end mt-5">
              <Link to={`/reservation`} onClick={()=> id(service.id)} >
                  <Button>Réserver</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4">
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Affichage de <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> à{" "}
          <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredServices.length)}</span> sur{" "}
          <span className="font-semibold">{filteredServices.length}</span> résultats
        </p>

        <div className="flex items-center gap-1 mb-3">
          <Button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            color="light"
          >
            Précédent
          </Button>

          <div className="hidden sm:flex">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => (
              <Button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                color={currentPage === idx + 1 ? "blue" : "light"}
                className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
              >
                {idx + 1}
              </Button>
            ))}
          </div>

          <div className="flex sm:hidden">
            <span className="flex px-2 py-1 text-xs border-t border-b bg-gray-50">
              {currentPage} / {totalPages}
            </span>
          </div>

          <Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            color="light"
            className="px-0 sm:px-3 py-0 sm:py-2 text-xs sm:text-sm"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceGrid