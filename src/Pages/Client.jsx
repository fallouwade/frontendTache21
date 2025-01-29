import LayoutClients from "./PageClient/layout/LayoutClients";
import ClientContent from "./PageClient/Components/ClientContent";
import { Outlet, useLocation } from "react-router-dom";
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
      {location.pathname === "/client" ? (
                <ClientContent />
            ) : (
                <Outlet />
            )}
    </LayoutClients>
  );
}

export default Client;