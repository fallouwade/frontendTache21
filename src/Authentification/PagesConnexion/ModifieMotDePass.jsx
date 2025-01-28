import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModifierMotDePasse = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeCode = (e) => setCode(e.target.value);
  const handleChangeNouveauMotDePasse = (e) => setNouveauMotDePasse(e.target.value);
  const handleChangeConfirmerMotDePasse = (e) => setConfirmerMotDePasse(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Validation des champs
    if (!email || !email.includes('@')) {
      setMessage('Veuillez entrer une adresse e-mail valide.');
      setIsLoading(false);
      return;
    }
    if (!code) {
      setMessage('Veuillez entrer le code de réinitialisation.');
      setIsLoading(false);
      return;
    }
    if (!nouveauMotDePasse || nouveauMotDePasse.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères.');
      setIsLoading(false);
      return;
    }
    if (nouveauMotDePasse !== confirmerMotDePasse) {
      setMessage('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    try {
      // Envoi des données au backend
      const response = await fetch('https://backendtache21.onrender.com/api/mot-de-passe/modifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          codeReset: code,  // code envoyé par email
          nouveauMotDePasse,
        }),
      });

      if (response.ok) {
        setMessage('Mot de passe réinitialisé avec succès.');
        navigate('/connexion'); // Redirection vers la page de connexion
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Erreur lors de la réinitialisation du mot de passe.');
      }
    } catch (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Réinitialiser le mot de passe</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Adresse e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-600">Code de réinitialisation</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChangeCode}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-600">Nouveau mot de passe</label>
            <input
              type="password"
              id="nouveauMotDePasse"
              name="nouveauMotDePasse"
              value={nouveauMotDePasse}
              onChange={handleChangeNouveauMotDePasse}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-gray-600">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmerMotDePasse"
              name="confirmerMotDePasse"
              value={confirmerMotDePasse}
              onChange={handleChangeConfirmerMotDePasse}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-700" aria-live="polite">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifierMotDePasse;
