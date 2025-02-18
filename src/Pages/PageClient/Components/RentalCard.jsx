"use client"

import { useState } from "react"
import Slider from "react-slick"
import { FaHeart, FaStar, FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const PrevArrow = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full shadow-md transition-all z-10 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <FaArrowLeft className="text-gray-700 w-3 h-3" />
  </button>
)

const NextArrow = ({ onClick, visible }) => (
  <button
    onClick={onClick}
    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full shadow-md transition-all z-10 ${
      visible ? "opacity-100" : "opacity-0"
    }`}
  >
    <FaArrowRight className="text-gray-700 w-3 h-3" />
  </button>
)

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
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const images = services[0]?.imageUrl || []

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    if (isLoggedIn && onToggleFavorite) {
      onToggleFavorite(id)
    } else {
      console.log("Veuillez vous connecter pour ajouter aux favoris")
    }
  }

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
    beforeChange: (_, next) => setActiveIndex(next),
    appendDots: (dots) => (
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
        <ul className="flex space-x-1 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          i === activeIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
        }`}
      ></div>
    ),
  }

  return (
    <div className="bg-white  md:w-[278px] w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 m-2">
      <div
        className="relative w-full md:h-[230px] h-[250px] overflow-hidden rounded-t-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Slider className="w-full h-full" {...settings}>
          {images.length > 0 &&
            images.map((url, index) => (
              <div key={index} className="w-full md:h-[230px] h-[250px]">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Image ${index + 1} du service de ${prenom}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            ))}
        </Slider>

        {isLoggedIn && (
          <button
            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full transition-all duration-300 shadow-md z-10"
            aria-label={isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"}
            onClick={handleFavoriteClick}
          >
            <FaHeart
              className={`h-4 w-4 transition-all duration-300 ${
                isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-base text-gray-900">
              {services.length > 0 ? services[0].categorie : "Service inconnu"}
            </h3>
            <p className="text-gray-500 text-xs flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400 w-3 h-3" /> {region} {`(${departement})`}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded-full text-xs font-medium shadow-sm">
            <FaStar className="text-yellow-500 w-3 h-3" />
            <span className="text-gray-800">{rating}</span>
          </div>
        </div>

        <p className="text-sm font-semibold text-gray-900">{prenom}</p>

        <div className="flex justify-end mt-2">
          <Link to={`/reservation/${id}`} onClick={() => identifiant(id)}>
            <button className="text-white bg-black text-sm rounded px-4 py-1.5  hover:scale-105  transition-all duration-200 shadow-md">
              Contactez
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RentalCard

