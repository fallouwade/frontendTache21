import { useState, useEffect } from "react"
import { FaCheck, FaTimes, FaClock, FaSearch, FaFilter, FaStar, FaTrash, FaCalendarAlt, FaUser, FaChevronDown, FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"  // Ajoutez cette ligne pour utiliser useNavigate

const InfoDemande = () => {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedRequest, setExpandedRequest] = useState(null)
  const [isPrestataire, setIsPrestataire] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchRequests = async () => {
      const mockData = [
        {
          id: 1,
          service: "Plomberie",
          description: "Réparation d'un robinet qui fuit dans la salle de bain.",
          date: "2023-05-15",
          status: "accepted",
          provider: "Jean Dupont",
          rating: 4.5,
        },
        {
          id: 2,
          service: "Jardinage",
          description: "Tonte de pelouse et taille des haies.",
          date: "2023-05-20",
          status: "pending",
          provider: "Marie Martin",
          rating: null,
        },
        {
          id: 3,
          service: "Électricité",
          description: "Installation d'un nouveau luminaire au plafond.",
          date: "2023-05-25",
          status: "rejected",
          provider: "Pierre Durand",
          rating: null,
        },
      ]
      setRequests(mockData)
      setFilteredRequests(mockData)
    }

    fetchRequests()
  }, [])

  useEffect(() => {
    const results = requests.filter(
      (request) =>
        request.service.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "all" || request.status === statusFilter),
    )
    setFilteredRequests(results)
  }, [searchTerm, statusFilter, requests])

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <FaCheck className="inline mr-1" />
      case "rejected":
        return <FaTimes className="inline mr-1" />
      default:
        return <FaClock className="inline mr-1" />
    }
  }

  const handleRate = (requestId, rating) => {
    const updatedRequests = requests.map((req) => (req.id === requestId ? { ...req, rating } : req))
    setRequests(updatedRequests)
    setFilteredRequests(updatedRequests)
  }

  const handleDelete = (requestId) => {
    const updatedRequests = requests.filter((req) => req.id !== requestId)
    setRequests(updatedRequests)
    setFilteredRequests(updatedRequests)
  }

  const toggleDescription = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId)
  }

  return (
    <div>
      <div className="w-full bg-white text-gray flex items-center justify-between py-10 px-2">
        <button
          onClick={() => navigate("/client")}  
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-200 hover:border-gray-500 hover:text-gray transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="container mx-auto px-4 bg-gray-50 min-h-screen">
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
              <option value="accepted">Acceptées</option>
              <option value="rejected">Refusées</option>
              <option value="pending">En attente</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Aucune demande de service ne correspond à votre recherche.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{request.service}</h3>

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
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        {request.status === "accepted"
                          ? "Acceptée"
                          : request.status === "rejected"
                          ? "Refusée"
                          : "En attente"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Prestataire</h4>
                    <span className="text-gray-800 flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      {request.provider}
                    </span>
                  </div>

                  {request.rating ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-1">Note</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={index < Math.round(request.rating) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                        <span className="ml-2">{request.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  ) : (
                    request.status === "accepted" && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Noter le service</h4>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRate(request.id, star)}
                              className="text-yellow-400 text-xl mr-1 focus:outline-none"
                            >
                              {star <= (request.rating || 0) ? "★" : "☆"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  <div className="mt-4 relative">
                    <button
                      onClick={() => toggleDescription(request.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-between ${
                        expandedRequest === request.id
                          ? "bg-blue-50 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="font-medium">
                        {expandedRequest === request.id ? "Masquer les détails" : "Voir les détails"}
                      </span>
                      <span
                        className={`transform transition-transform duration-300 ${
                          expandedRequest === request.id ? "rotate-180" : ""
                        }`}
                      >
                        <FaChevronDown />
                      </span>
                    </button>

                    <div
                      className={`mt-2 overflow-hidden transition-all duration-300 ${
                        expandedRequest === request.id ? "max-h-96" : "max-h-0"
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
                    onClick={() => handleDelete(request.id)}
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
