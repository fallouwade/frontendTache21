import  { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="h-[72px]"></div>
     
      <nav className="bg-white border-b border-gray-200 w-full fixed top-0 left-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-[#1a3c34] font-bold text-xl sm:text-2xl md:text-[26px]">
                Services Locaux
              </a>
            </div>
            {/* Desktop/Tablet Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <a href="/services" className="text-[#1a3c34] text-base lg:text-lg hover:text-[#438178]">
                Services
              </a>
              <Link to="/connexion" className="text-[#1a3c34] text-base lg:text-lg hover:text-[#438178] whitespace-nowrap">
                Inscrivez-vous / Connectez-vous
              </Link>
              <Link to="/inscription" className="border border-[#176d5d] text-[#176d5d] px-4 lg:px-6 py-2 lg:py-2.5 rounded hover:bg-[#f4f9f8] transition-colors text-base lg:text-lg whitespace-nowrap">
                Devenir un Tasker
              </Link>
            </div>
            {/* Mobile menu button */}
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
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white absolute top-[72px] left-0 w-full shadow-lg max-h-[calc(100vh-72px)] overflow-y-auto">
              <div className="flex flex-col py-4 text-left">
                <a href="/services" className="px-4 sm:px-6 py-3 text-[#1a3c34] hover:bg-[#f4f9f8] text-base sm:text-lg">
                  Services
                </a>
                <Link to="/connecxion" className="px-4 sm:px-6 py-3 text-[#1a3c34] hover:bg-[#f4f9f8] text-base sm:text-lg">
                  Inscrivez-vous / Connectez-vous
                </Link>
                <div className="px-4 sm:px-6 py-3">
                  <Link to="/inscription" className="block text-[#176d5d] text-base sm:text-lg hover:text-[#438178]">
                    Devenir un Tasker
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

export default Navbar;