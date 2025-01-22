"use client"

import  { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash/debounce';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setIsSearching(true);
      onSearch(term);
      setIsSearching(false);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Rechercher un service ou un professionnel..."
          className="w-full h-10 sm:h-12 md:h-14 pl-4 sm:pl-5 md:pl-6 pr-12 sm:pr-14 md:pr-16 text-sm sm:text-base md:text-lg text-gray-600 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
        />
        <button 
          type="submit"
          className={`absolute right-1 sm:right-1.5 md:right-2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-200 ${
            isSearching ? 'opacity-70' : ''
          }`}
          disabled={isSearching}
          aria-label="Rechercher"
        >
          <FaSearch className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;