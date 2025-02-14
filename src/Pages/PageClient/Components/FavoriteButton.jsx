import { FaHeart } from "react-icons/fa"

function FavoriteButton({ favorites = [], onToggleFavorite, showFavorites }) {
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0

  return (
    <div className="relative inline-block">
      <button
        className={`p-2 rounded-full transition-all duration-300 shadow-md ${
          showFavorites ? "bg-red-500 text-white" : "bg-white text-red-500"
        }`}
        aria-label="Favoris"
        onClick={onToggleFavorite}
      >
        <FaHeart className="h-6 w-6" />
      </button>
      {favoritesCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs md:w-5 md:h-5 w-5 h-2 flex items-center justify-center rounded-full font-medium">
          {favoritesCount}
        </div>
      )}
    </div>
  )
}

export default FavoriteButton

