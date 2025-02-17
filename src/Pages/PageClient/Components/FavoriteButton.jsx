import { FaHeart } from "react-icons/fa"
import { useState } from "react"

function FavoriteButton({ favorites = [], onToggleFavorite, showFavorites }) {
  const [isHovered, setIsHovered] = useState(false)
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0

  return (
    <div className="relative inline-block">
      <button
        className={`p-2 rounded-full transition-all duration-300 shadow-md ${
          showFavorites ? "bg-red-500 text-white" : "bg-white text-red-500"
        }`}
        aria-label="Favoris"
        onClick={onToggleFavorite}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <FaHeart className="h-6 w-6" />
      </button>

      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
          Favoris
        </div>
      )}

      {favoritesCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs md:w-5 md:h-5 w-5 h-5 flex items-center justify-center rounded-full font-medium">
          {favoritesCount}
        </div>
      )}
    </div>
  )
}

export default FavoriteButton
