import { FaEnvelope } from "react-icons/fa"
import { Link } from "react-router-dom"

function MessageButton({ unreadMessages }) {
  return (
    <div className="relative inline-block group">
      <Link to="/Client/messages" className="relative">
        <button
          className="p-2 bg-white rounded-full transition-all duration-300 shadow-md hover:bg-gray-100"
          aria-label="Messages"
        >
          <FaEnvelope className="h-6 w-6 text-blue-500" />
        </button>
        {unreadMessages > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadMessages}
          </span>
        )}
      </Link>

      {/* Tooltip */}
      <div className="absolute invisible group-hover:visible bg-gray-800 text-white text-sm py-1 px-2 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        Mes demandes
      </div>
    </div>
  )
}

export default MessageButton