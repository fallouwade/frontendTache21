"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

const API_URL = "https://backendtache21.onrender.com"

// Définition de la correspondance entre les services et les icônes
const iconMap = {
  Jardinage: "🌱",
  Plomberie: "🚽",
  Electricité: "💡",
  Menuiserie: "🪑",
  Peinture: "🎨",
  Netoyage: "🧹",
  Déménageur: "📦",
  Mecanique: "🔧",
  Informatique: "💻",
  Enseignant: "📚",
  Coiffeur: "💇",
  "Développement Web": "🌐",
  Maçonnerie: "🧱",
  Design: "✏️",
  "Technicien climatisation": "❄️",
}

function CategoryGrid({ onCategoryClick, selectedCategory }) {
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories/liste`)
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        // Filtrer pour n'avoir que les services non archivés
        setServices(data.filter((service) => !service.archive))
      } catch (err) {
        setError("Failed to load services. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos Services</h2>
      <div
        className="flex overflow-x-auto space-x-4 py-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() => onCategoryClick(service.nom)}
            className={`flex flex-col items-center p-5 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 ${
              selectedCategory === service.nom ? "bg-primary-100" : ""
            }`}
          >
            <span className="text-3xl mb-3">{iconMap[service.nom] || "🔧"}</span>
            <span className="text-center text-lg text-gray-800 font-semibold">{service.nom}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryGrid

