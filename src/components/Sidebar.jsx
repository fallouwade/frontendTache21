

import { Link } from "react-router-dom"
import { FaHome, FaUser, FaClipboardList, FaPlus } from "react-icons/fa"

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? "translate-x-0 z-40" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}
    >
      <button onClick={toggleSidebar} className="absolute top-1 right-1 md:hidden">
        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <Link to="/Accueil" className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Sen Plomberie</span>
      </Link>
      <nav>
        <Link to="/Accueil" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <FaHome className="inline-block mr-2" /> Dashboard
        </Link>
        <Link
          to="/profil"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FaUser className="inline-block mr-2" /> Profil
        </Link>
        <Link
          to="/demande"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FaClipboardList className="inline-block mr-2" /> Demande
        </Link>
        <Link
          to="/ajouter"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FaPlus className="inline-block mr-2" /> Ajouter un service
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar


