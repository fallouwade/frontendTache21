import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import DeconnexionButton from "../Authentification/déconnexion/DeconnexionButton";

export default function NavbarPrestataire() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  return (
    <nav className="bg-gray-800  w-full fixed z-50  text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <span className="text-2xl font-semibold pl-20 cursor-pointer">Logo</span>

      {/* Menu desktop */}
      <div className="flex space-x-6 items-center">
        <Link to="/accueil" className="hover:text-gray-300 transition duration-300">
          Accueil
        </Link>

        {/* Menu Profil */}
        <div className="relative">
          <button onClick={toggleProfileMenu} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
            <User size={24} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-md shadow-lg">
              <Link to="/profil" className="block px-4 py-2 hover:bg-gray-700">Voir Profil</Link>
              {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-700">Déconnexion</button> */}
              <DeconnexionButton color="hover:bg-gray-700"/>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
