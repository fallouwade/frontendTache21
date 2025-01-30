import LayoutClients from "./PageClient/layout/LayoutClients";
import { Outlet, useLocation } from "react-router-dom";
import ServiceGrid from "./PageClient/Components/ServiceGrid";
import { useState } from "react";

function Client() {
   const location = useLocation();
    const [filters, setFilters] = useState({
      showFilters: false,
      category: "",
      locality: "",
      sortBy: "popular",
      currentPage: 1,
      searchQuery: "",
      showFavorites: false,
    });

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <LayoutClients handleFilterChange={handleFilterChange}>


{location.pathname === "/Client" ? (
        <ServiceGrid 
          {...filters} 
          setCurrentPage={(page) => handleFilterChange("currentPage", page)} 
        />
      ) : (
        <Outlet />
      )}

    </LayoutClients>
  );
}

export default Client;