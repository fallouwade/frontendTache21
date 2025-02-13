import { useState, useEffect } from "react"
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaSearch,
  FaFilter,
  FaTrash,
  FaCalendarAlt,
  FaUser,
  FaChevronDown,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa"

const InfoDemande = () => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedRequest, setExpandedRequest] = useState(null)
  const [userId, setUserId] = useState(null)
  const API_BASE_URL = "https://backendtache21.onrender.com/api"

  // Récupération de l'id 
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUserId(decodedToken.id) 
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [])

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return

      try {
        const token = localStorage.getItem('token')
        if (!token) {
          throw new Error('No token found')
        }

        const response = await fetch(`${API_BASE_URL}/demandes-services/clientAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
  
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }
  
        const data = await response.json()
        const userRequests = data.demandes.filter(demande => demande.demandeur.id === userId)
        setRequests(userRequests)
        setFilteredRequests(userRequests)
      } catch (err) {
        console.error("Erreur lors de la récupération des demandes:", err)
      }
    }

    fetchRequests()
  }, [userId])

  // Effet pour gérer le filtrage
  useEffect(() => {
    let filtered = [...requests]
    
    // Filtre par statut
    if (statusFilter !== "all") {
      filtered = filtered.filter(request => request.statut === statusFilter)
    }
    
    // Filtre par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.typeService.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.numeroTelephone.includes(searchTerm) ||
        (request.prestataire?.nom || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredRequests(filtered)
  }, [searchTerm, statusFilter, requests])

  const getStatusColor = (status) => {
    switch (status) {
      case "accepte":
        return "bg-green-100 text-green-800"
      case "refuse":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepte":
        return <FaCheck className="inline mr-1" />
      case "refuse":
        return <FaTimes className="inline mr-1" />
      default:
        return <FaClock className="inline mr-1" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "accepte":
        return "Acceptée"
      case "refuse":
        return "Refusée"
      case "en_attente":
        return "En attente"
      default:
        return "En cours"
    }
  }

  const handleDelete = async (requestId) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/demandes-services/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression: ${response.status}`)
      }

      const updatedRequests = requests.filter((req) => req._id !== requestId)
      setRequests(updatedRequests)
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const toggleDescription = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId)
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Mes demandes de service</h2>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Rechercher un service..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-600" />
            <select
              className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="accepte">Acceptées</option>
              <option value="refuse">Refusées</option>
              <option value="en_attente">En attente</option>
            </select>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        {filteredRequests.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Aucune demande de service ne correspond à votre recherche.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{request.typeService}</h3>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Date</h4>
                      <span className="text-gray-800 flex items-center">
                        <FaCalendarAlt className="mr-2 text-blue-500" />
                        {new Date(request.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Statut</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.statut)}`}>
                        {getStatusIcon(request.statut)}
                        {getStatusText(request.statut)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Prestataire</h4>
                    <span className="text-gray-800 flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      {request.prestataire?.nom || "Non assigné"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Contact</h4>
                    <span className="text-gray-800 flex items-center">
                      <FaPhone className="mr-2 text-blue-500" />
                      {request.numeroTelephone}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Adresse</h4>
                    <span className="text-gray-800 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      {request.adresse}
                    </span>
                  </div>

                  <div className="mt-4 relative">
                    <button
                      onClick={() => toggleDescription(request._id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-between ${
                        expandedRequest === request._id
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="font-medium">
                        {expandedRequest === request._id ? "Masquer les détails" : "Voir les détails"}
                      </span>
                      <span
                        className={`transform transition-transform duration-300 ${
                          expandedRequest === request._id ? "rotate-180" : ""
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    </button>

                    <div
                      className={`mt-2 overflow-hidden transition-all duration-300 ${
                        expandedRequest === request._id ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Description</h4>
                        <p className="text-gray-800">{request.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(request._id)}
                    className="text-red-500 hover:text-red-600 transition duration-300 flex items-center"
                    title="Supprimer"
                  >
                    <FaTrash className="mr-2" />
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoDemande