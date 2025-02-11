import { FaHeart } from "react-icons/fa"

function FavoriteButton({ favorites, onToggleFavorite, showFavorites }) {
  return (
    <button
      className={`p-2 rounded-full transition-all duration-300 shadow-md ${
        showFavorites ? "bg-red-500 text-white" : "bg-white text-red-500"
      }`}
      aria-label="Favoris"
      onClick={onToggleFavorite}
    >
      <FaHeart className="h-6 w-6" />
      {favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {favorites.length}
        </span>
      )}
    </button>
  )
}

export default FavoriteButton

