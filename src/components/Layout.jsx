import { useState } from "react";
import Sidebar from "./Sidebar";
import NavReutilisable from "../Pages/Composants/NavReutilisable";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'))

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  console.log(user)
  
  const navigate = useNavigate();
  const handleServiceRequest = () => {
    navigate('/client', { state: { role: 'client' } });
  };
  return (
    <div className="container-fluid">
              <div className="overflow-hidden relative">
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
                <button className="bg-blue-100 text-[12px] md:text-base hover:bg-blue-300 text-gray-700 font-normal py-2 px-1 sm:px-3 rounded" 
                onClick={handleServiceRequest} 
>
                    Demande services
                </button>
              }

              profil="/profil"

              userName={user.nom}
            />
          </div>
      <div className="flex flex-row min-h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className={`flex flex-col w-11/12  ${sidebarOpen ? "md:ml-64" : ""
            }`}
        >

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto md:px-6 px-2 py-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
