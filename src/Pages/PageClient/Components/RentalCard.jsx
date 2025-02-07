import React from "react";
import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom"

function RentalCard({
  imageUrl,
  prenom,
  region,
  departement,
  services,
  id,
  rating,
  identifiant
}) {
  console.log(id)
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div>    <div className="relative w-full h-60 overflow-hidden rounded-t-xl">
        <img
          src={imageUrl || `https://backendtache21.onrender.com/uploads/images/${imageUrl}`}
          alt={`Service de ${services.categorie} à ${region}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <button
          className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-all duration-300 shadow-md"
          aria-label="Ajouter aux favoris"
        >
          <FaHeart className="h-6 w-6 text-gray-400 hover:text-red-500 transition-all duration-300" />
        </button>
      </div>
      </div>
  

      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl text-gray-900">{services[0].categorie}</h3>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400 w-4 h-4" /> {region} {' '} {`(${departement})`}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-sm font-medium shadow-sm">
            <FaStar className="text-yellow-500 w-4 h-4" />
            <span className="text-gray-800">{rating}</span>
          </div>
        </div>

        <p className="text-lg font-semibold text-gray-900">{prenom}</p>

        <div className="flex justify-end mt-2">
         
          <Link to={`/reservation`} onClick={()=> identifiant(id)} >
          <button className="text-white bg-primary-600 rounded-lg px-6 py-2 hover:bg-primary-700 transition-all duration-200">
            Contacter
          </button>
                </Link>
        </div>
      </div>
    </div>
  );
}

export default RentalCard;