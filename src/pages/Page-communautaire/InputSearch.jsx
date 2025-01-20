import { FiSearch } from "react-icons/fi";

export default function InputSearch() {
  return (
    <div className="flex justify-center items-center mb-6 bg-gray-50">
      <div className="w-full max-w-md px-6 py-8 rounded-lg">
        <div className="relative">
          <input
            id="search"
            type="text"
            placeholder="Recherche..."
            className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 text-lg transition-all duration-300 ease-in-out"
          />
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 hover:text-green-700 transition-colors duration-300 ease-in-out">
            <FiSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
