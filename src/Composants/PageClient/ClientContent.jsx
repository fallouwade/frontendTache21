import { useState } from "react";
import Navbar from "../NavbarAside/NavBar"
import Sidebar from "../NavbarAside/Sidebar"

function ClientContent() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen((prev) => !prev);
    };

  return (
    <div className="flex">
    {/* Navbar */}
    <Navbar toggleSidebar={toggleSidebar} />

    {/* Sidebar */}
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    {/* Main Content */}
    <div className="flex-1 pt-16 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Bienvenue sur notre plateforme</h1>
      <p className="text-gray-600 mt-4">
        Recherchez des professionnels qualifiés, réservez leurs services, et payez en ligne.
      </p>
    </div>
  </div>
  )
}

export default ClientContent