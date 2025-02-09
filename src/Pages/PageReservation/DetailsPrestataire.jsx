

import  { useState } from 'react';
import Stats from './Comment';
// import ReservationCard from './ReservationCard';
import Calendar from './Calendar';
import ReservationCard from './ReservationCard';

const DetailsPrestataire = (props) => {
  // Ajouter un état pour la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(null);

  // Gérer la sélection de la date
  const handleDateSelect = (date) => {
    setSelectedDate(date);  
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
   
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
        <div>
                <h2 className="text-xl font-medium">Disponibilités du prestataire</h2>

        </div>
          {/* <RatingBadge /> */}
          <Calendar onDateSelect={handleDateSelect} />
          <Stats />
        </div>

        <ReservationCard selectedDate={selectedDate} id={props.prestataire.id} />
      </div>
    </div>
  );
};

export default DetailsPrestataire;