
import React, { useState } from 'react';

const Stats = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);  // État pour les commentaires soumis

  const stats = [
    { label: "Ponctualité", value: "100%" },
    { label: "Satisfaction", value: "98%" },
    { label: "Communication", value: "96%" },
  ];

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Si le commentaire n'est pas vide, on l'ajoute à la liste
    if (comment.trim()) {
      setComments([...comments, comment]); // Ajouter le commentaire à la liste
      setComment(''); // Réinitialiser le champ de saisie
    }
  };

  // Fonction pour supprimer un commentaire en fonction de son index
  const handleDelete = (index) => {
    const newComments = comments.filter((_, i) => i !== index);
    setComments(newComments);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between py-4 border-b">
        {stats.map((stat, index) => (
          <div key={index} className="text-center mb-4 sm:mb-0">
            <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

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

      {/* Affichage des commentaires soumis */}
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
