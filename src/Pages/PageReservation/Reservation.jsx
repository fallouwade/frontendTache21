import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsPrestataire from "./DetailsPrestataire";
import GalleryPrestatiare from "./GallerryPrestataire";
import ProfilClients from "../PageClient/Components/ProfilClients";
import { Link } from "react-router-dom";
import * as motion from "motion/react-client";
import logo from "/images/logo.png"
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft
} from "react-icons/fa"


const Reservation = () => {
  const { id } = useParams();
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrestataire, setIsPrestataire] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setIsPrestataire(user.role === "prestataire");
    } catch (err) {
      console.error(err);
    }
  }, []);

  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate();

  console.log(id)
  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const response = await fetch(
          `https://backendtache21.onrender.com/api/prestataires/complets/${id}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors du chargement du prestataire");
        }
        const data = await response.json();
        setPrestataire(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) { // Vérifie que l'ID est bien défini avant de lancer la requête
      fetchPrestataire();
    }
  }, [id]);


  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
        >
          <img src={logo} alt="Chargement..." className=" h-24" />
        </motion.div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!prestataire)
    return <div className="text-center mt-10">Prestataire introuvable</div>;

  return (
    <div className="min-h-screen flex flex-col">

      <div>
        {/* Vérification si l'utilisateur est connecté */}
        {!user ? (
          <ProfilClients
            buttonPrest={
              <Link
                to="/inscriptionPrestataire"
                className="hover:bg-gray-300 py-2 px-5 rounded-full transition text-sm font-medium cursor-pointer"
              >
                Devenir Prestataire
              </Link>
            }
          />
        ) : (
          <ProfilClients
            isLoggedIn={true}
            userName={user.nom}
            userEmail={user.email}
            buttonPrest={
              isPrestataire ? (
                <Link
                  to="/dashboard"
                  className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded"
                >
                  Mon compte
                </Link>
              ) : (
                <Link
                  to="/inscriptionPrestataire"
                  className="bg-gray-100 text-[12px] md:text-base hover:bg-gray-300 text-gray-700 font-normal py-2 sm:px-4 rounded"
                >
                  Devenir Prestataire
                </Link>
              )
            }
          />
        )}
      </div>
     
      <div className="px-3">
      <div className="w-full bg-white text-gray flex items-center mt-10 justify-between">
        <button
          onClick={() => navigate(-1)} // Naviguer vers la page précédent
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700  transition-all duration-300 transform hover:scale-105   flex items-center justify-center"
        >
          <FaArrowLeft />
        </button>
      </div>
      </div>
      <div className="flex-grow  md:px-5 px-0 ">
        {/* On passe la liste d'images du prestataire au composant galerie */}
        <GalleryPrestatiare prestataire={prestataire} />
        {/* On transmet les informations du prestataire au composant de détails */}
        <DetailsPrestataire prestataire={prestataire} />
      </div>
    </div>
  );
};

export default Reservation;
//
