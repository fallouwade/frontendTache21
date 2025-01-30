import { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { FaFilter } from 'react-icons/fa';
import Sidebar from '../Components/SidebarClient';
import SearchBar from '../../Composants/SearchBar';
import NavReutilisable from '../../Composants/NavReutilisable';
import CardMessage from '../Components/CardMessage';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt } from "react-icons/fa";


const LayoutClients = ({ children, handleFilterChange }) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(location.pathname === '/client/message');
    const [isPrestataire, setIsPrestataire] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        showFilters: false,
        sortBy: 'pertinent'
    });

    // Recuperer l'utilisateur sur localstorage
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLinkClick = () => {
        setIsActive(!isActive);
    };

    const toggleFilters = () => setFilters(f => ({ ...f, showFilters: !f.showFilters }));

    useEffect(() => {
        setIsActive(location.pathname === '/client/message');
    }, [location]);
    // la logique 
    useEffect(() => {
        try {
            // Récupérer le rôle depuis le localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user.role === 'prestataire') {
                setIsPrestataire(true);
            } else {
                setIsPrestataire(false);
            }

            setLoading(false);  // Fin du chargement

        } catch (err) {
            setLoading(false);
            setError('Erreur lors de la récupération du rôle depuis le localStorage');
            console.error(err);  // Afficher l'erreur dans la console pour le débogage
        }
    }, []);

    if (loading) {
        return <div>Chargement...</div>;  // Message de chargement pendant l'exécution du useEffect
    }

    if (error) {
        return <div>{error}</div>;  // Affichage d'une erreur s'il y en a
    }

    return (
        <>
            <NavReutilisable
                buttonPrest={
                    isPrestataire ? (
                        <Link to="/accueil" className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">
                            retour a mon compte
                        </Link>
                    ) : (
                        <Link to="/inscriptionPrestataire" className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">
                            Devenir Prestataire
                        </Link>
                    )
                }
                profil="profilClient"
                userName={`${user.nom} ${user.prenom}`}
            // buttonPrest={<Link to="/inscriptionPrestataire" className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">Devenir Prestataire</Link>} profil="profilClient" 
            />
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
                                to={isActive ? "/client" : "/client/message"}
                                className={`flex items-center text-gray-600 hover:text-gray-700 ${isActive ? 'font-medium' : ''}`}
                            >
                                <CardMessage title={isActive ? "Accueil" : "Réservation"}>
                                    <span>{isActive ? <FaTachometerAlt /> : 3}</span>
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
