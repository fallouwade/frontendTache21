// components/SidebarClient.jsx
import { useState } from "react"
import { FaUserCircle, FaGift, FaBriefcase, FaQuestionCircle, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa"
import DeconnexionButton from "../../../Authentification/déconnexion/DeconnexionButton"
function SidebarClient({ isLoggedIn, userName, userEmail }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleItemClick = (action) => {
    console.log(`Action clicked: ${action}`)
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
        <FaBars size={18} className="text-black" />
        <button  className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"> <FaUserCircle className="w-8 h-8" /></button>
       
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 transition-all duration-200 ease-in-out">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm leading-5 font-medium text-gray-900 truncate">
              {isLoggedIn ? userName : "Mon compte"}
            </p>
            {isLoggedIn && (
              <p className="text-sm leading-5 text-gray-500 truncate">{userEmail}</p>
            )}
          </div>
          <div className="py-1">
            {isLoggedIn ? (
              <>
                <MenuItem icon={FaUserCircle} text="Mon Profil" onClick={() => handleItemClick("profile")} />
                <MenuItem icon={FaGift} text="Messages" onClick={() => handleItemClick("messages")} />
                <MenuItem icon={FaBriefcase} text="Favoris" onClick={() => handleItemClick("favorites")} />
                {/* <MenuItem icon={FaSignOutAlt} text="Déconnexion" onClick={() => <DeconnexionButton/>} /> */}
                <DeconnexionButton   text="Déconnexion" />
              </>
            ) : (
              <>
                <MenuItem icon={FaUserCircle} text="Inscription" onClick={() => handleItemClick("inscription")} />
                <MenuItem icon={FaUserCircle} text="Connexion" onClick={() => handleItemClick("connexion")} />
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
      <Icon className="inline-block w-5 h-5 mr-2" />
      {text}
    </button>
  )
}

export default SidebarClient