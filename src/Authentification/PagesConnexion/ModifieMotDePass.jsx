import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { toast, ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css'; 

const ModifieMotDePass = () => {
  const [motDePasseTemporaire, setMotDePasseTemporaire] = useState('');
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const motDePasseTemporaireCorrect = 'motdepasseTemporaire';  
    if (motDePasseTemporaire !== motDePasseTemporaireCorrect) {
      toast.error('Le mot de passe temporaire est incorrect.', {
        position: "top-center", 
        autoClose: 5000,
        hideProgressBar: true, 
      });
      return;
    }

    if (nouveauMotDePasse !== confirmerMotDePasse) {
      toast.error('Les mots de passe ne correspondent pas.', {
        position: "top-center", 
        autoClose: 5000,
        hideProgressBar: true, 
      });
      return;
    }

    try {
      const response = await fetch('https://backendtache21.onrender.com/api/mot-de-passe/modifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ancienMotDePasse: motDePasseTemporaire,
          nouveauMotDePasse: nouveauMotDePasse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Votre mot de passe a été réinitialisé avec succès.', {
          position: "top-center", 
          autoClose: 5000, 
          hideProgressBar: true, 
        });
        navigate('/login');
      } else {
        toast.error(data.message || 'Une erreur est survenue. Veuillez réessayer.', {
          position: "top-center", 
          autoClose: 5000,
          hideProgressBar: true, 
        });
      }
    } catch (error) {
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
            <label htmlFor="motDePasseTemporaire" className="block text-sm font-medium text-gray-700">
              Mot de passe temporaire
            </label>
            <input
              type="password"
              id="motDePasseTemporaire"
              name="motDePasseTemporaire"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le mot de passe temporaire reçu par mail"
              value={motDePasseTemporaire}
              onChange={(e) => setMotDePasseTemporaire(e.target.value)}
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

export default ModifieMotDePass;
