import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const NavReutilisable = ({ icon, buttonPrest }) => {
  const [isExtraDropdownOpen, setExtraDropdownOpen] = useState(false);

  return (
    <div className="container">
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between  items-center w-full  fixed top-0 z-40">
      {/* Section de gauche : icône et logo */}
      <div className="flex items-center gap-4">
        {icon}
        <div className="text-2xl font-bold text-blue-600">LOGO</div>
      </div>

      {/* Section centrale : bouton (facultatif, fourni via props) */}
      {buttonPrest && (
        <div className="hidden md:flex items-center gap-4">{buttonPrest}</div>
      )}

      {/* Section de droite : dropdown utilisateur */}
      <div className="relative flex items-center gap-2">
        <button
          className="flex items-center gap-2"
          onClick={() => setExtraDropdownOpen(!isExtraDropdownOpen)}
        >
          <FaUserCircle size={30} className="text-gray-700" />
          <span className="text-gray-700 hidden sm:block font-medium">
            John Doe
          </span>
        </button>

        {isExtraDropdownOpen && (
          <div className="absolute top-full right-0 mt-4 w-48 bg-white shadow-md rounded-md z-50">
            <button className="w-full px-4 py-2 text-sm text-start hover:bg-gray-100">
              Profil
            </button>
            <button className="w-full px-4 py-2 text-sm text-start bg-red-300 hover:bg-red-400">
              Déconnexion
            </button>
          </div>
        )}
      </div>
      
    </nav>
    </div>
  );
};

export default NavReutilisable;
