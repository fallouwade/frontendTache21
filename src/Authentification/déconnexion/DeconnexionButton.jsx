import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../util/Auth';
import { FaUserCircle, FaGift, FaBriefcase, FaQuestionCircle, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa"

const DeconnexionButton = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Supprimer les données de l'utilisateur du localStorage
      logout();
      
      // Afficher une notification de succès
      toast.success('Déconnexion réussie');
      
      // Redirection
      navigate('/connexion');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="w-full px-4 py-2 text-sm text-start flex hover:bg-red-400"
    >
      <FaSignOutAlt className='fw-bold font'/> Déconnexion
    </button>
  );
};

export default DeconnexionButton;