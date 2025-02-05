import { useState, useRef, useEffect } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import SidebarClient from "./SidebarClient";
import { Link, useLocation } from "react-router-dom";

function ProfilClients({ isLoggedIn, userName, userEmail }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash === "#comment-ca-marche") {
      setTimeout(() => {
        const section = document.getElementById("comment-ca-marche");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300); // Petit délai pour s'assurer que l'élément est chargé
    }
  }, [location]);

  const scrollToSection = () => {
    const section = document.getElementById("comment-ca-marche");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 bg-white transition-all duration-200 ${isScrolled ? 'shadow-md py-4' : 'py-6'}`}>
        <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-2 px-2">
          <div className="flex items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <a href="/" className="hidden md:block">
              <span className="text-rose-500 text-xl font-bold">ServicePro</span>
            </a>

            <div>
              <button
                className="hidden md:block hover:bg-gray-100 py-3 px-4 rounded-full transition"
                onClick={scrollToSection}
              >
                Comment ça marche
              </button>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:bg-gray-100 py-3 px-4 rounded-full transition">
                <Link to='/inscriptionPrestataire'>
                  Devenir prestataire
                </Link>
              </button>
              <button className="hidden md:block hover:bg-gray-100 p-3 rounded-full transition">
                <FaGlobe size={18} />
              </button>

              <div className="flex items-center gap-2 border rounded-full p-2 hover:shadow-md transition cursor-pointer">
                <FaBars size={18} />
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
                onClick={() => setIsSearchExpanded(false)}
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
