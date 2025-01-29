import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import de toastify
import 'react-toastify/dist/ReactToastify.css'; // Import du style pour les toasts

const MotDePasseOublie = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Vérification de l'email
    if (!email || !email.includes('@')) {
      setMessage('Veuillez entrer une adresse e-mail valide.');
      toast.error('Adresse e-mail invalide !'); // Affiche un toast d'erreur
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://backendtache21.onrender.com/api/mot-de-passe/oublie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Un lien de code a été envoyé à votre adresse e-mail.');
        toast.success("L'email de réinitialisation a été envoyé avec succès !"); // Affiche un toast de succès
        
        // Attendre 3 secondes avant de rediriger
        setTimeout(() => {
          navigate('/modifier');
        }, 3000); // 3000 ms = 3 secondes
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer.');
        toast.error(errorData.message || 'Erreur lors de l\'envoi de l\'e-mail.'); // Toast d'erreur
      }
    } catch (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
      toast.error('Une erreur est survenue. Veuillez réessayer.'); // Toast d'erreur en cas de problème réseau
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Mot de passe oublié</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Après avoir envoyé ce formulaire, vous recevrez un email contenant un code pour réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-700" aria-live="polite">
            {message}
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-xs text-sm text-gray-600">
            Retour à la <Link className="text-blue-500 hover:text-blue-700" to="/connexion">CONNEXION</Link>
          </p>
        </div>
      </div>

      {/* ToastContainer pour afficher les toasts */}
      <ToastContainer />
    </div>
  );
};

export default MotDePasseOublie;
