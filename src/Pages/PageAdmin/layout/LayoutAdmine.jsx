import { useState } from "react";
import Navbar from "../../../Composants/NavReutulisable/Navbar";
import Sidebar from "../Aside/Sidebar";

const LayoutAdmine = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex w-full fixed max-h-screen bg-[#E8F0FE]">
            <div className="fixed">
                <Navbar toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex w-screen">
                <div className=" flex flex-col min-h-screen bg-[#0A2342] ">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="w-screen overflow-x-auto lg:w-11/12 pt-20">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default LayoutAdmine;