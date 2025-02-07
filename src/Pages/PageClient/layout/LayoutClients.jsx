import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import ProfilClients from "../Components/ProfilClients";
import SearchForm from "../Components/ServiceGrid";
import CategoryGrid from "../Components/CardMessage";
import RentalSection from "../Components/RentalSection";
import { Link } from "react-router-dom";
import Footer from '../../Composants/Footer';
import InfoDemande from '../Components/InfoDemande';
import ProfilCli from '../Components/ProfilCli';

const API_URL = 'https://backendtache21.onrender.com/api/prestataires/complets';

function LayoutClients(props) {
  const location = useLocation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState({ service: '', location: '' });
  const [isPrestataire, setIsPrestataire] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, selectedCategory, searchTerm]);

  const fetchServices = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (selectedCategory) {
      filtered = filtered.filter(service => 
        service.services.some(s => s.categorie.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

   else if (searchTerm.service || searchTerm.location) {

      filtered = filtered.filter(service =>
        service.services.some(s => s.categorie.toLowerCase().includes(searchTerm.service.toLowerCase())) ||
        (service.region.toLowerCase().includes(searchTerm.location.toLowerCase()) ||
         service.departement.toLowerCase().includes(searchTerm.location.toLowerCase()))
      );
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

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsPrestataire(user.role === "prestataire");
    } catch (err) {
      console.error(err);
    }
  }, []);

 

  if (location.pathname === "/Client/messages") {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProfilClients 
          isLoggedIn={true} 
          userName={user.nom} 
          userEmail={user.email}
        />
        <InfoDemande />
        <Footer />
      </div>
    );
  }

  if (location.pathname === "/Client/profilClient") {
    return (
      <div className="min-h-screen bg-gray-100">
        <ProfilClients 
          isLoggedIn={true} 
          userName={user.nom} 
          userEmail={user.email}
        />
        <ProfilCli/>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfilClients 
        isLoggedIn={true} 
        userName={user.nom} 
        userEmail={user.email}
        buttonPrest={
          isPrestataire ? (
            <Link to="/accueil" className=" text-[12px] md:text-base  text-gray-700 font-normal py-2 sm:px-4 rounded">
              Retour à mon compte
            </Link>
          ) : (
            <Link to="/inscriptionPrestataire" className=" text-[12px] md:text-base  text-gray-700 font-normal py-2 sm:px-4 rounded">
              Devenir Prestataire
            </Link>
          )
        }
      />
      <main>
       
        <div className="text-center space-y-4">
          <h1 className="text-3xl pt-24 pb-5 font-bold tracking-tight sm:text-4xl md:text-18xl">
            Trouvez le bon professionnel près de chez vous
          </h1>
          <p className="text-lg text-gray-600">
            Plombiers, électriciens, coiffeurs et plus encore - tous les services dont vous avez besoin
          </p>
        </div>
        <div className="container mx-auto px-4 pb-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <SearchForm onSearch={handleSearch} />
            <CategoryGrid onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
          </div>
        </div>
        <div className="px-5">
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
          />
        </div>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}

export default LayoutClients;
