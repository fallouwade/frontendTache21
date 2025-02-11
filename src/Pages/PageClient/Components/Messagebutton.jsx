import { FaEnvelope } from "react-icons/fa"
import { Link } from "react-router-dom"

function MessageButton({ unreadMessages }) {
  return (
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
  )
}

export default MessageButton

