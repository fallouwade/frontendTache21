// Reservation.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsPrestataire from "./DetailsPrestataire";
import GalleryPrestatiare from "./GallerryPrestataire";
import ProfilClients from "../PageClient/Components/ProfilClients";
import { Link } from "react-router-dom";


const Reservation = (props) => {
  const { id } = useParams();
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPrestataire, setIsPrestataire] = useState(false)

 

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      setIsPrestataire(user.role === "prestataire")

    } catch (err) {
      console.error(err)
    }
  }, [])

  const user = JSON.parse(localStorage.getItem("user"))
  console.log(props.id)
  useEffect(() => {
    const fetchPrestataire = async () => {
      try {
        const response = await fetch(`https://backendtache21.onrender.com/api/prestataires/complets/${props.id}`);
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

    if (props.id) { 
      fetchPrestataire();
    }
  }, [props.id]);


  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!prestataire) return <div>Prestataire introuvable</div>;

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
                  Retour à mon compte
                </Link>
              ) : (
                <Link
                  to="/inscriptionPrestataire"
                  className="bg-gray-200 text-[12px] md:text-base hover:bg-gray-300 font-normal py-2 sm:px-4 rounded"
                >
                  Devenir Prestataire
                </Link>
              )
            }
          />
        )}
      </div>
      <div>
      </div>
      <div className="flex-grow pt-10">
        {/* On passe la liste d'images du prestataire au composant galerie */}
        <GalleryPrestatiare prestataire={prestataire} />
        {/* On transmet les informations du prestataire au composant de détails */}
        <DetailsPrestataire prestataire={prestataire} />
      </div>
    </div>
  );
};

export default Reservation;

