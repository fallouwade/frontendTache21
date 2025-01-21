// import { LuUsers } from "react-icons/lu";

const Card = ({ totalUsers = 0, icone, titre, titrePourcent, pourcent, color }) => {
  return (
    <div className="w-full">
      <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-5 lg:p-6 ${color}`}>
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
        
        <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm">
          <div className="flex items-center text-green-600">
            <svg 
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span className="font-medium">{pourcent}%</span>
          </div>
          <span className="text-gray-600 ml-2">{titrePourcent}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;