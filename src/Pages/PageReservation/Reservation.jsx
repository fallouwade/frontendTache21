// Reservation.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsPrestataire from "./DetailsPrestataire";
import GalleryPrestatiare from "./GallerryPrestataire"; // Vérifie bien le nom du fichier

const Reservation = (props) => {
  const { id } = useParams();
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
  
    if (props.id) { // Assurez-vous que props.id est défini
      fetchPrestataire();
    }
  }, [props.id]);
  

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!prestataire) return <div>Prestataire introuvable</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {/* On passe la liste d'images du prestataire au composant galerie */}
        <GalleryPrestatiare prestataire={prestataire} />
        {/* On transmet les informations du prestataire au composant de détails */}
        <DetailsPrestataire prestataire={prestataire} />
      </div>
    </div>
  );
};

export default Reservation;
