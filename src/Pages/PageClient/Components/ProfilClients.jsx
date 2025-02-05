
import { useState, useEffect } from "react";
import { FaGlobe, FaBars, FaSearch } from "react-icons/fa";
import SidebarClient from "./SidebarClient";

function ProfilClients({ isLoggedIn, userName, userEmail }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  // const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchExpanded(!isSearchExpanded);

  return (
    <>
      <nav className={`fixed w-full z-50 bg-white transition-all duration-200 ${isScrolled ? 'shadow-md py-4' : 'py-6'}`}>
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <a href="/" className="hidden md:block">
              <span className="text-rose-500 text-xl font-bold">ServicePro</span>
            </a>

            {/* Search Bar - Compact */}
            <button
              onClick={toggleSearch}
              className={`flex items-center w-full md:w-auto justify-between rounded-full border shadow-sm hover:shadow-md transition cursor-pointer ${
                isScrolled ? 'py-2 px-4' : 'py-3 px-6'
              }`}
            >
              <div className="flex items-center divide-x">
                <span className="px-4 font-medium">Service</span>
                <span className="px-4 font-medium">Localisation</span>
                <div className="pl-4 pr-2">
                  <div className="p-2 bg-rose-500 rounded-full text-white">
                    <FaSearch size={14} />
                  </div>
                </div>
              </div>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
              {/* <button className="hidden md:block hover:bg-gray-100 py-3 px-4 rounded-full transition">
                Devenir prestataire
              </button> */}
             <div  className="hidden md:block hover:bg-gray-100 py-3 px-4 rounded-full transition">
              { buttonPrest}
             </div>
              
              <div >
                
                <SidebarClient isLoggedIn={isLoggedIn} userName={userName} userEmail={userEmail} />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Expanded Search Modal */}
      {isSearchExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute top-0 left-0 right-0 bg-white p-8">
            <div className="max-w-[2520px] mx-auto">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium mb-2">Service</label>
                  <input
                    type="text"
                    placeholder="Quel service recherchez-vous ?"
                    className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Localisation</label>
                  <input
                    type="text"
                    placeholder="Où ?"
                    className="w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
              <button
                onClick={toggleSearch}
                className="mt-6 bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilClients;