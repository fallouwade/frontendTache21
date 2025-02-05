import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../util/Auth';

const DeconnexionButton = ({color}) => {
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
      className={`w-full px-4 py-2 text-sm text-start ${color}`}
    >
      Déconnexion
    </button>
  );
};

export default DeconnexionButton;