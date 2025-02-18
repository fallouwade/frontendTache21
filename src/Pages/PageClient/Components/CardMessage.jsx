"use client"

import { useEffect, useState, useRef } from "react"
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react"

const API_URL = "https://backendtache21.onrender.com"

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
  const [arrow, setArrow] = useState("right")
  const [isHovering, setIsHovering] = useState(false)

  const containerRef = useRef(null)
  const autoScrollIntervalRef = useRef(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories/liste`)
        if (!response.ok) {
          throw new Error("Failed to fetch services")
        }
        const data = await response.json()
        setServices(data.filter((service) => !service.archive))
      } catch (err) {
        setError("Failed to load services. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchServices()
  }, [])

  useEffect(() => {
    const startAutoScroll = () => {
      if (isHovering) return

      autoScrollIntervalRef.current = setInterval(() => {
        if (containerRef.current) {
          const { scrollLeft, clientWidth, scrollWidth } = containerRef.current
          if (scrollLeft + clientWidth >= scrollWidth - 1) {
            // If we're at the end, smoothly scroll back to the start
            containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
          } else {
            // Otherwise, continue scrolling
            containerRef.current.scrollBy({ left: 100, behavior: "smooth" })
          }
        }
      }, 1200) // Scroll every 1.2 seconds
    }

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }

    if (!isHovering) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return () => stopAutoScroll()
  }, [isHovering])

  const handleScroll = (e) => {
    const { scrollLeft, clientWidth, scrollWidth } = e.target
    if (scrollLeft === 0 && scrollWidth > clientWidth) {
      setArrow("right")
    } else if (scrollLeft + clientWidth >= scrollWidth - 1) {
      setArrow("left")
    } else {
      setArrow(null)
    }
  }

  const scrollRight = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = containerRef.current
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        containerRef.current.scrollBy({ left: 100, behavior: "smooth" })
      }
    }
  }

  const scrollLeft = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth } = containerRef.current
      if (scrollLeft === 0) {
        containerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" })
      } else {
        containerRef.current.scrollBy({ left: -100, behavior: "smooth" })
      }
    }
  }

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
        ref={containerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex overflow-x-auto space-x-2 py-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {services.map((service) => (
          <button
            key={service._id}
            onClick={() => onCategoryClick(service.nom)}
            className={`flex flex-col items-center p-5 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg flex-shrink-0 ${
              selectedCategory === service.nom ? "bg-primary-100" : ""
            }`}
          >
            <span className="text-3xl mb-3">{iconMap[service.nom] || "🔧"}</span>
            <span className="text-center text-lg text-gray-800 font-semibold">{service.nom}</span>
          </button>
        ))}
      </div>

      {arrow === "right" && (
        <div className="absolute top-1/2 right-1 md:right-[-45px] transform -translate-y-1/2">
          <button
            onClick={scrollRight}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      )}
      {arrow === "left" && (
        <div className="absolute top-1/2 left-1 md:left-[-45px] transform -translate-y-1/2">
          <button
            onClick={scrollLeft}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryGrid

