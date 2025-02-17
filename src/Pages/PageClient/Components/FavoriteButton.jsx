import { FaHeart } from "react-icons/fa";

function FavoriteButton({ favorites = [], onToggleFavorite, showFavorites }) {
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0;

  return (
    <div className="relative inline-block group">
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
      
      {/* Tooltip */}
      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        Favoris
      </div>
    </div>
  );
}

export default FavoriteButton;