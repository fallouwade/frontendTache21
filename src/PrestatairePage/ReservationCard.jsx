import React, { useState } from 'react';
import { 
  FaRegCalendarAlt, 
  FaRegClock, 
  FaWrench,
  FaWhatsapp 
} from 'react-icons/fa';

const ReservationCard = () => {
  const [step, setStep] = useState(1);
  const [reservation, setReservation] = useState({
    service: '',
    date: null,
    time: '',
    details: ''
  });

  // Types d'interventions disponibles
  const services = [
    { id: 1, name: "Fuite d'eau", price: 60000 },
    { id: 2, name: "WC bouché", price: 45000 },
    { id: 3, name: "Chauffe-eau", price: 75000 },
    { id: 4, name: "Robinetterie", price: 35000 },
    { id: 5, name: "Installation neuve", price: 100000 }
  ];

  const handleServiceChange = (e) => {
    const service = services.find(s => s.id === parseInt(e.target.value));
    setReservation({ ...reservation, service });
    setStep(2);
  };

  const handleSubmit = async () => {
    try {
      // Logique d'envoi de la réservation à implémenter
      console.log('Réservation:', reservation);
      alert('Votre demande a été envoyée au prestataire');
    } catch (error) {
      alert('Une erreur est survenue');
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-lg h-fit bg-white sticky top-4">
      <div className="space-y-4">
        <div>
          <span className="text-2xl font-semibold">60.000 FCFA</span>
          <span className="text-gray-600"> /intervention</span>
        </div>

        <div className="border rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 border-b">
            <div className="p-3 border-b sm:border-r sm:border-b-0">
              <div className="text-xs text-gray-500">DISPONIBLE</div>
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="w-4 h-4 text-gray-500" />
                <span>Aujourd'hui</span>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs text-gray-500">HORAIRES</div>
              <div className="flex items-center gap-2">
                <FaRegClock className="w-4 h-4 text-gray-500" />
                <span>8h - 20h</span>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="text-xs text-gray-500">TYPE D'INTERVENTION</div>
            <div className="flex items-center gap-2 mt-1">
              <FaWrench className="w-4 h-4 text-gray-500" />
              <select 
                className="w-full p-2 border rounded"
                onChange={handleServiceChange}
                value={reservation.service?.id || ''}
              >
                <option value="">Sélectionner un service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price.toLocaleString()} FCFA
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {step >= 2 && (
          <button 
            onClick={handleSubmit}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700"
          >
            Demander une intervention
          </button>
        )}

        <p className="text-center text-sm text-gray-500">
          Devis gratuit • Déplacement inclus dans Dakar
        </p>

        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between">
            <span>Tarif diagnostic</span>
            <span>60.000 FCFA</span>
          </div>
          <div className="flex justify-between">
            <span>Déplacement Dakar</span>
            <span>Offert</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Total estimé</span>
            <span>{reservation.service?.price?.toLocaleString() || '60.000'} FCFA</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Contacter via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;