import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import axios from 'axios';
import { login } from '../util/Auth';

const Connection = () => {
  const LOGIN_API_URL = 'https://backendtache21.onrender.com/api/utilisateurs/connexion';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      return toast.error("Le mot de passe doit comporter au moins 6 caractères.");
    }

    try {
      console.log("donné envoyer")
      const response = await axios.post(LOGIN_API_URL, {
        email: formData.email,
        motDePasse: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      const user = response.data.utilisateur;
     
      login(user, response.data.token);

      const savedReservation = localStorage.getItem('reservationData');

      if(savedReservation){
        navigate('/reservation');
      }
      else if (user.role == 'client'){
        navigate('/Client');
      }
      else if (user.role == 'prestataire'){
        navigate('/accueil');
      }
      else if (user.role == 'admin'){
        navigate('/dashboardAdmin');
      }
      else{
        navigate('/');
      }


      // Redirection basée sur le rôle
      // switch(user.role){
      //   case 'client':
      //     navigate('/Client');
      //     break;
      //   case 'prestataire':
      //     navigate('/accueil');
      //     break;
      //   case 'admin':
      //     navigate('/dashboardAdmin');
      //     break;
      //   default:
      //     navigate('/');
      // }

      setFormData({
        email: '',
        password: '',
      });

      return response.data;

    } catch (erreur) {
      if (erreur.response) {
        toast.error(erreur.response.data.message || 'Erreur de connexion');
      } else {
        toast.error('Erreur lors de la connexion');
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <nav className="w-full bg-white text-gray flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.freepik.com/vecteurs-libre/modele-logo-cobra-couleur-degrade_23-2149192539.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_hybrid"
            alt="Logo"
            className="w-10 h-10 object-cover ml-2"
          />
        </div>
        <Link to="/" className="text-black font-semibold hover:text-blue-500 mr-4">
          Accueil
        </Link>
      </nav>

      <div className="flex flex-grow flex-col md:flex-row">
        
        <div className="w-full md:w-1/2 relative block md:hidden">
          <img
            src="https://cando.hr/wp-content/uploads/2020/10/bitmap12-e1603359469292.png"
            alt="Connexion"
            className="w-9/12 h-auto object-contain mx-auto mt-4"
          />
        </div>

        <div className="w-full md:w-1/2 relative hidden md:block">
          <img
            src="https://cando.hr/wp-content/uploads/2020/10/bitmap12-e1603359469292.png"
            alt="Connexion"
            className="w-9/12 h-full object-contain"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-4 rounded-lg overflow-auto max-h-screen"
          >
            <h2 className="text-3xl font-semibold text-black mb-6 text-center">CONNEXION</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 pt-5 transform cursor-pointer"
                aria-label={showPassword ? "Masquer le mot de passe" : "Voir le mot de passe"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-4 text-right">
              <p className="text-sm text-gray-600">
                <Link className="text-blue-500 hover:text-blue-700" to="/motdepasseoublie">
                  Mot de passe oublié ?
                </Link>
              </p>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Se connecter
            </button>

            <div className="mt-4 text-right">
              <p className="text-sm text-gray-600">
                
                <Link className="text-blue-500 hover:text-blue-700" to="/inscriptionClient">
                  Vous n'avez pas encore de compte ?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Connection;
