import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';  // Import de FaArrowLeft
import axios from 'axios';
import { login } from '../util/Auth';

const Connection = (props) => {
  const LOGIN_API_URL = 'https://backendtache21.onrender.com/api/utilisateurs/connexion';
  const navigate = useNavigate();

  console.log(props.id)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  

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

    setIsLoading(true);  

    try {
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
        navigate(`/reservation/${props.id}`);
      }
      else if (user.role === 'client'){
        navigate('/Client');
      }
      else if (user.role === 'prestataire'){
        navigate('/dashboard');
      }
      else if (user.role === 'admin'){
        navigate('/dashboardAdmin');
      }
      else{
        navigate('/');
      }

      setFormData({
        email: '',
        password: '',
      });

    } catch (erreur) {
      if (erreur.response) {
        toast.error(erreur.response.data.message || 'Erreur de connexion');
      } else {
        toast.error('Erreur lors de la connexion');
      }
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="w-full bg-white text-gray flex items-center justify-between p-3">
        <button
          onClick={() => navigate('/')} 
          className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-500 hover:border-gray-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center"
        >
          <FaArrowLeft />
        </button>
      </div>

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
            <h2 className="text-3xl font-semibold text-black mb-6 text-center">
              CONNEXION
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-xl"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 pt-5 transform cursor-pointer"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Voir le mot de passe"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="mb-4 text-right">
              <p className="text-sm text-gray-600">
                <Link
                  className="text-blue-500 hover:text-blue-700"
                  to="/motdepasseoublie"
                >
                  Mot de passe oublié ?
                </Link>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>

            <div className="mt-4 text-right">
              <p className="text-sm text-gray-600">
                <Link
                  className="text-blue-500 hover:text-blue-700"
                  to="/inscriptionClient"
                >
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
