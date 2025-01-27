import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [codeReset, setCodeReset] = useState('');  // Code de réinitialisation
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Vérification que les mots de passe correspondent
    if (nouveauMotDePasse !== confirmerMotDePasse) {
      toast.error('Les mots de passe ne correspondent pas.', {
        position: "top-center", 
        autoClose: 5000,
        hideProgressBar: true, 
      });
      return;
    }

    try {
      // Envoi de la requête pour réinitialiser le mot de passe
      const response = await fetch('https://backendtache21.onrender.com/api/mot-de-passe/modifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,  // L'email de l'utilisateur
          codeReset: codeReset, // Le code temporaire
          nouveauMotDePasse: nouveauMotDePasse, // Le nouveau mot de passe
        }),
      });

      const data = await response.json();

      // Gestion de la réponse de l'API
      if (response.ok) {
        toast.success('Votre mot de passe a été réinitialisé avec succès.', {
          position: "top-center", 
          autoClose: 5000, 
          hideProgressBar: true, 
        });
        navigate('/connexion');
      } else {
        toast.error(data.message || 'Une erreur est survenue. Veuillez réessayer.', {
          position: "top-center", 
          autoClose: 5000,
          hideProgressBar: true, 
        });
        // console.error('Erreur de l\'API:', data);  // Log des erreurs dans la console pour le débogage
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      toast.error('Erreur de connexion. Veuillez vérifier votre connexion internet.', {
        position: "top-center", 
        autoClose: 5000, 
        hideProgressBar: true, 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Réinitialiser votre mot de passe</h2>

        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="codeReset" className="block text-sm font-medium text-gray-700">
              Code de réinitialisation
            </label>
            <input
              type="text"
              id="codeReset"
              name="codeReset"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le code de réinitialisation"
              value={codeReset}
              onChange={(e) => setCodeReset(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="nouveauMotDePasse"
              name="nouveauMotDePasse"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre nouveau mot de passe"
              value={nouveauMotDePasse}
              onChange={(e) => setNouveauMotDePasse(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmerMotDePasse"
              name="confirmerMotDePasse"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirmez votre nouveau mot de passe"
              value={confirmerMotDePasse}
              onChange={(e) => setConfirmerMotDePasse(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Réinitialiser le mot de passe
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
