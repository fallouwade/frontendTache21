import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function ServiceGrid({ onSearch }) {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(service, location);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:flex-row md:gap-8 md:items-end">
        <div className="flex-1">
          <label htmlFor="service" className="block mb-2 text-sm font-semibold text-gray-800">
            Service
          </label>
          <input
            type="text"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-3 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-none active:ring-none"
            placeholder="Quel service recherchez-vous ?"
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="location" className="block mb-2 text-sm font-semibold text-gray-800">
            Localisation
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full p-3 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-none active:ring-none"
            placeholder="Entrez votre ville"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-6 py-3 transition-all duration-300 transform hover:scale-105 active:ring-none inline-flex items-center justify-center"
        >
          <FaSearch className="w-5 h-5 mr-2" />
          Rechercher
        </button>
      </form>
    </div>
  );
}

export default ServiceGrid;