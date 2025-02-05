import { useState } from "react";
import NavReutilisable from "../../Composants/NavReutilisable";
import SidebarAdmin from "..//Components/SidebarAdmin";
import { FiAlignLeft } from "react-icons/fi";
import { FaTachometerAlt } from "react-icons/fa";

const LayoutAdmine = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = user.prenom ? `${user.prenom} ${user.nom}` : user.nom;

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex w-full fixed max-h-screen bg-[#E8F0FE]">
            <div className="fixed z-40">
                {/* <Navbar toggleSidebar={toggleSidebar} /> */}
                <NavReutilisable
                    icon={
                        <button
                            className="lg:hidden p-2 rounded-md bg-blue-600 text-white"
                            onClick={toggleSidebar}
                        >
                            <FiAlignLeft />
                        </button>}

                    userName={`${userName}`}

                    profil="profilAdmin"
                />

            </div>
            <div className="flex w-screen z-0">
                <div className=" flex flex-col min-h-screen bg-[#0A2342] ">
                    <SidebarAdmin isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="w-screen overflow-x-auto lg:w-11/12 pt-20 ">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmine;