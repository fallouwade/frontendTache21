import { useState } from 'react';
import { FaEnvelope, FaUserCircle} from 'react-icons/fa';
import { FiAlignLeft } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";

const Navbar = ({ toggleSidebar }) => {


  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isExtraDropdownOpen, setExtraDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center w-full fixed top-0 z-50">
      {/* Logo */}


      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="lg:hidden p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleSidebar}
      >
        <FiAlignLeft />
      </button>
      <div className="text-2xl font-bold text-blue-600">Logo</div>
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Message Icon */}
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <FaEnvelope size={20} className="text-gray-600" />
        </button>

        {/* User and Dropdown Section */}
        <div className="relative flex items-center gap-2">
          {/* User Profile */}
          <button
            className="flex items-center gap-2"
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <FaUserCircle size={30} className="text-gray-700" />
            <span className="text-gray-700 font-medium">John Doe</span>
          </button>
          {/* Dropdown Button */}
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center"
            onClick={() => setExtraDropdownOpen(!isExtraDropdownOpen)}
          >
            <div className="flex justify-center">
              <IoSettings className="text-black text-xl animate-spin-slow" />
            </div>
          </button>
          {isExtraDropdownOpen && (
            <div className="absolute top-full right-0 mt-4 w-48 bg-white shadow-md rounded-md z-50">
              <button
                className=" w-full px-4 py-2 text-sm text-start hover:bg-gray-100"
              >
                Confidentialité
              </button>
              <button
                className=" w-full px-4 py-2 text-sm text-start hover:bg-gray-100"
              >
                Profil
              </button>
              <button
                className=" w-full px-4 py-2 text-sm text-start bg-red-300 hover:bg-gray-100"
              >
                Deconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
