

import  { useState } from 'react';
import RatingBadge from './RatingBadge';
import Stats from './Stats';
// import ReservationCard from './ReservationCard';
import Calendar from './Calendar';
import ReservationCard from './ReservationCard';

const DetailsPrestataire = () => {
  // Ajouter un état pour la date sélectionnée
  const [selectedDate, setSelectedDate] = useState(null);

  // Gérer la sélection de la date
  const handleDateSelect = (date) => {
    setSelectedDate(date);  
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="space-y-4 mb-6">
        <h1 className="text-2xl font-semibold">Service {} d'urgence 24h/24 - Dakar et environs</h1>
        <div className="flex items-center gap-2 text-sm">
          <span>Intervention express</span>
          <span>•</span>
          <span>Intervention 7j/7</span>
          <span>•</span>
          <span>Devis gratuit </span>
        </div>
      </div>
   
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <RatingBadge />
          <Calendar onDateSelect={handleDateSelect} />
          <Stats />
        </div>

        <ReservationCard selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default DetailsPrestataire;