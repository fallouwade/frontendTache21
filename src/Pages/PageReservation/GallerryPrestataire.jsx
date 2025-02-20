import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const GalleryPrestataire = ({ prestataire }) => {
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleImageClick = () => setShowMobileCarousel(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowMobileCarousel(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const images =
    prestataire?.services?.flatMap((service) =>
      service.imagesService?.map((img) => ({
        src: img,
        alt: service.nomService,
      }))
    ) || [];

  return (
    <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
      {/* Back Button for Logged In Users */}
      {isLoggedIn && (
        <div className="absolute top-6 left-6 z-40">
          <Link
            to="/client"
            className="bg-black p-3 rounded-full shadow-lg hover:bg-gray-800 transition duration-300"
            aria-label="Retour"
          >
            <FaArrowLeft className="w-6 h-6 text-white" />
          </Link>
        </div>
      )}

      {/* Provider InfO Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 mt-5">
        <h1 className="text-4xl font-bold text-blue-700">{`Bonjour, je suis ${prestataire?.prenom} ${prestataire?.nom}`}</h1>
      </div>

      <p className="text-xl text-gray-700 mb-6">
        {prestataire?.description}
      </p>

      {/* Desktop Image Gallery */}
      {images.length > 0 && (
        <div className="hidden sm:block">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-4 gap-2 h-[380px]">
              {images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden ${index === 0
                    ? "col-span-2 row-span-2 h-[380px]"
                    : "col-span-1 row-span-1 h-[198px]"
                    }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Image Gallery */}
      {images.length > 0 && (
        <div className="block sm:hidden  mt-8">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-72  cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover  shadow-md transition duration-300"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Fullscreen Modal for Mobile */}
      {showMobileCarousel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center transition-opacity duration-300"
          onClick={() => setShowMobileCarousel(false)}
        >
          <button
            onClick={() => setShowMobileCarousel(false)}
            className="absolute top-6 right-6 text-white bg-black/50 p-3 rounded-full hover:scale-105 transition-transform"
          >
            <span className="text-3xl">×</span>
          </button>
          <div
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="h-full w-full relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}


      {/* Services Section */}
      <div className="mt-5">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">Mes Services</h2>

        <ul className="space-y-4 text-gray-800 text-lg">
          {prestataire?.services?.length > 0 ? (
            prestataire.services.map((service, index) => (
              <li key={index} className="flex items-center">
                <span className="text-2xl text-green-600">✔️</span>
                <span className="ml-2">
                 
                  {service.categorie} - {service.nomService}
                  </span>
              </li>
            ))
          ) : (
            <li className="text-lg">Aucun service ajouté pour le moment.</li>
          )}
        </ul>


        <div className="pt-5 px-10 pb-5">
          {prestataire?.services?.length > 0 ? (
            prestataire.services.map((service, index) => (
              <li key={index} className="flex items-center">
                 <strong>Description du service:</strong>
                <span className="ml-2">{service.description} </span>
              </li>
            ))
          ) : (
            <li className="text-lg">Aucune description ajouté pour le moment.</li>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default GalleryPrestataire;
