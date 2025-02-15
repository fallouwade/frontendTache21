import React, { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaTools,
  FaHandshake,
  FaStar,
  FaTimes
} from 'react-icons/fa';
import logo from "/images/logofooterblanc.png";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden relative">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="overflow-y-auto max-h-[60vh] pr-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [modalState, setModalState] = useState({
    conditions: false,
    privacy: false,
    help: false
  });

  const openModal = (modal) => {
    setModalState({ ...modalState, [modal]: true });
  };

  const closeModal = (modal) => {
    setModalState({ ...modalState, [modal]: false });
  };

  return (
    <footer className="bg-[#000000] text-white w-full">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section À propos */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="lg:-mt-10 mb-6 lg:mb-4">
              <img
                src={logo}
                alt="Logo"
                width="160"
                className="h-auto"
              />
            </div>
            <p className="text-gray-200 text-center lg:text-left">
              La première plateforme sénégalaise de mise en relation entre professionnels qualifiés et clients. Service rapide, fiable et professionnel.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Section Pour les Clients */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-300 font-bold mb-4 text-lg">Pour les Clients</h3>
            <ul className="space-y-3 w-full">
              <li className="flex justify-center lg:justify-start">
                <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
                  <FaUser className="text-blue-300" /> Comment ça marche
                </a>
              </li>
              <li className="flex justify-center lg:justify-start">
                <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
                  <FaTools className="text-blue-300" /> Trouver un prestataire
                </a>
              </li>
              <li className="flex justify-center lg:justify-start">
                <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
                  <FaStar className="text-blue-300" /> Laisser un avis
                </a>
              </li>
              <li className="flex justify-center lg:justify-start">
                <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
                  <FaHandshake className="text-blue-300" /> Garantie satisfaction
                </a>
              </li>
            </ul>
          </div>

          {/* Section Pour les Professionnels */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-300 font-bold mb-4 text-lg">Pour les Professionnels</h3>
            <ul className="space-y-3 text-center lg:text-left w-full">
              <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Devenir partenaire</a></li>
              <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Tableau de bord pro</a></li>
              {/* <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Plateforme gratuite</a></li> */}
              <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Conseils pour prestataires</a></li>
              <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Centre d'aide Pro</a></li>
            </ul>
          </div>

          {/* Section Contact et Support */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-blue-300 font-bold mb-4 text-lg">Contact et Support</h3>
            <ul className="space-y-4 w-full">
              <li className="flex items-center justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-gray-200">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaPhone className="text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-gray-200">+221 77 123 45 67</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaEnvelope className="text-blue-300 mr-2 flex-shrink-0" />
                <span className="text-gray-200">contact@servicelocal.sn</span>
              </li>
              <li>
                <button
                  onClick={() => openModal('help')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full w-full transition-colors"
                >
                  Centre d'aide
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-blue-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
              <button
                onClick={() => openModal('conditions')}
                className="hover:text-blue-300 transition-colors"
              >
                Conditions d'utilisation
              </button>
              <span className="hidden md:inline">•</span>
              <button
                onClick={() => openModal('privacy')}
                className="hover:text-blue-300 transition-colors"
              >
                Politique de confidentialité
              </button>
              <span className="hidden md:inline">•</span>
              <button
                onClick={() => openModal('help')}
                className="hover:text-blue-300 transition-colors"
              >
                Aide
              </button>
            </div>
            <p className="text-gray-300 text-sm text-center md:text-right">
              © 2025 ServiceLocal. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>

      {/* Modales */}
      <Modal
        isOpen={modalState.conditions}
        onClose={() => closeModal('conditions')}
        title="Conditions d'utilisation"
      >
        <div className="text-gray-600 space-y-4">
          <h3 className="font-bold text-gray-900">1. Introduction</h3>
          <p>ServiceLocal est une plateforme de mise en relation entre professionnels et clients au Sénégal. En utilisant notre service, vous acceptez ces conditions.</p>

          <h3 className="font-bold text-gray-900">2. Utilisation du Service</h3>
          <p>Notre plateforme est gratuite pendant la phase de lancement. Vous devez être majeur et capable pour utiliser nos services.</p>

          <h3 className="font-bold text-gray-900">3. Responsabilités</h3>
          <p>ServiceLocal agit comme intermédiaire et n'est pas responsable de la qualité des services fournis par les prestataires.</p>
        </div>
      </Modal>

      <Modal
        isOpen={modalState.privacy}
        onClose={() => closeModal('privacy')}
        title="Politique de confidentialité"
      >
        <div className="text-gray-600 space-y-4">
          <h3 className="font-bold text-gray-900">Protection de vos données</h3>
          <p>Nous collectons et traitons vos données personnelles de manière sécurisée et conforme à la législation sénégalaise.</p>

          <h3 className="font-bold text-gray-900">Utilisation des données</h3>
          <p>Vos données sont utilisées uniquement pour faciliter la mise en relation avec les prestataires et améliorer nos services.</p>

          <h3 className="font-bold text-gray-900">Vos droits</h3>
          <p>Vous avez le droit d'accéder, modifier ou supprimer vos données personnelles à tout moment.</p>
        </div>
      </Modal>

      <Modal
        isOpen={modalState.help}
        onClose={() => closeModal('help')}
        title="Centre d'aide"
      >
        <div className="text-gray-600 space-y-4">
          <h3 className="font-bold text-gray-900">Comment ça marche ?</h3>
          <p>1. Créez votre compte<br />
            2. Recherchez un prestataire<br />
            3. Contactez le professionnel<br />
            4. Évaluez le service</p>

          <h3 className="font-bold text-gray-900">Besoin d'aide ?</h3>
          <p>Contactez-nous par :<br />
            - Téléphone : +221 77 123 45 67<br />
            - Email : contact@servicelocal.sn</p>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;
