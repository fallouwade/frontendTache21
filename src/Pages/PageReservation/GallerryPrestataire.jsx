import { useState } from 'react';
import { FaShare, FaHeart } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryPrestatiare = ({ prestataire }) => {
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);

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

  // Récupérer l'image du premier service (si disponible)
  const imageUrl = prestataire.services.length > 0 ? prestataire.services[0].imageUrl : null;

  const images = imageUrl ? [
    { src: imageUrl, alt: prestataire.services[0].nomService },
  ] : [];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">
          Bonjour, je suis {prestataire.prenom} {prestataire.nom}
        </h1>
      </div>
      <p className="text-lg text-gray-700 mb-6">
        Je m'appelle {prestataire.prenom} {prestataire.nom}, et je suis spécialisé dans tous vos travaux de{" "}
        {prestataire.services.length > 0 ? prestataire.services[0].categorie : "divers services"}.
      </p>

      {/* Section Image principale */}
      {imageUrl && (
        <div className="hidden sm:block">
          <div className="relative rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 gap-2 h-[380px]">
              <div className="col-span-2 row-span-2 relative">
                <img src={imageUrl} alt="Service" className="w-full h-full object-cover rounded-l-xl" />
              </div>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="col-span-1">
                  <img src={imageUrl} alt={`Service ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Carousel Mobile */}
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
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50">
          <div className="relative h-full">
            <button
              onClick={() => setShowMobileCarousel(false)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full"
            >
              <span className="text-2xl">×</span>
            </button>
            <div className="carousel h-full">
              {images.map((image, index) => (
                <div key={index} className="carousel-item h-full w-full relative">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
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

export default GalleryPrestatiare;
