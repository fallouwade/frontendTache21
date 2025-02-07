
import { useState, useEffect } from 'react';

const Stats = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour envoyer un commentaire.');
      return;
    }
    
    if (comment.trim()) {
      try {
        // Retrieve token from localStorage (or wherever it's stored)
        const token = localStorage.getItem('token');

        const response = await fetch('https://backendtache21.onrender.com/api/commentaires/ajouter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ commentaire: comment }),
        });

        if (response.ok) {
          const data = await response.json();
          setComments([...comments, data.commentaire]);
          setComment('');
        } else {
          alert('Erreur lors de l\'envoi du commentaire.');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Impossible de se connecter au serveur.');
      }
    }
  };

  const handleDelete = (index) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-lg font-medium text-gray-700">
              Commentaires du Client :
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={handleChange}
              rows="4"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Veuillez saisir vos commentaires ici..."
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Envoyer le commentaire
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Commentaires soumis :</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500 mt-2">Aucun commentaire soumis pour le moment.</p>
        ) : (
          <ul className="space-y-4 mt-4">
            {comments.map((submittedComment, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm flex justify-between items-center"
              >
                <span>{submittedComment}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Stats;