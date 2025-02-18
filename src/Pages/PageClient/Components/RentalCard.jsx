import { useState } from "react";
import Slider from "react-slick";
import { FaHeart, FaStar, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <FaArrowLeft className="text-gray-700 w-5 h-5" />
  </button>
);

const NextArrow = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <FaArrowRight className="text-gray-700 w-5 h-5" />
  </button>
);

function RentalCard({
  services = [],
  prenom,
  region,
  departement,
  id,
  rating,
  identifiant,
  isFavorite,
  onToggleFavorite,
  isLoggedIn,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Indice de l'image affichée
  const images = services[0]?.imageUrl || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow visible={isHovered} />,
    nextArrow: <NextArrow visible={isHovered} />,
    beforeChange: (_, next) => setActiveIndex(next), // Mise à jour de l'index actif
    appendDots: (dots) => (
      <div className="absolute left-1/2 transform -translate-x-1/2 z-40">
        <ul className="flex space-x-2 justify-center px-3 rounded-full">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === activeIndex ? "bg-black opacity-100" : "bg-black opacity-50 hover:opacity-100"
        }`}
      ></div>
    ),
  };

  return (
    <div className="bg-white w-[310px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div
        className="relative w-full h-[260px] overflow-hidden rounded-t-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Slider className="w-full" {...settings}>
          {images.length > 0 &&
            images.map((url, index) => (
              <div key={index} className="w-full h-[230px]">
                <img
                  src={url}
                  alt={`Image ${index + 1} du service de ${prenom}`}
                  className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            ))}
        </Slider>

        {/* Cœur pour favoris */}
        {isLoggedIn && (
          <button
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-300 shadow-md"
            aria-label={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
            onClick={(e) => {
              e.preventDefault();
              if (onToggleFavorite) onToggleFavorite(id);
            }}
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
            <h3 className="font-bold text-lg text-gray-900">
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

        <p className="text-md font-semibold text-gray-900">{prenom}</p>

        <div className="flex justify-end mt-3">
          <Link to={`/reservation/${id}`} onClick={() => identifiant(id)}>
            <button className="text-white bg-black rounded-lg px-6 py-2 hover:bg-[#e65c00] transition-all duration-200 shadow-md">
              Contacter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RentalCard;
