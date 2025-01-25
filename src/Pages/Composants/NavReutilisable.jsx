import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const NavReutilisable = ({ icon,buttonPrest }) => {


  // const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isExtraDropdownOpen, setExtraDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center w-full fixed top-0 z-40">
      {/* Logo */}
      {icon}
      <div className="flex items-center gap-4 md:gap-10">
        <div className='text-2xl font-bold text-blue-600'>LOGO</div>
        {buttonPrest}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* User and Dropdown Section */}
        <div className="relative flex items-center gap-2">
          {/* User Profile */}
          <button
            className="flex items-center gap-2"
            onClick={() => setExtraDropdownOpen(!isExtraDropdownOpen)}
          >
            <FaUserCircle size={30} className="text-gray-700" />
            <span className="text-gray-700 hidden sm:block font-medium">John Doe</span>
          </button>
          {/* Dropdown Button */}
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
                className=" w-full px-4 py-2 text-sm text-start bg-red-300 hover:bg-red-'00"
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

export default NavReutilisable;
