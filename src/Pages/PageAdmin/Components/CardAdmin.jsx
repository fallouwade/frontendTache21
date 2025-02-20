
const CardAdmin = ({ totalUsers = 0, icone, titre,  color }) => {
  return (
    <div className="w-full">
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 ${color}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-1 sm:space-y-2">
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              {titre}
            </p>
            <h3 className="text-xl sm:text-xl lg:text-2xl font-bold text-gray-900">
              {totalUsers.toLocaleString()}
            </h3>
          </div>
          <div className="p-2 sm:p-3 bg-blue-50 rounded-full flex-shrink-0">
            {icone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdmin;