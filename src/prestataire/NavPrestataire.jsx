import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import DeconnexionButton from "../Authentification/déconnexion/DeconnexionButton";
import logo from "/images/logoblanc.png";

export default function NavPrestataire() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile, setProfile] = useState();
  const token = localStorage.getItem('token');

  const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

  // Fonction principale pour récupérer le profil prestataire
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
  }, [token])

  console.log(profile)
  return (
    <nav className="bg-gray-800  w-full fixed z-50  text-white pl-4 pr-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <a href="/" className="text-rose-500 text-2xl font-extrabold">
        <img src={logo} alt="Logo" width="120" />

      </a>

      {/* Menu desktop */}
      <div className="flex space-x-6 items-center">
        <Link to="/Client" className="hover:text-gray-300 transition duration-300">
          Demande service
        </Link>

        {/* Menu Profil */}
        <div className="relative">
          <button onClick={toggleProfileMenu} className="flex items-center space-x-2 hover:text-gray-300 transition duration-300">
            <User size={24} />
           <span>{profile.nom} {profile.prenom}</span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 p-2 bg-gray-900 text-white rounded-md shadow-lg">
              <Link
                to="/dashboard"
                className="flex flex-col items-start mb-2 bg-gray-700 rounded-xl gap-3 px-2 py-2 hover:bg-gray-700"
                onClick={() => setIsProfileOpen(false)}
              >   
                <div>
                  <span>{profile.nom} </span>
                  <span>{profile.prenom}</span>
                </div>
                <div>{profile.email}</div>
              </Link>
              <DeconnexionButton color="hover:bg-gray-700 rounded-xl" />
            </div>
          )
          }
        </div>
      </div>
    </nav>
  );
}
