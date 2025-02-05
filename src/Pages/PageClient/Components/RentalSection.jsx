import React from "react";
import RentalCard from "./RentalCard";

function RentalSection({ 
  services, 
  servicesPerPage, 
  totalServices, 
  paginate, 
  currentPage, 
  isLoading, 
  error, 
  noResults ,
  id
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalServices / servicesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (isLoading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-gray-600">Chargement des services...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (noResults) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <p className="text-center text-gray-600">Aucun service ne correspond à votre recherche. Veuillez essayer avec d'autres critères.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Services disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <RentalCard key={service.id} {...service} identifiant={id}/>
          ))}
        </div>
        {totalServices > servicesPerPage && (
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex">
                {pageNumbers.map((number) => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-4 py-2 border ${
                        currentPage === number
                          ? "bg-primary-600 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
}

export default RentalSection;