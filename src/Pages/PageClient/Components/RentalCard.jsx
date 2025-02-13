"use client";

import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function RentalCard({
  imageUrl,
  prenom,
  region,
  departement,
  services = [],
  id,
  rating,
  identifiant,
  isFavorite,
  onToggleFavorite,
  isLoggedIn,
}) {
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Empêche la navigation lors du clic sur le bouton favori
    if (isLoggedIn && onToggleFavorite) {
      onToggleFavorite(id);
    } else {
      console.log("Veuillez vous connecter pour ajouter aux favoris");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
        {services.length > 0 && (
          <img
            src={services[0].imageUrl}
            alt={`Service de ${prenom} à ${region}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        )}
        {isLoggedIn && (
          <button
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-300 shadow-md"
            aria-label={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavoriteClick}
          >
            <FaHeart
              className={`h-6 w-6 transition-all duration-300 ${
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-gray-900">
              {services.length > 0 ? services[0].categorie : "Service inconnu"}
            </h3>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400 w-4 h-4" /> {region} {`(${departement})`}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
            <FaStar className="text-yellow-500 w-4 h-4" />
            <span className="text-gray-800">{rating}</span>
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-900">{prenom}</p>

        <div className="flex justify-end mt-2">
          <Link to={`/reservation/${id}`} onClick={() => identifiant(id)}>
            <button className="text-white bg-[#000000] rounded-lg px-6 py-2 hover:bg-black-700 transition-all duration-200">
              Contacter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RentalCard;
