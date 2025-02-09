import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { CgProfile } from "react-icons/cg";
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
        <Link to="/Client" className="hover:text-gray-300 transition duration-300">
          Demande service
        </Link>

        {/* Menu Profil */}
        <div className="relative">
          <button onClick={toggleProfileMenu} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
            <User size={24} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-white rounded-md shadow-lg">
              <Link 
                to="/profil-prestataire" 
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700"
                onClick={() => setIsProfileOpen(false)}
              > 
                  <CgProfile /> Voir Profil
              </Link>
              <DeconnexionButton color="hover:bg-gray-700"/>
            </div>
          ) 
          }
        </div>
      </div>
    </nav>
  );
}
