
// import DetailsPrestataire from './DetailsPrestataire';
// import GalleryPrestatiare from './GalleryPrestataire';

import DetailsPrestataire from "./DetailsPrestataire";
import GalleryPrestatiare from "./GallerryPrestataire";


const Reservation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <GalleryPrestatiare />
        <DetailsPrestataire />
      </div>
    </div>
  );
};

export default Reservation;
