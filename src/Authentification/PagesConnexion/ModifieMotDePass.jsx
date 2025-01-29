import { useState } from 'react';

const ModifieMotdePass = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCodeChange = (e) => setCode(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      const response = await fetch('https://backendtache21.onrender.com/api/mot-de-passe/modifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          codeReset: code,
          nouveauMotDePasse: newPassword,
        }),
      });

      const data = await response.json();

      if (data.message === 'Mot de passe réinitialisé avec succès.') {
        setSuccess('Mot de passe réinitialisé avec succès.');
        setError('');
      } else {
        setError(data.message || 'Une erreur est survenue.');
        setSuccess('');
      }
    } catch (err) {
      setError('Erreur de connexion.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Réinitialiser votre mot de passe</h2>

      {success && <div className="text-green-500 text-center mb-4">{success}</div>}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Code reçu</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={code}
            onChange={handleCodeChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Nouveau mot de passe</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirmer le mot de passe</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Réinitialiser le mot de passe
        </button>
      </form>
    </div>
  );
};

export default ModifieMotdePass;
