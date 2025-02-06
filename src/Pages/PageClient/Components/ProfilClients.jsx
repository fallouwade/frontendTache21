import { useState, useRef, useEffect } from "react";
import SidebarClient from "./SidebarClient";

function ProfilClients({ isLoggedIn, userName, userEmail,  buttonPrest , buttonInfo }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);


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
        <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-2 px-4">
          <div className="flex items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <a href="/" className="hidden md:block">
              <span className="text-rose-500 text-xl font-bold">ServicePro</span>
            </a>

            {/* passer en props comment ca marche  */}
            <div  className="hidden md:block hover:bg-gray-100 py-3 px-4 rounded-full transition">
              {buttonInfo}
             </div>
            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
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