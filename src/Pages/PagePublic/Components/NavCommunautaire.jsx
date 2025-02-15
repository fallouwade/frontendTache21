
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

const NavCommunautaire = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="h-[72px]"></div>

      <nav className="bg-white border-b border-gray-200 w-full fixed top-0 left-0 z-50">
        <div className="  mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-[#1a3c34] font-bold text-xl sm:text-2xl md:text-[26px]">
                Local Services
              </a>
            </div>
            <div className="hidden md:flex items-center justify-center w-full">
              <Link to="/inscriptionPrestataire" className="border border-[#176d5d] bg-[#176d5d] text-white   px-3 lg:px-4 py-2 lg:py-2.5 text-base sm:text-lg  transition-colors text-base lg:text-lg whitespace-nowrap rounded-full">
                Devenir un Prestataire
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link
                to="/inscriptionClient"
                className="text-[#1a3c34] text-base lg:text-lg whitespace-nowrap relative group"
              >
                <span className="relative z-10">Inscription</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#438178] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/connexion"
                className="text-[#1a3c34] text-base lg:text-lg whitespace-nowrap relative group"
              >
                <span className="relative z-10">Connexion</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#438178] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#1a3c34] p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white absolute top-[72px] left-0 w-full shadow-lg max-h-[calc(100vh-72px)] overflow-y-auto">
              <div className="flex flex-col py-4 text-left">
                <Link to="/inscriptionClient" className="px-4 sm:px-6 py-3 text-[#1a3c34] hover:bg-[#f4f9f8] text-base sm:text-lg">
                  Inscription
                </Link>
                <Link to="/connexion" className="px-4 sm:px-6 py-3 text-[#1a3c34] hover:bg-[#f4f9f8] text-base sm:text-lg">
                  Connexion
                </Link>
                <div className="px-4 sm:px-6 py-3 w-[230px]">
                  <Link to="/inscriptionPrestataire" className="block bg-[#176d5d] text-white text-base sm:text-lg hover:bg-[#1a3c34] px-4 py-2 rounded-full">
                    Devenir un Prestataire
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavCommunautaire;
