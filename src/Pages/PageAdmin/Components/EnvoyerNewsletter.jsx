import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EnvoyerNewsletter = () => {
  const [sujet, setSujet] = useState('');
  const [contenu, setContenu] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://backendtache21.onrender.com/api/newsletter/envoyer', {
        sujet,
        contenu,
      });

      toast.success('✅ Newsletter envoyée avec succès !', {
        position: 'bottom-right', // 👈 Toast en bas à droite
        autoClose: 3000,
      });

      // Réinitialiser les champs après envoi
      setSujet('');
      setContenu('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la newsletter:', error);
      toast.error('❌ Erreur lors de l\'envoi de la newsletter.', {
        position: 'bottom-right', // 👈 Toast en bas à droite
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* ToastContainer avec position en bas */}
      <ToastContainer position="bottom-right" />

      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">📢 Envoyer une Newsletter</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="sujet" className="block text-sm font-medium text-gray-700">📌 Sujet :</label>
          <input
            id="sujet"
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            required
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="contenu" className="block text-sm font-medium text-gray-700">📝 Contenu :</label>
          <textarea
            id="contenu"
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
            rows="6"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            🚀 Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnvoyerNewsletter;
