
import DetailsPrestataire from './DetailsPrestataire';
import GalleryPrestatiare from './GalleryPrestataire';

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
