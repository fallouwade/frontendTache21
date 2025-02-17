import { useState, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({ selectedDate, id }) => {
  const [reservation, setReservation] = useState({
    service: '',
    date: selectedDate || null,
    details: '',
    phone: '',
    adresse: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDate) {
      setReservation(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const savedReservation = JSON.parse(localStorage.getItem('reservationData'));
    if (savedReservation) {
      setReservation(savedReservation);
    }
  }, []);

  const services = [
    { id: 1, name: "Fuite d'eau" },
    { id: 2, name: "WC bouché" },
    { id: 3, name: "Chauffe-eau" },
    { id: 4, name: "Robinetterie" },
    { id: 5, name: "Installation neuve" }
  ];

  const handleServiceChange = (e) => {
    const selectedService = services.find(s => s.id === parseInt(e.target.value, 10));
    setReservation(prev => ({ ...prev, service: selectedService }));
  };

  const handleDetailsChange = (e) => {
    setReservation(prev => ({ ...prev, details: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setReservation(prev => ({ ...prev, phone: phoneValue }));
  };

  const handleAdresseChange = (e) => {
    setReservation(prev => ({ ...prev, adresse: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!/^(70|76|77|78|75)\d{7}$/.test(reservation.phone)) {
        toast.error('Veuillez entrer un numéro de téléphone valide au Sénégal');
        return;
    }

    try {
        console.log('Réservation:', reservation);
        console.log('ID du prestataire:', id);

        const demandeService = {
            typeService: reservation.service.name,
            adresse: reservation.adresse,
            numeroTelephone: reservation.phone,
            description: reservation.details,
            date: new Date(reservation.date).toISOString(),
            prestataire: id
        };

        const token = localStorage.getItem('token');
        const response = await axios.post(
            'https://backendtache21.onrender.com/api/demandes-services/demande',
            demandeService,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        toast.success('Votre demande a été envoyée au prestataire');

        setReservation({
            service: '',
            date: '',
            details: '',
            phone: '',
            adresse: ''
        });

        localStorage.removeItem('reservationData');
    } catch (error) {
        console.error('Erreur lors de l’envoi de la demande : ', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Une erreur est survenue lors de l’envoi de la demande');
    }
};

  

  const handleConnectAndSave = () => {
    localStorage.setItem('reservationData', JSON.stringify(reservation));
    navigate('/connexion');
  };

  setTimeout(() => {
    localStorage.removeItem("reservationData");
    console.log("Les données ont été supprimées du localStorage.");
}, 150000);

  return (
    <div className="border rounded-xl p-6 shadow-lg h-fit bg-white sticky top-4">
      <div className="space-y-4">
        <div className="border rounded-lg">
          <div className="p-3">
            <div className="text-xs text-gray-500">TYPE D'INTERVENTION</div>
            <div className="flex flex-col items-center gap-2 mt-1">
              <select
                className="w-full p-2 border rounded"
                onChange={handleServiceChange}
                value={reservation.service?.id || ''}
              >
                <option value="">Sélectionner un service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 border-t">
            <div className="text-xs text-gray-500">ADRESSE</div>
            <input
              type="text"
              placeholder="Votre adresse complète"
              className="w-full p-2 border rounded mt-2"
              onChange={handleAdresseChange}
              value={reservation.adresse}
            />
          </div>

          <div className="p-3 border-t">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <FaPhone className="w-4 h-4 text-gray-500" />
              VOTRE NUMÉRO DE TÉLÉPHONE
            </div>
            <input
              type="tel"
              className="w-full p-2 border rounded mt-2"
              placeholder="Exemple : 77 123 45 67"
              value={reservation.phone}
              onChange={handlePhoneChange}
              maxLength="10"
            />
          </div>

          <div className="p-3 border-t">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              DÉTAILS DU PROBLÈME
            </div>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="4"
              placeholder="Décrivez précisément votre problème (localisation, symptômes, etc.)"
              value={reservation.details}
              onChange={handleDetailsChange}
            />
          </div>

          {reservation.date && (
            <div className="p-3 border-t">
              <div className="text-gray-600">
                <span className="font-semibold">Date sélectionnée:</span> {new Date(reservation.date).toLocaleDateString('fr-FR')}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => (isAuthenticated ? handleSubmit() : handleConnectAndSave())}
          className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700"
          disabled={!reservation.service || !reservation.phone || !reservation.adresse || !reservation.details}
        >
          {isAuthenticated ? 'Demander une intervention' : 'Vous devez vous connecter pour réserver'}
        </button>

        <p className="text-center text-sm text-gray-500">
          Devis gratuit • Déplacement inclus dans Dakar
        </p>

        <div className="pt-2 text-center bg-gray-50 p-3 rounded-lg">
          <div className="flex justify-center items-center gap-3">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs mt-1">Sécurisé</span>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs mt-1">Rapide</span>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1 2 1M4 7l2 1m0 0l2 1M4 7v2.5M12 21l-2-1m0 0l-2 1m2-1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <span className="text-xs mt-1">Transparent</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Vos informations sont protégées
          </p>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        style={{
          marginTop: '70px', 
          zIndex: 9999
        }}
      />
    </div>
  );
};

export default ReservationCard;