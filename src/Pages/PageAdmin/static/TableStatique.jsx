
export default function TableStatique({ headers, data, onBlockService }) {
  return (
    <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="px-6 py-4 text-sm text-gray-500">
                {cell}
              </td>
            ))}
            {/* Afficher le bouton "Bloqué" uniquement si l'onglet actuel est "Services" */}
            {onBlockService && (
              <td>
                <button
                  className="border border-red-600 hover:bg-red-600 text-red-600 hover:text-white py-2 px-4 rounded-lg
                              transition-all duration-200 transform active:scale-95"
                >
                  Bloqué
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
