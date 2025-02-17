import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import DeconnexionButton from "../Authentification/déconnexion/DeconnexionButton";
import logo from "/images/logoblanc.png";

export default function NavPrestataire({ toggleSidebar, isSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState();
  const token = localStorage.getItem('token');

  const getPrestataireProfil = async (token) => {
    try {
      if (!token) {
        throw new Error('Aucun token trouvé');
      }
      const response = await fetch('https://backendtache21.onrender.com/api/prestataires/profil-prestataire', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la récupération du profil');
      }
      const data = await response.json()
      setProfile(data.prestataire)
    } catch (error) {
      console.error('Erreur:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    getPrestataireProfil(token);
  }, [token]);

  const getFirstLetter = (nom = "") => {
    return nom.charAt(0).toUpperCase();
  };

  return (
    <nav className="bg-gray-800 w-full fixed z-50 text-white px-4 flex items-center justify-between h-16 shadow-lg">
      {/* Zone gauche : Toggle + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-lg md:hidden"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/dashboard" className="block">
          <img src={logo} alt="Logo" className="h-12 w-auto md:h-20 md:w-auto" />
        </Link>
      </div>

      {/* Zone centrale : Bouton Demande Service */}
      <div className="flex items-center justify-center flex-1">
        <Link
          to="/Client"
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors
                     text-sm md:text-base font-medium whitespace-nowrap"
        >
          Demande service
        </Link>
      </div>

      {/* Zone droite : Profil */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          {profile && (
            <>
              {/* Version desktop - Nom complet avec icône */}
              <div className="hidden md:flex items-center gap-2">
                <User size={20} />
                <span>{profile.nom} {profile.prenom}</span>
              </div>
             
              {/* Version mobile - Initiale dans un cercle */}
              <div className="md:hidden flex items-center justify-center w-9 h-9 bg-gray-600 hover:bg-gray-500 rounded-full">
                <span className="text-lg font-medium">{getFirstLetter(profile.nom)}</span>
              </div>
            </>
          )}
        </button>
        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg">
            <div className="p-2">
              {profile && (
                <div className="mb-2 p-2 bg-gray-700 rounded-xl">
                  <div className="font-medium">{profile.nom} {profile.prenom}</div>
                  <div className="text-sm text-gray-300 break-words">{profile.email}</div>
                </div>
              )}
              <DeconnexionButton color="hover:bg-gray-700 rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}