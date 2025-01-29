import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Supprimer les données de l'utilisateur du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Afficher une notification de succès
      toast.success('Déconnexion réussie');
      
      // Rediriger vers la page de connexion
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;