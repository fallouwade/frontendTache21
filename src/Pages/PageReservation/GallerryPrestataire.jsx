
import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';

const GalleryPrestatiare = (props) => {
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); 
    }
  }, []);

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

  const prestataire = props.prestataire;

  const imageUrl = prestataire.imageUrl ? `https://backendtache21.onrender.com/uploads/images/${prestataire.imageUrl}` : '/path/to/default/image.jpg';
  const images = Array(5).fill({ src: imageUrl, alt: "image" });

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Affichage du bouton retour seulement si l'utilisateur est connecté */}
      {isLoggedIn && (
        <div className="absolute -top-16 z-40">
          <Link
            to="/client"
            className="bg-black p-3 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition duration-300"
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
        Je m'appelle {prestataire.prenom} {prestataire.nom}, et je suis spécialisé dans tous vos travaux de {prestataire.services[0].categorie}. Découvrez ci-dessous mes services et mes réalisations.
      </p>

      {/* Galerie Desktop */}
      <div className="hidden sm:block">
        <div className="relative rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-2 h-[380px]">
            {images.map((image, index) => (
              <div key={index} className={`col-span-${index === 0 ? "2" : "1"} row-span-${index === 0 ? "2" : "1"} relative`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover ${index === 0 ? "rounded-l-xl" : ""} ${index === 3 ? "rounded-tr-xl" : ""} ${index === 4 ? "rounded-br-xl" : ""}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Galerie Mobile */}
      <div className="block sm:hidden mt-8">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-72 cursor-pointer" onClick={handleImageClick}>
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Modal plein écran pour mobile */}
      {showMobileCarousel && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
          <button onClick={() => setShowMobileCarousel(false)} className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full">
            <span className="text-2xl">×</span>
          </button>
          <div className="w-full max-w-md">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index} className="w-full h-full">
                  <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Services */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Mes Services</h2>
        <ul className="space-y-4 text-gray-700">
          <li>✔️ {prestataire.services[0].categorie}</li>
        </ul>
      </div>
    </div>
  );
};

export default GalleryPrestatiare;
