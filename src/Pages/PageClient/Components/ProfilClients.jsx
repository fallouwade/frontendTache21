
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SidebarClient from "./SidebarClient"
import logo from "/images/logo.png"
import FavoriteButton from "./FavoriteButton"
import MessageButton from "./Messagebutton"

function ProfilClients({
  isLoggedIn,
  userName,
  userEmail,
  buttonPrest,
  unreadMessages,
  favorites = [],
  onToggleFavorite,
  onToggleFavoriteFilter,
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const navigate = useNavigate()
  
  // Récupération du token utilisateur
  const clientToken = sessionStorage.getItem("token") || localStorage.getItem("token")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites)
    onToggleFavoriteFilter(!showFavorites)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    if (clientToken) {
      navigate("/client") 
      window.location.reload()
    } else {
      navigate("/")
    }
  }
  return (
    <>
      <nav
        className={`fixed w-full z-50 bg-white transition-all duration-200 ${isScrolled ? "shadow-md py-1" : "py-0"}`}
      >
        <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-4 px-2">
          <div className="flex items-center justify-between">
            
            <a
              href={clientToken ? "#" : "/"}
              onClick={handleLogoClick}
              className="text-rose-500 lg:text-2xl md:text-sm font-extrabold"
            >
              <img src={logo || "/placeholder.svg"} alt="Logo" width="120" height="50" />
            </a>

            <div className="flex items-center gap-6">
              <div className="">{buttonPrest}</div>
              {isLoggedIn && (
                <>
                  <div className="flex items-center">
                    <FavoriteButton
                      favorites={favorites}
                      onToggleFavorite={handleFavoriteClick}
                      showFavorites={showFavorites}
                    />
                  </div>
                  <MessageButton unreadMessages={unreadMessages} />
                </>
              )}
              <div className="relative">
                <SidebarClient isLoggedIn={isLoggedIn} userName={userName} userEmail={userEmail} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="pb-16" />
    </>
  )
}

export default ProfilClients
