"use client"

import { useState, useEffect } from "react";
import SidebarClient from "./SidebarClient";
import logo from "/images/logo.png"

function ProfilClients({ isLoggedIn, userName, userEmail, buttonPrest, unreadMessages }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
   
    <>
      <nav className={`fixed w-full z-50 bg-white transition-all  duration-200 ${
        isScrolled ? 'shadow-md py-1' : 'py-0'
      }`}>
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-4 px-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="text-rose-500 text-2xl font-extrabold">
            <img src={logo} alt="Logo" width="120" height="50" />

            </a>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-6">
              <div className="hover:bg-gray-100 py-2 px-5 rounded-full transition text-sm font-medium cursor-pointer">
                {buttonPrest}
              </div>
              
              <div className="relative">
                <SidebarClient 
                  isLoggedIn={isLoggedIn} 
                  userName={userName} 
                  userEmail={userEmail} 
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer avec hauteur fixe */}
      <div className="pb-16"/>
    </>
  );
}

export default ProfilClients

