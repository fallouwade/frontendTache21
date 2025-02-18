"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaUserCircle, FaHeart, FaEnvelope } from "react-icons/fa"
import { AiOutlineCaretDown,AiOutlineCaretUp } from "react-icons/ai";
import DeconnexionButton from "../../../Authentification/déconnexion/DeconnexionButton"

function SidebarClient({ 
  isLoggedIn, 
  userName, 
  userEmail,
  favorites = [],
  onToggleFavorite,
  showFavorites,
  unreadMessages 
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleItemClick = (action) => {
    console.log(action)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Bouton du menu utilisateur */}
      <button
        type="button"
        className="flex items-center gap-2 border rounded-full p-2 hover:shadow-md transition cursor-pointer"
        onClick={handleToggle}
      >
        <span className="sr-only">Open user menu</span>
        {isOpen ? (
          <AiOutlineCaretUp 
            size={18} 
            className={`text-yellow-500 transition-transform duration-300 ${isOpen ? 'translate-x-2' : 'translate-x-0'}`}
          />
        ) : (
          <AiOutlineCaretDown 
            size={18} 
            className={`text-yellow-500 transition-transform duration-300 ${isOpen ? 'translate-x-2' : 'translate-x-0'}`}
          />
        )}
        
        {/* Avatar de l'utilisateur */}
        <div className="relative">
          {isLoggedIn && userName ? (
            <div className="w-8 h-8 bg-gray-800 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-gray-700" />
          )}
        </div>
      </button>

      {/* Modal du menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 ease-in-out">
          {/* En-tête du modal avec informations utilisateur */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm leading-5 font-medium text-gray-900 truncate">
              {isLoggedIn ? userName : "Mon compte"}
            </p>
            {isLoggedIn && <p className="text-sm leading-5 text-gray-500 truncate">{userEmail}</p>}
          </div>

          {/* Corps du modal avec les options de menu */}
          <div className="py-1">
            {isLoggedIn ? (
              <>
                <Link to="/Client/profilClient">
                  <MenuItem 
                    icon={FaUserCircle} 
                    text="Mon Profil" 
                    onClick={() => handleItemClick("profile")} 
                  />
                </Link>

                {/* Bouton Favoris - visible uniquement sur mobile */}
                <div className="md:hidden">
                  <MenuItem
                    icon={FaHeart}
                    text="Favoris"
                    onClick={() => {
                      onToggleFavorite(!showFavorites)
                      handleItemClick("favorites")
                    }}
                    badge={favorites.length > 0 ? favorites.length : null}
                  />
                </div>

                {/* Bouton Messages - visible uniquement sur mobile */}
                <div className="md:hidden">
                  <Link to="/Client/messages">
                    <MenuItem
                      icon={FaEnvelope}
                      text="Messages"
                      onClick={() => handleItemClick("messages")}
                      badge={unreadMessages > 0 ? unreadMessages : null}
                    />
                  </Link>
                </div>

                {/* Bouton de déconnexion */}
                <DeconnexionButton text="Déconnexion" />
              </>
            ) : (
              <>
                {/* Options pour les utilisateurs non connectés */}
                <Link to="/inscriptionClient">
                  <MenuItem 
                    icon={FaUserCircle} 
                    text="Inscription" 
                    onClick={() => handleItemClick("inscription")} 
                  />
                </Link>
                <Link to="/connexion">
                  <MenuItem 
                    icon={FaUserCircle} 
                    text="Connexion" 
                    onClick={() => handleItemClick("connexion")} 
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// Composant MenuItem réutilisable pour les options du menu
function MenuItem({ icon: Icon, text, onClick, badge }) {
  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="inline-block w-5 h-5 mr-2" />
          <span>{text}</span>
        </div>
        {/* Badge pour afficher les notifications ou le nombre de favoris */}
        {badge !== null && (
          <span className=" text-white text-xs rounded-full px-2 py-1 ml-2">
            {badge}
          </span>
        )}
      </div>
    </button>
  )
}

export default SidebarClient