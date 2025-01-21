import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ServicesCard({ title, description, imgSrc, altText }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="max-w-xs bg-white rounded-lg shadow-lg shadow-gray-500 overflow-hidden transition-transform transform hover:scale-105 relative">
        <div className="absolute top-3 right-3 text-orange-500 hover:text-orange-600 transition-colors duration-300 z-10">
          <FaRegHeart size={24}/>

        </div>
        
        <div className="relative">
          <Link to='/connexion'>
          <img
            src={imgSrc}
            alt={altText}
            className="w-full h-40 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
          </Link>
        </div>

        <div className="p-3">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{title}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServicesCard;