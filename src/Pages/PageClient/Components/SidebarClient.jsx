import { useState } from "react";
import { FaChevronDown, FaInbox, FaHeart, FaTimes } from "react-icons/fa";

import { categories, region } from "../utils/Localities";

function DropdownSection({ title, children, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 sm:py-3 px-3 sm:px-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-sm">{title}</span>
        <FaChevronDown
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          } text-gray-500 w-3 h-3 sm:w-4 sm:h-4`}
        />
      </button>
      {isOpen && (
        <div className="px-3 sm:px-4 py-2 bg-white">{children}</div>
      )}
    </div>
  );
}

function Sidebar({
  category,
  setSelectedCategory,
  locality,
  setSelectedLocality,
  onClose,
  showFavorites,
  setShowFavorites,
  showFilters,
}) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    locality: false,
    price: false,
    rating: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`fixed md:sticky top-0 left-0 h-screen z-50 w-72 transition-transform duration-300 ease-in-out transform ${
        showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } bg-white border-r border-gray-200 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
        <h2 className="font-semibold text-base sm:text-lg text-gray-900">
          Filtres
        </h2>
        {showFilters && (
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer les filtres"
          >
            <FaTimes className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Messages & Favorites Buttons */}
        <div className="flex border-b border-gray-200">
          <button className="flex-1 flex items-center justify-center py-2 sm:py-3 px-2 hover:bg-gray-50 transition-colors text-gray-600 gap-1 sm:gap-2 text-xs sm:text-sm">
            <FaInbox className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Messages</span>
            <span className="bg-blue-500 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>
          <button
            className={`flex-1 flex items-center justify-center py-2 sm:py-3 px-2 hover:bg-gray-50 transition-colors ${
              showFavorites ? "bg-blue-50 text-blue-600" : "text-gray-600"
            } gap-1 sm:gap-2 text-xs sm:text-sm`}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <FaHeart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Favoris</span>
            <span className="bg-blue-500 text-white text-xs px-1 sm:px-1.5 py-0.5 rounded-full">
              5
            </span>
          </button>
        </div>

        {/* Dropdown Sections */}
        <div className="divide-y divide-gray-200">
          {/* Categories Section */}
          <DropdownSection
            title="Catégories"
            isOpen={openSections.categories}
            onToggle={() => toggleSection("categories")}
          >
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(cat.id === category ? "" : cat.id)
                  }
                  className={`flex items-center w-full p-1.5 sm:p-2 rounded-lg transition-colors text-xs sm:text-sm ${
                    cat.id === category
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <cat.icon className="mr-2 sm:mr-3 h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </DropdownSection>

          {/* Localities Section */}
          <DropdownSection
            title="Localité"
            isOpen={openSections.locality}
            onToggle={() => toggleSection("locality")}
          >
            <div className="space-y-1">
              {region.map((loc) => (
                <button
                  key={loc}
                  onClick={() =>
                    setSelectedLocality(loc === locality ? "" : loc)
                  }
                  className={`w-full p-1.5 sm:p-2 text-left rounded-lg transition-colors text-xs sm:text-sm ${
                    loc === locality
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </DropdownSection>

          {/* Price Section */}
          <DropdownSection
            title="Prix"
            isOpen={openSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="space-y-2">
              {["Moins de 20€", "20€ - 50€", "50€ - 100€", "Plus de 100€"].map(
                (price) => (
                  <label
                    key={price}
                    className="flex items-center space-x-2 text-xs sm:text-sm"
                  >
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 h-3 w-3 sm:h-4 sm:w-4"
                    />
                    <span>{price}</span>
                  </label>
                )
              )}
            </div>
          </DropdownSection>

          {/* Rating Section */}
          <DropdownSection
            title="Note minimum"
            isOpen={openSections.rating}
            onToggle={() => toggleSection("rating")}
          >
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2 text-xs sm:text-sm"
                >
                  <input
                    type="radio"
                    name="rating"
                    className="text-blue-600 h-3 w-3 sm:h-4 sm:w-4"
                  />
                  <span>{rating}★ et plus</span>
                </label>
              ))}
            </div>
          </DropdownSection>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
