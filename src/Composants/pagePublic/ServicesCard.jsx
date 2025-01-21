import { FaRegHeart } from "react-icons/fa";

function ServiceCard({ title, description, imgSrc, altText }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="max-w-xs bg-white rounded-lg shadow-lg shadow-gray-500 overflow-hidden transition-transform transform hover:scale-105 relative">
        <div className="absolute top-3 right-3 text-orange-500 hover:text-orange-600 transition-colors duration-300 z-10">
          <FaRegHeart size={24}/>

        </div>

        <div className="relative">
          <img
            src={imgSrc}
            alt={altText}
            className="w-full h-40 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
          />
        </div>

        <div className="p-3">
          <h5 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{title}</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;

// import { FcLike } from "react-icons/fc";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Utiliser le hook navigate pour la navigation

// function ServiceCard({ title, description, imgSrc, altText }) {
//   const [liked, setLiked] = useState(false); // Pour gérer l'état de l'icône (clic)
//   const navigate = useNavigate(); // Hook pour la navigation

//   const handleClick = () => {
//     setLiked(!liked); // Inverser l'état du clic
//     navigate("/"); // Rediriger vers la page d'accueil ou la page de connexion
//   };

//   return (
//     <div className="flex justify-center mb-6">
//       <div className="max-w-xs bg-white rounded-lg shadow-lg shadow-gray-500 overflow-hidden transition-transform transform hover:scale-105 relative">
//         {/* Icône Like en haut à droite */}
//         <div
//           className={`absolute top-3 right-3 transition-colors duration-300 z-10 ${
//             liked ? "text-blue-500" : "text-gray-500"
//           }`}
//           onClick={handleClick}
//         >
//           <FcLike size={24} />
//         </div>

//         {/* Image du service */}
//         <div className="relative">
//           <img
//             src={imgSrc}
//             alt={altText}
//             className="w-full h-40 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
//           />
//         </div>

//         {/* Description du service */}
//         <div className="p-3">
//           <h5 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">{title}</h5>
//           <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ServiceCard;
