import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFilter, FaChevronDown } from 'react-icons/fa';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside
      className={`fixed lg:relative top-16 left-0 bg-gray-50 shadow-md h-full w-64 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="p-4">
        {/* Dropdown for Services */}
        <div className="relative mb-4">
          <button
            className="w-full text-left bg-gray-100 px-4 py-2 rounded-md flex items-center justify-between"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            Types de services <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className="mt-1 w-full bg-white shadow-md rounded-md">
              <a href="#service1" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Service 1
              </a>
              <a href="#service2" className="block px-4 py-2 text-sm hover:bg-gray-100">
                Service 2
              </a>
            </div>
          )}
        </div>

        {/* Search by Location */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Rechercher par localisation"
            className="w-full border rounded-md px-4 py-2"
          />
          <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Filter by Price */}
        <div className="mb-4">
          <label htmlFor="price" className="text-sm text-gray-600">
            Filtrer par prix
          </label>
          <input
            type="range"
            id="price"
            name="price"
            min="0"
            max="100"
            className="w-full"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
