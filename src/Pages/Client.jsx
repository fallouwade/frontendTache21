"use client"

import  { useState, useCallback } from 'react';
import Sidebar from './PageClient/Sidebar/SideBar';
import ServiceGrid from './PageClient/ServiceGrid/ServiceGrid';
import SearchBar from '../Composants/SearchBar/SearchBar';
import { Button } from 'flowbite-react';
import { FaFilter } from 'react-icons/fa';

function Client() {
  // États pour gérer les différents filtres et paramètres
  const [showFilters, setShowFilters] = useState(false); // Afficher/masquer les filtres sur mobile
  const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée
  const [selectedLocality, setSelectedLocality] = useState(''); // Localité sélectionnée
  const [sortBy, setSortBy] = useState('popular'); // Critère de tri
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle pour la pagination
  const [searchQuery, setSearchQuery] = useState(''); // Terme de recherche
  const [showFavorites, setShowFavorites] = useState(false); // Afficher uniquement les favoris

  // Fonction pour gérer la recherche
  const handleSearch = useCallback((term) => {
    setSearchQuery(term);
    setCurrentPage(1); // Réinitialiser la pagination lors d'une nouvelle recherche
  }, []);

  // Fonction pour afficher/masquer les filtres sur mobile
  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* En-tête avec titre et barre de recherche */}
        <div className="container mx-auto px-4 py-4 md:py-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 md:mb-8">
            Trouvez un service près de chez vous
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="flex relative">
          {/* Fond semi-transparent pour le sidebar sur mobile */}
          {showFilters && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={toggleFilters}
            />
          )}

          {/* Sidebar avec les filtres */}
          <aside 
            className={`fixed md:sticky top-0 left-0 h-screen z-50 w-[280px] transition-transform duration-300 ease-in-out transform ${
              showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <Sidebar 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
              onClose={toggleFilters}
              showCloseButton={true}
              showFavorites={showFavorites}
              setShowFavorites={setShowFavorites}
            />
          </aside>

          {/* Contenu principal */}
          <main className="flex-1 min-w-0 px-4 md:px-6">
            {/* Contrôles de tri et bouton pour afficher les filtres sur mobile */}
            <div className="sticky top-0 z-30 bg-white py-2">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
                <Button
                  color="light"
                  onClick={toggleFilters}
                  className="md:hidden w-full sm:w-auto text-sm"
                >
                  <FaFilter className="mr-2 h-4 w-4" />
                  {showFilters ? 'Masquer filtres' : 'Afficher filtres'}
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Trier par:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 flex-1 sm:flex-none"
                  >
                    <option value="popular">Les plus pertinents</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="recent">Plus récent</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grille des services */}
            <ServiceGrid 
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedCategory={selectedCategory}
              selectedLocality={selectedLocality}
              sortBy={sortBy}
              searchQuery={searchQuery}
              showFavorites={showFavorites}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Client;

