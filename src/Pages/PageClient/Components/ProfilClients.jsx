"use client"

import { useState, useEffect } from "react"
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
  // États pour gérer le scroll et l'affichage des favoris
  const [isScrolled, setIsScrolled] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  // Effet pour gérer le changement de style lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Gestionnaire pour le clic sur les favoris
  const handleFavoriteClick = () => {
    setShowFavorites(!showFavorites)
    onToggleFavoriteFilter(!showFavorites)
  }

  return (
    <>
      {/* Barre de navigation fixe */}
      <nav
        className={`fixed w-full z-50 bg-white transition-all duration-200 ${
          isScrolled ? "shadow-md py-1" : "py-0"
        }`}
      >
        <div className="max-w-[2520px] mx-auto xl:px-10 md:px-10 sm:px-4 px-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-rose-500 lg:text-2xl md:text-sm font-extrabold">
              <img src={logo || "/placeholder.svg"} alt="Logo" width="120" height="50" />
            </a>

            {/* Section droite de la navigation */}
            <div className="flex items-center gap-6">
              {/* Bouton prestataire */}
              <div className="">{buttonPrest}</div>

              {/* Éléments visibles uniquement pour les utilisateurs connectés */}
              {isLoggedIn && (
                <>
                  {/* Bouton Favoris - visible uniquement sur desktop */}
                  <div className="hidden md:flex items-center">
                    <FavoriteButton
                      favorites={favorites}
                      onToggleFavorite={handleFavoriteClick}
                      showFavorites={showFavorites}
                    />
                  </div>

                  {/* Bouton Messages - visible uniquement sur desktop */}
                  <div className="hidden md:block">
                    <MessageButton unreadMessages={unreadMessages} />
                  </div>
                </>
              )}

              {/* Menu utilisateur (Sidebar) */}
              <div className="relative">
                <SidebarClient 
                  isLoggedIn={isLoggedIn} 
                  userName={userName} 
                  userEmail={userEmail}
                  favorites={favorites}
                  onToggleFavorite={handleFavoriteClick}
                  showFavorites={showFavorites}
                  unreadMessages={unreadMessages}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Espacement pour compenser la barre de navigation fixe */}
      <div className="pb-16" />
    </>
  )
}

export default ProfilClients
