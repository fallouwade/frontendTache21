import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane
} from "react-icons/fa";
import logo from "/images/logofooterblanc.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Réinitialiser le message

    if (!email) {
      setMessageType("error");
      setMessage("Veuillez entrer un email valide.");
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
        setEmail(""); // Réinitialiser le champ email
      } else {
        setMessageType("error");
        setMessage(data.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("Problème de connexion au serveur.");
    }
  };

  return (
    <footer className="bg-[#000000] text-white w-full">
      <div className="container mx-auto px-4 py-12 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center lg:text-left">
            <a href="/" className="text-2xl font-extrabold">
              <img src={logo} alt="Logo" width="160" />
            </a>
            <p className="text-gray-400 mb-6">
              Trouvez les meilleurs professionnels près de chez vous. Plombiers, électriciens, mécaniciens, coiffeurs, enseignants privés et bien plus encore.
            </p>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Plomberie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Électricité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Coiffure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Enseignants Privés</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mécaniciens...</a></li>
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaPhone className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+221 77 123 45 67</span>
              </li>
              <li className="flex items-center justify-center lg:justify-start">
                <FaEnvelope className="text-yellow-500 mr-2 flex-shrink-0" />
                <span className="text-gray-400">contact@servicelocal.sn</span>
              </li>
            </ul>
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Restez informé de nos dernières actualités</p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-yellow-500 p-2 rounded-r hover:bg-yellow-600 transition-colors">
                <FaPaperPlane className="text-gray-900" />
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${messageType === "success" ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 ServiceLocal. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaYoutube /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// const Footer = () => {
//   const [modalState, setModalState] = useState({
//     conditions: false,
//     privacy: false,
//     help: false
//   });

//   const openModal = (modal) => {
//     setModalState({ ...modalState, [modal]: true });
//   };

//   const closeModal = (modal) => {
//     setModalState({ ...modalState, [modal]: false });
//   };

//   return (
//     <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white w-full">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Section À propos */}
//           <div className="flex flex-col items-center lg:items-start">
//             <div className="lg:-mt-10 mb-6 lg:mb-4">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 width="160"
//                 className="h-auto"
//               />
//             </div>
//             <p className="text-gray-200 text-center lg:text-left">
//               La première plateforme sénégalaise de mise en relation entre professionnels qualifiés et clients. Service rapide, fiable et professionnel.
//             </p>
//             <div className="flex space-x-4 mt-6">
//               <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
//                 <FaFacebookF />
//               </a>
//               <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors">
//                 <FaInstagram />
//               </a>
//             </div>
//           </div>

//           {/* Section Pour les Clients */}
//           <div className="flex flex-col items-center lg:items-start">
//             <h3 className="text-blue-300 font-bold mb-4 text-lg">Pour les Clients</h3>
//             <ul className="space-y-3 w-full">
//               <li className="flex justify-center lg:justify-start">
//                 <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
//                   <FaUser className="text-blue-300" /> Comment ça marche
//                 </a>
//               </li>
//               <li className="flex justify-center lg:justify-start">
//                 <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
//                   <FaTools className="text-blue-300" /> Trouver un prestataire
//                 </a>
//               </li>
//               <li className="flex justify-center lg:justify-start">
//                 <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
//                   <FaStar className="text-blue-300" /> Laisser un avis
//                 </a>
//               </li>
//               <li className="flex justify-center lg:justify-start">
//                 <a href="#" className="text-gray-200 hover:text-blue-300 transition-colors flex items-center gap-2">
//                   <FaHandshake className="text-blue-300" /> Garantie satisfaction
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Section Pour les Professionnels */}
//           <div className="flex flex-col items-center lg:items-start">
//             <h3 className="text-blue-300 font-bold mb-4 text-lg">Pour les Professionnels</h3>
//             <ul className="space-y-3 text-center lg:text-left w-full">
//               <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Devenir partenaire</a></li>
//               <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Tableau de bord pro</a></li>
//               {/* <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Plateforme gratuite</a></li> */}
//               <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Conseils pour prestataires</a></li>
//               <li><a href="#" className="text-gray-200 hover:text-blue-300 transition-colors">Centre d'aide Pro</a></li>
//             </ul>
//           </div>

//           {/* Section Contact et Support */}
//           <div className="flex flex-col items-center lg:items-start">
//             <h3 className="text-blue-300 font-bold mb-4 text-lg">Contact et Support</h3>
//             <ul className="space-y-4 w-full">
//               <li className="flex items-center justify-center lg:justify-start">
//                 <FaMapMarkerAlt className="text-blue-300 mr-2 flex-shrink-0" />
//                 <span className="text-gray-200">Dakar, Sénégal</span>
//               </li>
//               <li className="flex items-center justify-center lg:justify-start">
//                 <FaPhone className="text-blue-300 mr-2 flex-shrink-0" />
//                 <span className="text-gray-200">+221 77 123 45 67</span>
//               </li>
//               <li className="flex items-center justify-center lg:justify-start">
//                 <FaEnvelope className="text-blue-300 mr-2 flex-shrink-0" />
//                 <span className="text-gray-200">contact@servicelocal.sn</span>
//               </li>
//               <li>
//                 <button
//                   onClick={() => openModal('help')}
//                   className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full w-full transition-colors"
//                 >
//                   Centre d'aide
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Footer bottom */}
//         <div className="mt-12 pt-8 border-t border-blue-700">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-300">
//               <button
//                 onClick={() => openModal('conditions')}
//                 className="hover:text-blue-300 transition-colors"
//               >
//                 Conditions d'utilisation
//               </button>
//               <span className="hidden md:inline">•</span>
//               <button
//                 onClick={() => openModal('privacy')}
//                 className="hover:text-blue-300 transition-colors"
//               >
//                 Politique de confidentialité
//               </button>
//               <span className="hidden md:inline">•</span>
//               <button
//                 onClick={() => openModal('help')}
//                 className="hover:text-blue-300 transition-colors"
//               >
//                 Aide
//               </button>
//             </div>
//             <p className="text-gray-300 text-sm text-center md:text-right">
//               © 2025 ServiceLocal. Tous droits réservés.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Modales */}
//       <Modal
//         isOpen={modalState.conditions}
//         onClose={() => closeModal('conditions')}
//         title="Conditions d'utilisation"
//       >
//         <div className="text-gray-600 space-y-4">
//           <h3 className="font-bold text-gray-900">1. Introduction</h3>
//           <p>ServiceLocal est une plateforme de mise en relation entre professionnels et clients au Sénégal. En utilisant notre service, vous acceptez ces conditions.</p>

//           <h3 className="font-bold text-gray-900">2. Utilisation du Service</h3>
//           <p>Notre plateforme est gratuite pendant la phase de lancement. Vous devez être majeur et capable pour utiliser nos services.</p>

//           <h3 className="font-bold text-gray-900">3. Responsabilités</h3>
//           <p>ServiceLocal agit comme intermédiaire et n'est pas responsable de la qualité des services fournis par les prestataires.</p>
//         </div>
//       </Modal>

//       <Modal
//         isOpen={modalState.privacy}
//         onClose={() => closeModal('privacy')}
//         title="Politique de confidentialité"
//       >
//         <div className="text-gray-600 space-y-4">
//           <h3 className="font-bold text-gray-900">Protection de vos données</h3>
//           <p>Nous collectons et traitons vos données personnelles de manière sécurisée et conforme à la législation sénégalaise.</p>

//           <h3 className="font-bold text-gray-900">Utilisation des données</h3>
//           <p>Vos données sont utilisées uniquement pour faciliter la mise en relation avec les prestataires et améliorer nos services.</p>

//           <h3 className="font-bold text-gray-900">Vos droits</h3>
//           <p>Vous avez le droit d'accéder, modifier ou supprimer vos données personnelles à tout moment.</p>
//         </div>
//       </Modal>

//       <Modal
//         isOpen={modalState.help}
//         onClose={() => closeModal('help')}
//         title="Centre d'aide"
//       >
//         <div className="text-gray-600 space-y-4">
//           <h3 className="font-bold text-gray-900">Comment ça marche ?</h3>
//           <p>1. Créez votre compte<br />
//             2. Recherchez un prestataire<br />
//             3. Contactez le professionnel<br />
//             4. Évaluez le service</p>

//           <h3 className="font-bold text-gray-900">Besoin d'aide ?</h3>
//           <p>Contactez-nous par :<br />
//             - Téléphone : +221 77 123 45 67<br />
//             - Email : contact@servicelocal.sn</p>
//         </div>
//       </Modal>
//     </footer>
//   );
// }

// export default Footer;
