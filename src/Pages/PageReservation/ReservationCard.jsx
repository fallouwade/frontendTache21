import { useState, useEffect } from 'react';
import { FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ReservationCard = ({ selectedDate, id, service }) => {
  const [reservation, setReservation] = useState({
    service: null, // On stocke un objet au lieu d'un string
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

  const handleServiceChange = (e) => {
    const selectedService = service.services.find(servicess => servicess.categorie === e.target.value);
    setReservation(prev => ({ ...prev, service: selectedService }));
  };

  const handleDetailsChange = (e) => {
    setReservation(prev => ({ ...prev, details: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value.replace(/\D/g, '').slice(0, 9);
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
      const demandeService = {
        typeService: reservation.service?.categorie,  // Correction ici
        adresse: reservation.adresse,
        numeroTelephone: reservation.phone,
        description: reservation.details,
        date: new Date(reservation.date).toISOString(),
        prestataire: id
      };

      const token = localStorage.getItem('token');
      await axios.post(
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
        service: null,
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
              >
                <option value="">Sélectionner un service</option>
                {service.services?.length > 0 ? (
                  service.services.map((servicess, index) => (
                    <option key={index} value={servicess.categorie}>
                      {servicess.categorie}
                    </option>
                  ))
                ) : (
                  <option value="">Aucun service ajouté pour le moment</option>
                )}
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
              maxLength="9"
            />
          </div>

          <div className="p-3 border-t">
            <div className="text-xs text-gray-500">DÉTAILS DU PROBLÈME</div>
            <textarea
              className="w-full p-2 border rounded mt-2"
              rows="4"
              placeholder="Décrivez précisément votre problème"
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
