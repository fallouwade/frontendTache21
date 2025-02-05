import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, User, PlusCircle } from "lucide-react";
import NavbarPrestataire from "./navbarPrestataire";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Demandes", path: "/les-demande", icon: FileText },
  { name: "Profil", path: "/profil-prestataire", icon: User },
  { name: "Ajouter Service", path: "/ajouter-service-prestataire", icon: PlusCircle }
];

const NavigationLink = ({ item, isActive, onClick }) => (
  <Link
    to={item.path}
    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-600 bg-opacity-20 border-e-4 border-blue-700 text-white" : "text-gray-300 hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    <item.icon size={20} />
    <span className="font-medium">{item.name}</span>
  </Link>
);

export default function SidebarPrestataire({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarPrestataire className="fixed top-0 left-0 right-0 z-50" />

      <div className="flex relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white md:hidden"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Fixed Sidebar */}
        <aside
          className={`fixed md:fixed top-16 bottom-0 left-0 w-64 bg-gray-900 transform transition-transform duration-200 ease-in-out z-40 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold text-white py-4">Prestataire</h2>
            </div>

            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <NavigationLink
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  onClick={() => setIsSidebarOpen(false)}
                />
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 mt-16 ml-0 md:ml-64 min-h-[calc(100vh-4rem)] p-6 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}