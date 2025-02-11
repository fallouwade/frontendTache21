"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"
import DeconnexionButton from "../../../Authentification/déconnexion/DeconnexionButton"

function SidebarClient({ isLoggedIn, userName, userEmail }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleItemClick = (action) => {
    console.log(action)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 border rounded-full p-2 hover:shadow-md transition cursor-pointer"
        onClick={handleToggle}
      >
        <span className="sr-only">Open user menu</span>
        <FaSignOutAlt size={18} className="text-yellow-500 transition-transform duration-300 hover:translate-x-2" />

        <div className="relative">
          {isLoggedIn && userName ? (
            <div className="w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
          ) : (
            <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-gray-700" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 ease-in-out">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm leading-5 font-medium text-gray-900 truncate">
              {isLoggedIn ? userName : "Mon compte"}
            </p>
            {isLoggedIn && <p className="text-sm leading-5 text-gray-500 truncate">{userEmail}</p>}
          </div>
          <div className="py-1">
            {isLoggedIn ? (
              <>
                <Link to="/Client/profilClient">
                  <MenuItem icon={FaUserCircle} text="Mon Profil" onClick={() => handleItemClick("profile")} />
                </Link>
                <DeconnexionButton text="Déconnexion" />
              </>
            ) : (
              <>
                <Link to="/inscriptionClient">
                  <MenuItem icon={FaUserCircle} text="Inscription" onClick={() => handleItemClick("inscription")} />
                </Link>
                <Link to="/connexion">
                  <MenuItem icon={FaUserCircle} text="Connexion" onClick={() => handleItemClick("connexion")} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MenuItem({ icon: Icon, text, onClick }) {
  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Icon className="inline-block w-5 h-5 mr-2" />
        <span>{text}</span>
      </div>
    </button>
  )
}

export default SidebarClient

