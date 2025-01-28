import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavReutilisable = ({
  icon,
  buttonPrest,
  logo = "LOGO",
  userName = "John Doe",
  compact = false,
  centerContent,
  onProfileClick,
  onLogoutClick,
  profil
}) => {
  const [isExtraDropdownOpen, setExtraDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="container relative">
      <nav className={`bg-white shadow-md px-4 py-2 fixed top-0 z-40 w-full transition-all duration-300 ${compact ? 'h-12' : 'h-16'}`}>
        <div className="flex justify-between items-center h-full">
          {/* Section gauche : logo et icône */}
          <div className="flex items-center gap-2 md:gap-4">
            {icon && <div className={`${compact ? 'scale-75' : ''}`}>{icon}</div>}
            <div className={`font-bold text-blue-600 transition-all ${compact ? 'text-lg' : 'text-2xl'}`}>
              {logo}
            </div>
          </div>
          <div className="flex gap-4">
            {/* Boutons prestations sur desktop */}
            {buttonPrest && (
              <div className="md:flex items-center gap-4">
                {buttonPrest}
              </div>
            )}
            {/* Section droite : boutons et profil */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Section centrale (optionnelle) */}
              {centerContent && (
                <div className="hidden md:flex flex-1 justify-center">
                  {centerContent}
                </div>
              )}

              {/* Menu hamburger pour mobile
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-gray-700" />
                ) : (
                  <FaBars className="text-gray-700" />
                )}
              </button> */}

              {/* Profil utilisateur */}
              <div className="relative">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setExtraDropdownOpen(!isExtraDropdownOpen)}
                >
                  <FaUserCircle
                    size={compact ? 24 : 30}
                    className="text-gray-700"
                  />
                  <span className="text-gray-700 hidden sm:block font-medium">
                    {userName}
                  </span>
                </button>

                {/* Dropdown profil */}
                {isExtraDropdownOpen && (
                  <div className="absolute top-full right-0 mt-4 w-48 bg-white shadow-md rounded-md z-50">
                    <Link
                      to={profil}
                      className="block px-4 py-2 text-sm text-start hover:bg-gray-100"
                      onClick={onProfileClick}
                    >
                      Profil
                    </Link>
                    <button
                      className="w-full px-4 py-2 text-sm text-start bg-red-300 hover:bg-red-400"
                      onClick={onLogoutClick}
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md">
            {buttonPrest && (
              <div className="p-4 flex flex-col gap-2">
                {buttonPrest}
              </div>
            )}
            {centerContent && (
              <div className="p-4 border-t border-gray-200">
                {centerContent}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavReutilisable;