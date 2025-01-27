import { useState } from "react";
import Sidebar from "./Sidebar";
import NavReutilisable from "../Pages/Composants/NavReutilisable";
import { FaBars } from "react-icons/fa";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="container-fluid">
    <div className="flex flex-row h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col container-fluid overflow-hidden w-full ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <NavReutilisable
          icon={
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none md:hidden mr-4"
            >
              <FaBars className="h-6 w-6" />
            </button>
          }
          buttonPrest={
            <button className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded">
              Faire une demande
            </button>
          }
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto md:px-6 px-2 py-8">{children}</div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default Layout;
