import { useState } from "react";
import { Search, ChevronLeft, ChevronRight} from "lucide-react";

export default function Table({ columns, data, title, action }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fonction de filtrage avec vérifications
  const filteredData = (data || []).filter((row) =>
    Object.values(row || {}).some((value) =>
      value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Gestionnaires de pagination
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Fonction pour rendre l'action avec la ligne
  const renderAction = (row) => {
    if (typeof action === 'function') {
      return action(row);
    }
    return action;
  };

  return (
    <div className="w-full max-w-[100vw] bg-white shadow-md rounded-lg overflow-hidden">
      {/* En-tête avec titre et recherche */}
      <div className="p-4 sm:p-6 bg-white border-b border-gray-200 sticky top-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {title && (
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {title}
            </h2>
          )}

          {/* Barre de recherche */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Réinitialisation de la page à 1 lors de la recherche
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Conteneur principal avec scroll horizontal */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-[#0a2342] text-white">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                {action && (
                  <th className="px-3 py-2 text-center sm:px-6 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-wider">
                    action
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-3 py-2 sm:px-6 sm:py-4 whitespace-normal text-xs sm:text-sm text-gray-900"
                    >
                      {row[column.accessorKey]}
                    </td>
                  ))}
                  {action && (
                    <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-normal text-xs sm:text-sm text-gray-900">
                      {renderAction(row)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Message si aucune donnée ou aucun résultat de recherche */}
          {/* Message si aucune donnée ou aucun résultat de recherche */}
          {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "Aucun résultat trouvé pour votre recherche"
                : "Aucune donnée disponible"}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <div className="px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
