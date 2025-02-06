import { useState, useEffect } from 'react';
import { FaRegCalendarAlt, FaRegClock, FaWrench, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate

const ReservationCard = ({ selectedDate, id }) => {
  const [step, setStep] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [reservation, setReservation] = useState({
    service: '',
    date: selectedDate || null,
    details: '',
    phone: '',
    adresse: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Etat pour gérer l'authentification
  const navigate = useNavigate(); // Hook pour la navigation

  // Met à jour la date de réservation si selectedDate change
  useEffect(() => {
    if (selectedDate) {
      setReservation(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  // Vérifier si le token est présent dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Mise à jour de l'état en fonction de la présence du token

    // Si l'utilisateur revient après la connexion, récupérer les données de réservation
    const savedReservation = JSON.parse(localStorage.getItem('reservationData'));
    if (savedReservation) {
      setReservation(savedReservation);
      setShowDetails(true)
    }
  }, []);

  // Définition des services disponibles
  const services = [
    { id: 1, name: "Fuite d'eau", price: 60000 },
    { id: 2, name: "WC bouché", price: 45000 },
    { id: 3, name: "Chauffe-eau", price: 75000 },
    { id: 4, name: "Robinetterie", price: 35000 },
    { id: 5, name: "Installation neuve", price: 100000 }
  ];

  // Gestion du changement de service
  const handleServiceChange = (e) => {
    const selectedService = services.find(s => s.id === parseInt(e.target.value, 10));
    setReservation(prev => ({ ...prev, service: selectedService }));
    setStep(2);
    setShowDetails(true);
  };

  // Gestion du changement des détails
  const handleDetailsChange = (e) => {
    setReservation(prev => ({ ...prev, details: e.target.value }));
  };

  // Gestion du changement du numéro de téléphone
  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value.replace(/\D/g, '').slice(0, 10);
    setReservation(prev => ({ ...prev, phone: phoneValue }));
  };

  // Gestion du changement de l'adresse
  const handleAdresseChange = (e) => {
    setReservation(prev => ({ ...prev, adresse: e.target.value }));
  };

  // Envoi de la demande
  const handleSubmit = async () => {
    if (!/^(70|76|77|78|75)\d{7}$/.test(reservation.phone)) {
      toast.error('Veuillez entrer un numéro de téléphone valide au Sénégal');
      return;
    }

    try {
      console.log('Réservation:', reservation);
      console.log(id);
      const demandeService = {
        typeService: reservation.service.name,
        adresse: reservation.adresse,
        numeroTelephone: reservation.phone,
        description: reservation.details,
        date: new Date(reservation.date).toISOString(),
        prestataireId: id
      };

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/demandes-services/demande',
        demandeService,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast.success('Votre demande a été envoyée au prestataire');

      setReservation(
        {
          service: '',
          date: '',
          details: '',
          phone: '',
          adresse: ''
        }
      )

      localStorage.removeItem('reservationData');
    } catch (error) {
      console.error('Erreur lors de l’envoi de la demande : ', error);
      toast.error('Une erreur est survenue lors de l’envoi de la demande');
    }
  };

  const handleConnectAndSave = () => {
    // Sauvegarder les données de réservation dans le localStorage avant la redirection
    localStorage.setItem('reservationData', JSON.stringify(reservation));
    navigate('/connexion');
  };

  return (
    <div className="border rounded-xl p-6 shadow-lg h-fit bg-white sticky top-4">
      <div className="space-y-4">
        <div>
          <span className="text-2xl font-semibold">
            {reservation.service ? reservation.service.price.toLocaleString() : '0'} FCFA
          </span>
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
            <div className="flex flex-col items-center gap-2 mt-1">
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
              <input
                type="text"
                placeholder="Adresse"
                className="w-full p-2 border rounded"
                onChange={handleAdresseChange}
                value={reservation.adresse}
              />
            </div>
          </div>

          {showDetails && (
            <>
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

              <div className="p-3 border-t">
                {reservation.date && (
                  <div className="text-gray-600 mt-2">
 <span className="font-semibold">Date sélectionnée:</span> {new Date(reservation.date).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </div>
            </>
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
      <ToastContainer />
    </div>
  );
};

export default ReservationCard;
