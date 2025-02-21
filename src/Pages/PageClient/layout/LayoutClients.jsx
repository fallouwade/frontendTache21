import { useState, useEffect, useCallback } from "react"
import { Outlet, useLocation } from "react-router-dom"
import ProfilClients from "../Components/ProfilClients"
import ServiceGrid from "../Components/ServiceGrid"
import CategoryGrid from "../Components/CardMessage"
import RentalSection from "../Components/RentalSection"
import { Link } from "react-router-dom"
import Footer from "../../Composants/Footer"
import InfoDemande from "../Components/InfoDemande"
import ProfilCli from "../Components/ProfilCli"
import axios from "axios"

const API_URL = "https://backendtache21.onrender.com/api" // Assurez-vous que c'est la bonne URL

function LayoutClients(props) {
  const location = useLocation()
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [servicesPerPage] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState({ service: "", location: "" })
  const [isPrestataire, setIsPrestataire] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [favoris] = useState([])

  useEffect(() => {
    fetchServices()
    checkLoginStatus()
  }, [])

  useEffect(() => {
    filterServices()
  }, [services, selectedCategory, searchTerm, showOnlyFavorites]) // Removed 'favorite' from dependencies

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token")

    setIsLoggedIn(!!token)
    if (token) {
      fetchFavorites()
    }
  }

  const fetchFavorites = useCallback(async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFavorites(response.data.map((fav) => fav.serviceId._id) || [])
    } catch (error) {
      console.error("Erreur lors de la récupération des favoris:", error)
      setFavorites([])
    }
  }, [])

  console.log(favorites)

  const fetchServices = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await axios.get(`${API_URL}/prestataires/complets`, { headers })
      const validServices = response.data.filter((service) => service.services && service.services.length > 0)
      setServices(validServices)
    } catch (error) {
      console.error("Error fetching services:", error)
      setError("Impossible de charger les services. Veuillez réessayer plus tard.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = useCallback(
    async (serviceId) => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.error("Utilisateur non connecté")
          return
        }

        const headers = { Authorization: `Bearer ${token}` }
        const isFavorite = favorites.includes(serviceId)

        if (isFavorite) {
          await axios.post(`${API_URL}/favorites/supprimer/${serviceId}`, {}, { headers })
          setFavorites(favorites.filter((id) => id !== serviceId))
        } else {
          await axios.post(`${API_URL}/favorites/ajouter/${serviceId}`, {}, { headers })
          setFavorites([...favorites, serviceId])
        }

        setServices(
          services.map((service) => ({
            ...service,
            services: service.services.map((s) => (s.id === serviceId ? { ...s, isFavorite: !isFavorite } : s)),
          })),
        )
      } catch (error) {
        console.error("Erreur lors de la modification des favoris:", error.response?.data || error.message)
      }
    },
    [favorites, services],
  )

  const filterServices = () => {
    let filtered = [...services]

    if (showOnlyFavorites) {
      filtered = filtered.filter((service) => service.services.some((s) => favorites.includes(s.id)))
      console.log(filtered)
    }

    if (selectedCategory) {
      filtered = filtered.filter((service) =>
        service.services.some((s) => s.categorie.toLowerCase() === selectedCategory.toLowerCase()),
      )
    }

    if (searchTerm.service || searchTerm.location) {
      const matchingServices = filtered.filter((service) =>
        service.services.some((s) => s.categorie.toLowerCase() === searchTerm.service.toLowerCase()),
      )

      const otherService = filtered.filter(
        (service) => !service.services.some((s) => s.categorie.toLowerCase() === searchTerm.service.toLowerCase()),
      )
      filtered = filtered.filter(
        (service) =>
          service.services.some((s) => s.categorie.toLowerCase().includes(searchTerm.service.toLowerCase())) &&
          (service.region.toLowerCase().includes(searchTerm.location.toLowerCase()) ||
            service.departement.toLowerCase().includes(searchTerm.location.toLowerCase())),
      )

      filtered = [...matchingServices, ...otherService]
    }

    setFilteredServices(filtered)
    setCurrentPage(1)
  }

  const handleSearch = (service, location) => {
    setSearchTerm({ service, location })
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  const handleToggleFavoriteFilter = (showFavorites) => {
    setShowOnlyFavorites(showFavorites)
  }

  const indexOfLastService = currentPage * servicesPerPage
  const indexOfFirstService = indexOfLastService - servicesPerPage
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setIsPrestataire(user.role === "prestataire")
    } catch (err) {
      console.error(err)
    }
  }, [])

  if (location.pathname === "/Client/messages") {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProfilClients isLoggedIn={true} userName={user.nom} userEmail={user.email} />
        <InfoDemande />
        <Footer />
      </div>
    )
  }

  if (location.pathname === "/Client/profilClient") {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProfilClients isLoggedIn={true} userName={user.nom} userEmail={user.email} />
        <ProfilCli />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfilClients
        isLoggedIn={isLoggedIn}
        userName={user?.nom}
        userEmail={user?.email}
        buttonPrest= {
          isPrestataire ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center whitespace-nowrap bg-gray-100 text-[15px] sm:text-sm md:text-base hover:bg-blue-600 md:hover:bg-gray-300 text-gray-700 font-normal py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 ml-6 sm:ml-8 md:ml-6 mr-2 rounded transition-all"
            >
              Mon compte
            </Link>
          ) : (
            <Link
              to="/inscriptionPrestataire"
              className="inline-flex items-center whitespace-nowrap bg-gray-200 text-[15px] sm:text-sm md:text-base hover:bg-blue-600 md:hover:bg-gray-300 text-gray-700 font-normal py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 ml-6 sm:ml-8 md:ml-6 rounded transition-all"
            >
              Devenir Prestataire
            </Link>
          )
        }
        favorites={favorites}
        favoris={favoris}
        onToggleFavorite={toggleFavorite}
        onToggleFavoriteFilter={handleToggleFavoriteFilter}
        unreadMessages={0}
      />
      <main>
        {!showOnlyFavorites && (
          <>
            <div className="text-center space-y-4">
              <h1 className="text-3xl pt-5 md:pt-16 px-3 pb-2 font-bold tracking-tight sm:text-4xl md:text-18xl">
                Trouvez le bon professionnel près de chez vous
              </h1>
              <p className="text-lg px-3 text-gray-600">
                Plombiers, électriciens, coiffeurs et plus encore - tous les services dont vous avez besoin
              </p>
            </div>
            <div className="container mx-auto px-4 pb-10">
              <div className="max-w-4xl mx-auto space-y-6">
                <ServiceGrid onSearch={handleSearch} />
                <CategoryGrid onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
              </div>
            </div>
          </>
        )}
        <div className="md:px-3  px-0">
          <RentalSection
            services={currentServices}
            servicesPerPage={servicesPerPage}
            totalServices={filteredServices.length}
            paginate={paginate}
            currentPage={currentPage}
            isLoading={isLoading}
            error={error}
            noResults={filteredServices.length === 0 && !isLoading && !error}
            id={props.id}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}

export default LayoutClients

