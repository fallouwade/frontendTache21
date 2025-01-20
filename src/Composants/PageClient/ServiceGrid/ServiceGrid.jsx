import React from 'react';
import { FaStar, FaMapMarkerAlt, FaClock, FaCheck, FaHeart } from 'react-icons/fa';

// Données d'exemple pour les services
const services = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Professionnel ${index + 1}`,
  job: ['Plombier', 'Électricien', 'Coiffeur', 'Mécanicien', 'Designer', 'Photographe', 'Chef cuisinier', 'Développeur'][index % 8],
  rating: (4 + Math.random()).toFixed(1),
  locality: ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nantes', 'Strasbourg'][index % 8],
  department: ['75', '69', '13', '33', '59', '31', '44', '67'][index % 8],
  reviews: Math.floor(Math.random() * 100) + 1,
  category: ['plomberie', 'electricite', 'coiffure', 'mecanique', 'design', 'photographie', 'cuisine', 'informatique'][index % 8],
  price: Math.floor(Math.random() * 150) + 30,
  distance: Math.floor(Math.random() * 10) + 1,
  availability: ['Disponible maintenant', 'Disponible demain', 'Disponible cette semaine'][Math.floor(Math.random() * 3)],
  verifiedPro: Math.random() > 0.7,
  isFavorite: Math.random() > 0.7, // Ajoute aléatoirement des services aux favoris
}));

function ServiceGrid({ currentPage, setCurrentPage, selectedCategory, selectedLocality, sortBy, searchQuery, showFavorites }) {
  const itemsPerPage = 9;
  
  // Logique de filtrage
  let filteredServices = services;

  if (showFavorites) {
    filteredServices = filteredServices.filter(service => service.isFavorite);
  }

  if (searchQuery) {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    filteredServices = filteredServices.filter(service => {
      const searchableText = `${service.name} ${service.job} ${service.locality}`.toLowerCase();
      return searchTerms.every(term => searchableText.includes(term));
    });
  }

  if (selectedCategory) {
    filteredServices = filteredServices.filter(service => service.category === selectedCategory);
  }
  if (selectedLocality) {
    filteredServices = filteredServices.filter(service => service.locality === selectedLocality);
  }

  // Logique de tri
  filteredServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.id - a.id;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'distance':
        return a.distance - b.distance;
      case 'popular':
      default:
        if (searchQuery) {
          const aRelevance = `${a.name} ${a.job}`.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          const bRelevance = `${b.name} ${b.job}`.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
          if (aRelevance !== bRelevance) return bRelevance - aRelevance;
        }
        return b.reviews - a.reviews;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Grille des services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 p-2 sm:p-3 md:p-4">
        {currentServices.map((service) => (
          <div key={service.id} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative">
              <img 
                src="/placeholder.svg?height=200&width=300" 
                alt={service.name}
                className="w-full h-36 sm:h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              {service.verifiedPro && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-emerald-500/90 text-white px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm">
                  <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                  <span>Vérifié</span>
                </div>
              )}
              <button 
                className={`absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 p-2 rounded-full ${
                  service.isFavorite ? 'text-red-500' : 'text-gray-400'
                } hover:text-red-500 transition-colors duration-200`}
                aria-label={service.isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-tight">{service.name}</h3>
                <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500">
                  <FaStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="font-semibold text-sm sm:text-base">{service.rating}</span>
                  <span className="text-xs sm:text-sm text-gray-500">({service.reviews})</span>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 md:mb-4">{service.job}</p>
              <div className="flex items-center gap-1 sm:gap-2 text-gray-500 mb-2 sm:mb-3 md:mb-4">
                <FaMapMarkerAlt className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-blue-500" />
                <span className="text-xs sm:text-sm">{service.locality} ({service.department})</span>
              </div>
              <div className="flex justify-between items-center pt-2 sm:pt-3 md:pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-0.5 sm:gap-1">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{service.price}€</span>
                  <span className="text-xs sm:text-sm text-gray-500">/heure</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5 text-emerald-600 text-xs sm:text-sm font-medium">
                  <FaClock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{service.availability}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 p-2 sm:p-3 md:p-4">
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Affichage de <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> à{' '}
          <span className="font-semibold">
            {Math.min(currentPage * itemsPerPage, filteredServices.length)}
          </span>{' '}
          sur <span className="font-semibold">{filteredServices.length}</span> résultats
        </p>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Précédent
          </button>
          
          <div className="hidden sm:flex">
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border-t border-b ${
                  currentPage === idx + 1
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          <div className="flex sm:hidden">
            <span className="px-2 py-1 text-xs border-t border-b bg-gray-50">
              Page {currentPage} sur {totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceGrid;

