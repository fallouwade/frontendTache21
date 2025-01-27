import  { useState } from 'react';
import { Button } from 'flowbite-react';
import { FaFilter } from 'react-icons/fa';
import Sidebar from '../Components/SidebarClient';
import SearchBar from '../../Composants/SearchBar';
import NavReutilisable from '../../Composants/NavReutilisable';
import CardMessage from '../Components/CardMessage';
import { Link } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";


const LayoutClients = ({ children, handleFilterChange }) => {
    const [isActive, setIsActive] = useState(true);

    const [filters, setFilters] = useState({
        showFilters: false,
        sortBy: 'pertinent'
    });

   
const handleLinkClick = () => {
    setIsActive(prevState => !prevState);
  };

    const toggleFilters = () => setFilters(f => ({ ...f, showFilters: !f.showFilters }));


    return (
        <>
            <NavReutilisable buttonPrest={<Link to="/inscriptionPrestataire" className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">Devenir Prestataire</Link>} />
            <div className="flex flex-col min-h-screen pt-16 relative bg-gray-300 z-5">
                <div className="flex-grow">
                    <div className="container mx-auto px-4 py-4 md:py-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-center mb-4 md:mb-8">
                            Trouvez un service près de chez vous
                        </h1>
                        <SearchBar onSearch={(query) => handleFilterChange("searchQuery", query)} />
                    </div>
                    <div className="flex flex-col-reverse md:justify-between md:flex-row items-center gap-4 px-2">
                        <Button color="light" onClick={toggleFilters} className="md:hidden w-full sm:w-auto text-sm">
                            <FaFilter className="mr-2 h-4 w-4" /> {filters.showFilters ? 'Masquer' : 'Afficher'} filtres
                        </Button>
                        <form className="flex justify-between items-center">
                            <label className="font-bold text-gray-900 me-6" htmlFor="countries">Trier par :</label>
                            <select value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))} className="bg-gray-50 text-gray-900 text-ms rounded block py-2" id="countries">
                                <option value="pertinent">Plus pertinents</option>
                                <option value="recent">Plus récent</option>
                            </select>
                        </form>
                        <div className="flex ms-10">
                            <Link 
                                to={isActive ? "/Client/Message" : "/Client"} 
                                className={`flex items-center text-gray-600 hover:text-gray-700 ${isActive ? 'font-medium' : ''}`}
                                onClick={handleLinkClick}
                            >
                                <CardMessage title={isActive ? "Message" : "Accueil"}>
                                    <span>{isActive ? 3 : <FaTachometerAlt />}</span>
                                </CardMessage>
                            </Link>
                            <CardMessage title="Favoris"><span>3</span></CardMessage>
                        </div>
                    </div>
                    <div className="flex relative mt-10">
                        {filters.showFilters && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleFilters} />}
                        <Sidebar {...filters} onClose={toggleFilters} />
                        <main className="flex-1 min-w-0 sm:px-4 md:px-6">{children}</main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutClients;