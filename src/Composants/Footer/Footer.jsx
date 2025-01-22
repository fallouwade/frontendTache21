import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="container mx-auto px-4 py-12 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Services Locaux</h2>
            <p className="text-gray-400 mb-6">
              Trouvez les meilleurs professionnels près de chez vous. Plombiers, électriciens, Mecaniens, coiffeurs, enseignats Privée et bien plus encore.
            </p>
            
          </div>

          <div className="text-center lg:text-left">
            <h3 className="text-yellow-500 font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Plomberie</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Électricité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Coiffure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Enseignats Privée</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mecaniens.....</a></li>
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
            <p className="text-gray-400 mb-4">
              Restez informé de nos dernières actualités
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 p-2 rounded-r hover:bg-yellow-600 transition-colors">
                <FaPaperPlane className="text-gray-900" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              © 2025 ServiceLocal. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;