
import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaChevronUp,
  FaTimes,
  FaWhatsapp
} from "react-icons/fa";
import logo from "/images/logofooterblanc.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);

  // États pour les modales
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showClientSignupModal, setShowClientSignupModal] = useState(false);
  const [showProviderSignupModal, setShowProviderSignupModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showTermsModal || showClientSignupModal || showProviderSignupModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showTermsModal, showClientSignupModal, showProviderSignupModal]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessageType("error");
      setMessage("Veuillez entrer un email valide.");
      setTimeout(() => setMessage(""), 3000); // Message disparait après 3 secondes
      return;
    }

    try {
      const response = await fetch("https://backendtache21.onrender.com/api/newsletter/inscrire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Inscription réussie !");
        setEmail("");
        setTimeout(() => setMessage(""), 3000); // Message disparait après 3 secondes
      } else {
        setMessageType("error");
        setMessage(data.message || "Erreur lors de l'inscription.");
        setTimeout(() => setMessage(""), 3000); // Message disparait après 3 secondes
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Problème de connexion au serveur.");
      setTimeout(() => setMessage(""), 3000); // Message disparait après 3 secondes
    }
  };


  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-gray-900 text-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-yellow-500">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Fermer"
            >
              <FaTimes />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-[#000000] text-white w-full relative">
      <div className="container mx-auto px-4 py-4 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex justify-center lg:justify-start mb-0 lg:-mt-11">
              <div className="text-2xl font-extrabold transition-transform duration-300 hover:scale-105 cursor-pointer">
                <img src={logo} alt="Logo" width="160" className="h-auto drop-shadow-lg" />
              </div>

            </div>
            <p className="text-gray-400 text-center lg:text-left mt-2">
              Trouvez les meilleurs professionnels près de chez vous. Plombiers, électriciens, mécaniciens, coiffeurs, enseignants privés et bien plus encore.
            </p>
          </div>

          <div className="text-center lg:text-left lg:ml-11">
            <h3 className="text-yellow-500 font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Plomberie</li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Électricité</li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Coiffure</li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Enseignants Privés</li>
              <li className="text-gray-400 hover:text-white transition-colors cursor-pointer">Mécaniciens...</li>

            </ul>
          </div>


          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaPhone className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">+221 76 408 93 12</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaEnvelope className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">gningngone50@gmail.com</span>
              </li>
            </ul>

            {/* Boutons alignés */}
            <div className="mt-4 flex flex-col space-y-3 lg:items-start items-center">
              <a href="https://wa.me/221764089312" target="_blank" rel="noopener noreferrer"
                className="flex items-center text-gray-300 transition-all cursor-pointer hover:text-gray-400">
                <FaWhatsapp className="mr-2 text-yellow-500 text-lg" /> Contactez-nous sur WhatsApp
              </a>
            </div>
          </div>



          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Restez informé de nos dernières actualités</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-l w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-800 appearance-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-yellow-500 p-2 rounded-r hover:bg-yellow-600 transition-colors focus:outline-none"
                >
                  <FaPaperPlane className="text-gray-900" />
                </button>
              </div>

              {message && (
                <p className={`text-sm ${messageType === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-2 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center justify-center md:justify-start space-x-4">
              <p className="text-gray-400">© 2025 Jokkale. Tous droits réservés.</p>
              <button onClick={() => setShowTermsModal(true)} className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                Conditions d'utilisation
              </button>
              <button onClick={() => setShowClientSignupModal(true)} className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                S'inscrire en tant que client
              </button>
              <button onClick={() => setShowProviderSignupModal(true)} className="text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer">
                S'inscrire en tant que prestataire
              </button>
            </div>

            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaYoutube /></a>
              {showScrollButton && (
                <button
                  onClick={scrollToTop}
                  className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 absolute md:relative right-4 md:right-0 bottom-4 md:bottom-0"
                  aria-label="Retour en haut"
                >
                  <FaChevronUp className="text-gray-900" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Conditions d'utilisation"
      >
        <div className="space-y-4">
          <h4 className="font-bold text-lg">1. Acceptation des conditions</h4>
          <p className="text-gray-300">
            En utilisant notre plateforme, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>

          <h4 className="font-bold text-lg">2. Description du service</h4>
          <p className="text-gray-300">
            Jokkale est une plateforme de mise en relation entre des clients et des prestataires de services locaux. Nous ne sommes pas responsables de la qualité des services rendus par les prestataires.
          </p>

          <h4 className="font-bold text-lg">3. Comptes utilisateurs</h4>
          <p className="text-gray-300">
            Vous êtes responsable de maintenir la confidentialité de votre compte et mot de passe. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée.
          </p>

          <h4 className="font-bold text-lg">4. Utilisation du service</h4>
          <p className="text-gray-300">
            Le service est actuellement en phase d'essai gratuit. Aucun frais n'est appliqué pour l'utilisation de la plateforme.
          </p>

          <h4 className="font-bold text-lg">5. Résiliation</h4>
          <p className="text-gray-300">
            Nous nous réservons le droit de bloquer votre compte à tout moment en cas de violation des présentes conditions.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={showClientSignupModal}
        onClose={() => setShowClientSignupModal(false)}
        title="S'inscrire en tant que client"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Pour vous inscrire en tant que client et profiter de nos services, suivez ces étapes simples:
          </p>

          <ol className="space-y-2 text-gray-300 list-decimal pl-5">
            <li>Cliquez sur "l'icone" en haut à droite de la page d'accueil</li>
            <li>Sélectionnez "inscriptions"</li>
            <li>Remplissez le formulaire avec vos informations personnelles</li>
            <li>Vérifiez votre adresse email</li>
            <li>Complétez votre profil avec votre adresse et vos préférences</li>
          </ol>

          <p className="text-gray-300 mt-4">
            En tant que client, vous pourrez:
          </p>

          <ul className="space-y-2 text-gray-300 list-disc pl-5">
            <li>Rechercher des prestataires par catégorie et localisation</li>
            <li>Consulter les profils et les avis des prestataires</li>
            <li>Prendre contact avec les prestataires</li>
            <li>Laisser des avis après la prestation</li>
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={showProviderSignupModal}
        onClose={() => setShowProviderSignupModal(false)}
        title="S'inscrire en tant que prestataire"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Pour rejoindre notre réseau de prestataires et développer votre activité, suivez ces étapes:
          </p>

          <ol className="space-y-2 text-gray-300 list-decimal pl-5">
            <li>Cliquez sur "Devenir prestataire" en haut à droite de la page d'accueil</li>
            <li>Remplissez le formulaire d'inscription avec vos informations professionnelles</li>
            <li>Vérifiez votre adresse email et confirmez votre numéro de téléphone</li>
            <li>Complétez votre profil professionnel avec vos services et disponibilités</li>
          </ol>

          <p className="text-gray-300 mt-4">
            Avantages pour les prestataires:
          </p>
          <ul className="space-y-2 text-gray-300 list-disc pl-5">
            <li>Visibilité accrue dans votre zone d'intervention</li>
            <li>Gestion simplifiée de vos rendez-vous</li>
            <li>Construction d'une réputation en ligne grâce aux avis clients</li>
            <li>Accès à notre support dédié aux prestataires</li>
            <li>Extension de votre clientèle locale</li>
          </ul>

          <p className="text-yellow-500 font-bold mt-4">
            Phase d'essai gratuite
          </p>
          <p className="text-gray-300">
            Jokkale est actuellement en phase d'essai gratuit. Profitez de cette période pour développer votre activité sans frais.
          </p>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;