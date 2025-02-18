import { useState, useEffect } from 'react';
import * as motion from "motion/react-client" // Importation de motion
import Navbar from "../Components/ProfilClients";
import SearchForm from "../Components/ServiceGrid";
import CategoryGrid from "../Components/CardMessage";
import RentalSection from "../Components/RentalSection";
import Temoignages from '../Components/Temoignages';
import Satisfaction from '../Components/Satisfaction';
import Footer from '../../Composants/Footer';
import { Link } from 'react-router-dom';
import logo from '/images/logo.png'

const API_URL = 'https://backendtache21.onrender.com/api/prestataires/complets';

function LayoutCommunautaire(props) {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Chargement activé au départ
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ service: '', location: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, selectedCategory, searchTerm]);

  const fetchServices = async () => {
    setIsLoading(true); // Démarre le chargements
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const data = await response.json();
      const validServices = data.filter((service) => service.services && service.services.length > 0);
      setServices(validServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Impossible de charger les services. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false); // Fin du chargement après récupération des données
    }
  };

  const filterServices = () => {
    let filtered = [...services];

    if (selectedCategory) {
      filtered = filtered.filter(service => 
        service.services.some(s => s.categorie.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    if (searchTerm.service || searchTerm.location) {
      // trier pour afficher les services recherchés en premier
      let matchingServices = filtered.filter(service => 
        service.services.some(s => s.categorie.toLowerCase() === searchTerm.service.toLowerCase())
      );

      let otherService = filtered.filter(service =>
        !service.services.some(s => s.categorie.toLowerCase() === searchTerm.service.toLowerCase())
      )
      filtered = filtered.filter(service =>
        service.services.some(s => s.categorie.toLowerCase().includes(searchTerm.service.toLowerCase())) &&
        (service.region.toLowerCase().includes(searchTerm.location.toLowerCase()) ||
         service.departement.toLowerCase().includes(searchTerm.location.toLowerCase()))
      );
      // mettre en premier les services recherchés

      filtered = [...matchingServices, ...otherService];
    
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (service, location) => {
    setSearchTerm({ service, location });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        buttonPrest={(
          <Link
            to="/inscriptionPrestataire"
            className="hover:bg-gray-300 py-2 md:px-5 px-2 rounded-full transition text-sm font-medium cursor-pointer"
          >
            Devenir Prestataire
          </Link>
        )}
      />
      
      {/* Affichage du chargement pendant le démarrage */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            className="flex justify-center items-center"
          >
            <img 
              src={logo}  // Chemin de l'image de chargement
              alt="Chargement..." 
              className="h-24"  // Ajuste la taille si nécessaire
            />
          </motion.div>
        </div>
      )}

      <main>
        <div>
          <div className="relative w-full h-screen mb-10">
            <video
              src="/images/gettyimages-2180909650-640_adpp.mp4"
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              onError={(e) => console.error("Erreur vidéo:", e)}
            ></video>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 px-8 z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto">
                <div className="text-center sm:text-left">
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                    Besoin d'un <span className="text-yellow-400">professionnel</span> près de chez vous ?
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white">
                    Trouvez rapidement des plombiers, électriciens, développeurs freelance, enseignants et bien plus,
                    disponibles dans votre région, en quelques clics !
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 pb-10">
            <div className="max-w-4xl mx-auto space-y-6">
              <SearchForm onSearch={handleSearch} />
              <CategoryGrid onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
            </div>
          </div>

          <div className="md:px-3  px-0">
            <RentalSection 
              services={currentServices}
              servicesPerPage={servicesPerPage}
              totalServices={filteredServices.length}
              paginate={paginate}
              currentPage={currentPage}
              isLoading={isLoading}
              error={error}
              noResults={filteredServices.length === 0 && !isLoading && !error}
              id={props.id}
              searchTerm={searchTerm}
              highlightSearch={true}
            
            />
          </div>
          
          <div>
            <Temoignages />
          </div>
          
          <div>
            <Satisfaction />
          </div>
          
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default LayoutCommunautaire;
