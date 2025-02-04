
import  { useState } from 'react';
import { FaShare, FaHeart } from 'react-icons/fa';
import plombier from '../../assets/plombier1.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GalleryPrestatiare = (props) => {
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);

  const images = [
    { src: plombier, alt: "Service plomberie - Vue 1" },
    { src: plombier, alt: "Service plomberie - Vue 2" },
    { src: plombier, alt: "Service plomberie - Vue 3" },
    { src: plombier, alt: "Service plomberie - Vue 4" },
    { src: plombier, alt: "Service plomberie - Vue 5" },
  ];

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
  const prestataire = props.prestataire

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Bonjour, je suis {prestataire.prenom}{" "} {prestataire.nom}</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FaShare className="w-5 h-5" />
            <span className="hidden sm:inline">Partager</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
            <FaHeart className="w-5 h-5" />
            <span className="hidden sm:inline">Favoris</span>
          </button>
        </div>
      </div>

      <p className="text-lg text-gray-700 mb-6">
        Je m'appelle Moustapha Ndiaye, et je suis spécialisé dans tous vos travaux de plomberie, que ce soit pour une installation neuve, des réparations ou des rénovations. Découvrez ci-dessous mes services et mes réalisations.
      </p>

      <div className="hidden sm:block">
        <div className="relative rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 gap-2 h-[380px]">
            <div className="col-span-2 row-span-2 relative">
              <img
                src={plombier}
                alt="Installation de cuisine - Vue principale"
                className="w-full h-full object-cover rounded-l-xl"
              />
            </div>
            <div className="col-span-1">
              <img
                src={plombier}
                alt="Travaux de salle de bain"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1">
              <img
                src={plombier}
                alt="Réparation de fuite"
                className="w-full h-full object-cover rounded-tr-xl"
              />
            </div>
            <div className="col-span-1">
              <img
                src={plombier}
                alt="Installation de chauffe-eau"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 relative">
              <img
                src={plombier}
                alt="Remplacement de canalisation"
                className="w-full h-full object-cover rounded-br-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grille mobile : Utilisation de Slick Carousel */}
      <div className="block sm:hidden mt-8">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-72 cursor-pointer"
              onClick={handleImageClick} // Ouvre le carrousel plein écran sur click
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

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
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg">
                    {index + 1} / {images.length}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mes Services */}
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