"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Slider from "react-slick"
import { Star, Quote } from "lucide-react"

// Importer les styles slick-carousel
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Temoignages = () => {
  const [temoignages, setTemoignages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTemoignages = async () => {
      try {
        const response = await axios.get("https://backendtache21.onrender.com/api/commentaires/AllCommentaire")
        setTemoignages(response.data)
        setLoading(false)
      } catch (err) {
        setError("Erreur lors de la récupération des témoignages")
        setLoading(false)
      }
    }

    fetchTemoignages()
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    adaptiveHeight: false,
  }

  if (loading) return <div className="text-center py-16 text-xl text-gray-600">Chargement des témoignages...</div>
  if (error) return <div className="text-center py-16 text-xl text-red-500">{error}</div>

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Ce que disent nos clients</h2>
        <Slider {...settings}>
          {temoignages.map((temoignage) => (
            <div key={temoignage._id} className="px-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="p-8 h-64 flex flex-col justify-between">
                  <div>
                    <Quote className="h-8 w-8 text-indigo-400 mb-4" />
                    <p className="text-gray-600 text-lg leading-relaxed mb-4 line-clamp-3">
                      {temoignage.commentaire || "Ce client a apprécié nos services."}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full bg-indigo-100"
                          src={`https://ui-avatars.com/api/?name=${temoignage.commentaireUser || "Client"}&background=random`}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {temoignage.  commentaireUser || "Client satisfait"}
                        </p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < (temoignage.note || 5) ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{new Date(temoignage.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Temoignages

