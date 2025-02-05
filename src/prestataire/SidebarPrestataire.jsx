import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, User, PlusCircle } from "lucide-react";
import NavbarPrestataire from "./navbarPrestataire";


export default function SidebarPrestataire({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={20} /> },
    { name: "Les Demandes", path: "/les-demande", icon: <FileText size={20} /> },
    { name: "ProfilDuPrestataire", path: "/profil-prestataire", icon: <User size={20} /> },
    { name: "Ajouter Service", path: "/ajouter-service-prestataire", icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className=" flex flex-col min-h-screen">
      {/* Navbar en haut */}
      <NavbarPrestataire  />

      <div className="flex flex-1">
        {/* Sidebar mobile */}
        <button
          className="md:hidden fixed top-4 left-4 bg-gray-500 text-white p-2 rounded-full z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-5 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden z-40`}
        >
          <h2 className="text-xl font-bold mb-6 py-10">Prestataire</h2>
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 p-2 rounded-md transition ${
                  location.pathname === link.path ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
                onClick={() => setIsOpen(false)} // Fermer après un clic
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar en grand écran */}
        <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white min-h-screen p-5">
          <h2 className="text-xl font-bold mb-6">Prestataire</h2>
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 p-2 rounded-md transition ${
                  location.pathname === link.path ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
