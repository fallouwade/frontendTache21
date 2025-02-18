
import { useState } from "react";
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

  const handleImageClick = () => {
    setShowMobileCarousel(true);
  };

  // Récupérer toutes les images de chaque service
  const images = prestataire?.services?.flatMap(service =>
    service.imagesService?.map(img => ({
      src: `https://backendtache21.onrender.com/uploads/images/${img}`,
      alt: service.nomService,
    }))
  ) || [];
  console.log(images);


  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Affichage du bouton retour seulement si l'utilisateur est connecté */}
      {isLoggedIn && (
        <div className="absolute -top-16 z-40">
          <Link
            to="/client"
            className="bg-black p-2 rounded-full shadow-lg flex items-center justify-center transition duration-300"
            aria-label="Retour"
          >
            <FaArrowLeft className="w-5 h-5 text-white" />
          </Link>
        </div>
      )}

      {/* Informations sur le prestataire */}
      <div className="flex justify-between items-center mb-6 mt-10">
        <h1 className="text-3xl font-bold text-blue-700">Bonjour, je suis {prestataire.prenom} {prestataire.nom}</h1>
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Je m'appelle {prestataire.prenom} {prestataire.nom}, et je suis spécialisé dans tous vos travaux de{" "}
        {prestataire.services.length > 0 ? prestataire.services[0].categorie : "divers services"}.
      </p>

      {/* Section Images Desktop */}
      {images.length > 0 && (
        <div className="hidden sm:block">
          <div className="relative rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px]">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`relative ${index === 0
                      ? "col-span-2 row-span-2 h-full"
                      : "col-span-1 row-span-1 h-[240px]" 
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


      {/* Galerie Mobile */}
      {images.length > 0 && (
        <div className="block sm:hidden mt-8">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="w-full h-72 cursor-pointer" onClick={handleImageClick}>
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Modal plein écran pour mobile */}
      {showMobileCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <button onClick={() => setShowMobileCarousel(false)} className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full">
            <span className="text-2xl">×</span>
          </button>
          <div className="w-full max-w-md">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="carousel-item h-full w-full relative">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Section Services */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Mes Services</h2>
        <ul className="space-y-4 text-gray-700">
          {prestataire.services.length > 0 ? (
            prestataire.services.map((service, index) => (
              <li key={index}>✔️ {service.categorie} - {service.nomService}</li>
            ))
          ) : (
            <li>Aucun service ajouté pour le moment.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GalleryPrestataire;
