import { useState, useEffect } from "react";
import axios from "axios";
import { Send, Edit, Trash2, Save, Loader, Star } from "lucide-react";

export default function Comment({ serviceId }) {
  const [contenu, setContenu] = useState("");
  const [note, setNote] = useState(0);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [commentaires, setCommentaires] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editContenu, setEditContenu] = useState("");
  const [editNote, setEditNote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [statistiques, setStatistiques] = useState({
    moyenneNote: 0,
    totalAvis: 0,
    pourcentageNote: 0,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (serviceId) {
      getCommentaires();
      getStatistiquesNotes();
    }
  }, [serviceId]);

  const getCommentaires = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/commentaires/services/${serviceId}/commentaires-recu`
      );
      setCommentaires(response.data || []);
    } catch (error) {
      setMessage("Erreur lors de la récupération des commentaires.");
    } finally {
      setLoading(false);
    }
  };

  const getStatistiquesNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/commentaires/services/${serviceId}/statistique-notes`
      );
      const stats = response.data || [];

      // Calcul de la moyenne des notes
      let totalNotes = 0;
      let totalAvis = 0;
      stats.forEach((stat) => {
        totalNotes += stat.note * stat.count; // Multiplie la note par le nombre d'occurrences
        totalAvis += stat.count; // Additionne le nombre d'avis
      });

      const moyenneNote = totalAvis === 0 ? 0 : totalNotes / totalAvis; // Si aucun avis, on évite la division par zéro
      const pourcentageNote = totalAvis === 0 ? 0 : (moyenneNote / 5) * 100;

      setStatistiques({ moyenneNote, totalAvis, pourcentageNote });
    } catch (error) {
      setMessage("Erreur lors de la récupération des statistiques des notes.");
    } finally {
      setLoading(false);
    }
  };

  const ajouterCommentaire = async () => {
    if (!token) return setMessage("Token manquant.");
    if (!contenu.trim())
      return setMessage("Le commentaire ne peut pas être vide.");

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:5000/api/commentaires/services/${serviceId}/commentaires`,
        { commentaire: contenu, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContenu("");
      setNote(0);
      getCommentaires();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Erreur lors de l'ajout du commentaire."
      );
    } finally {
      setLoading(false);
    }
  };

  const supprimerCommentaire = async (id) => {
    if (!token) return setMessage("Token manquant.");
    if (!window.confirm("Voulez-vous vraiment supprimer ce commentaire ?"))
      return;

    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/commentaires/supprimer/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getCommentaires();
    } catch (error) {
      setMessage("Erreur lors de la suppression du commentaire.");
    } finally {
      setLoading(false);
    }
  };

  const modifierCommentaire = async (id) => {
    if (!token || !editContenu.trim())
      return setMessage("Le commentaire ne peut pas être vide.");

    setLoading(true);
    try {
      await axios.put(
        `http://localhost:5000/api/commentaires/modifier/${id}`,
        { commentaire: editContenu, note: editNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(null);
      getCommentaires();
    } catch (error) {
      setMessage("Erreur lors de la modification du commentaire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 shadow-lg rounded-xl p-6 mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Commentaires
      </h3>

      {message && (
        <div
          className={`p-3 rounded-md text-center text-sm mb-4 ${
            message.includes("Erreur")
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      {/* Statistiques des notes */}
      <div className="mt-6 mb-4 p-6 bg-white rounded-lg shadow-xl transition-all hover:shadow-2xl hover:scale-105">
        <h4 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Statistiques des notes
        </h4>
        {loading ? (
          <p className="text-center text-gray-500">
            Chargement des statistiques...
          </p>
        ) : (
          <div className="text-center">
            {/* Note moyenne avec icône */}
            <div className="mb-4">
              <p className="text-3xl text-gray-800 font-bold flex justify-center items-center">
                <Star size={30} className="text-yellow-500 mr-2" />
                Note moyenne: {statistiques.moyenneNote.toFixed(1)} / 5
              </p>
            </div>

            {/* Barre de progression avec transition fluide */}
            <div className="relative pt-1 mb-6">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-sm font-medium text-gray-500">
                  Pourcentage
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {statistiques.pourcentageNote.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${statistiques.pourcentageNote}%` }}
                ></div>
              </div>
            </div>

            {/* Total des avis avec un graphique circulaire */}
            <div className="flex justify-center items-center space-x-4 mt-4">
              <div className="text-center">
                <p className="text-lg text-gray-800 font-semibold">
                  Total des avis
                </p>
                <p className="text-xl text-gray-500">
                  {statistiques.totalAvis} avis
                </p>
              </div>
              <div className="relative w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                <p className="text-lg text-blue-500 font-bold">
                  {statistiques.totalAvis}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire de commentaire */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ajouterCommentaire();
        }}
        className="flex flex-col space-y-4"
      >
        <textarea
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          placeholder="Écrivez votre commentaire..."
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer ${
                star <= note ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setNote(star)}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!contenu.trim() || loading}
          className="w-full flex items-center justify-center gap-2 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md disabled:bg-gray-400"
        >
          {loading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <>
              Envoyer <Send size={18} />
            </>
          )}
        </button>
      </form>

      {/* Liste des commentaires */}
      <div className="mt-6">
        {loading ? (
          <p className="text-center text-gray-500">
            Chargement des commentaires...
          </p>
        ) : commentaires.length > 0 ? (
          <div className="space-y-4">
            {commentaires.map((commentaire) => (
              <div
                key={commentaire._id}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                {editMode === commentaire._id ? (
                  <div>
                    <textarea
                      value={editContenu}
                      onChange={(e) => setEditContenu(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={24}
                          className={`cursor-pointer ${
                            star <= editNote
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          onClick={() => setEditNote(star)}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => modifierCommentaire(commentaire._id)}
                      className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                    >
                      <Save size={16} /> Enregistrer
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700">{commentaire.commentaire}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {[...Array(commentaire.note)].map((_, i) => (
                        <Star key={i} size={18} className="text-yellow-500" />
                      ))}
                    </div>
                    <small className="text-gray-500 block mt-2">
                      📅{" "}
                      {new Date(commentaire.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(commentaire.date).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                    <div className="mt-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditMode(commentaire._id);
                          setEditContenu(commentaire.commentaire);
                          setEditNote(commentaire.note);
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => supprimerCommentaire(commentaire._id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                      >
                        <Trash2 size={16} /> 
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Aucun commentaire pour ce service pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
