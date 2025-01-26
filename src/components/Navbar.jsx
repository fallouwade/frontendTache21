
import React, { useState } from "react"
import { FaUserCircle, FaBars, FaBell } from "react-icons/fa"

const Navbar = ({ toggleSidebar, toggleRightSidebar }) => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 focus:outline-none md:hidden mr-4">
          <FaBars className="h-6 w-6" />
        </button>
        {/* <button onClick={toggleRightSidebar} className="text-gray-500 focus:outline-none">
          <FaBell className="h-6 w-6" />
        </button>  */}
      </div>
      <div className="relative">
        <button className="flex items-center space-x-2 z-30" onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}>
          <span className="text-gray-700 font-medium">John Doe</span>
          <FaUserCircle className="h-8 w-8 text-gray-700" />
        </button>
        {isProfileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <a href="/Accueil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profil Prestataire
            </a>
            <a href="/Client" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profil Client
            </a>
            <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Déconnecter
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


