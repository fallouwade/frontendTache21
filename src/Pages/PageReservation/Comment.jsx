import { useState, useEffect } from "react";
import axios from "axios";
import { Send, Edit, Trash2, Save, Loader, Star } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer le modal
  const [commentaireASupprimer, setCommentaireASupprimer] = useState(null); // ID du commentaire à supprimer

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(4); // Nombre de commentaires par page

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (serviceId) {
      getCommentaires();
      getStatistiquesNotes();
    }
  }, [serviceId, currentPage]); // Ajout de `currentPage` comme dépendance

  const getCommentaires = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://backendtache21.onrender.com/api/commentaires/services/${serviceId}/commentaires-recu?page=${currentPage}&limit=${commentsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sortedCommentaires = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setCommentaires(sortedCommentaires);
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
        `https://backendtache21.onrender.com/api/commentaires/services/${serviceId}/statistique-notes`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const stats = response.data || [];
      let totalNotes = 0;
      let totalAvis = 0;
      stats.forEach((stat) => {
        totalNotes += stat.note * stat.count;
        totalAvis += stat.count;
      });
      const moyenneNote = totalAvis === 0 ? 0 : totalNotes / totalAvis;
      const pourcentageNote = totalAvis === 0 ? 0 : (moyenneNote / 5) * 100;

      setStatistiques({ moyenneNote, totalAvis, pourcentageNote });
    } catch (error) {
      setMessage("Erreur lors de la récupération des statistiques des notes.");
    } finally {
      setLoading(false);
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const ajouterCommentaire = async () => {
    if (!token) return toast.error("Connecter vous!");
    if (!contenu.trim()) return toast.error("Le commentaire ne peut pas être vide.");
  
    // Vérification du type d'utilisateur (bloquer si prestataire)
    if (user && user.role === "prestataire" && user.id === serviceId) {
      return toast.error("Vous ne pouvez pas commenter votre propre service.");
    }
  
    setLoading(true);
    try {
      const response = await axios.post(
        `https://backendtache21.onrender.com/api/commentaires/services/${serviceId}/commentaires`,
        {
          commentaire: contenu,
          note,
          utilisateurType: "Client",
          commentaireUser: `${user.prenom} ${user.nom}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      await getCommentaires(); // Rafraîchir les commentaires
      setContenu("");
      setNote(0);
      toast.success("Commentaire ajouté avec succès !");
      getStatistiquesNotes();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'ajout du commentaire."
      );
    } finally {
      setLoading(false);
    }
  };
  

  const modifierCommentaire = async (id) => {
    if (!token || !editContenu.trim()) {
      toast.error("Le commentaire ne peut pas être vide.");
      return;
    }

    setLoading(true);
    const ancienCommentaires = [...commentaires];

    setCommentaires((prevCommentaires) =>
      prevCommentaires.map((commentaire) =>
        commentaire._id === id
          ? { ...commentaire, commentaire: editContenu, note: editNote }
          : commentaire
      )
    );

    try {
      const response = await axios.put(
        `https://backendtache21.onrender.com/api/commentaires/modifier/${id}`,
        { commentaire: editContenu, note: editNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await getCommentaires(); // Rafraîchir les commentaires
      toast.success("Commentaire modifié avec succès !");
    } catch (error) {
      toast.error("Erreur lors de la modification du commentaire.");
      setCommentaires(ancienCommentaires); // Rollback en cas d'erreur
    } finally {
      setLoading(false);
      setEditMode(null);
      getStatistiquesNotes();
    }
  };

  const supprimerCommentaire = async () => {
    if (!token) return toast.error("Connecter vous");

    setLoading(true);
    try {
      await axios.delete(
        `https://backendtache21.onrender.com/api/commentaires/supprimer/${commentaireASupprimer}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentaires((prevCommentaires) =>
        prevCommentaires.filter(
          (commentaire) => commentaire._id !== commentaireASupprimer
        )
      );
      toast.success("Commentaire supprimé avec succès !");
      getStatistiquesNotes();
    } catch (error) {
      toast.error("Erreur lors de la suppression du commentaire.");
    } finally {
      setLoading(false);
      setShowModal(false); // Fermer le modal après la suppression
    }
  };

  // Logique de pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentaires.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(commentaires.length / commentsPerPage);

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
            <div className="mb-4">
              <p className="text-3xl text-gray-800 font-bold flex justify-center items-center">
                <Star size={30} className="text-yellow-500 mr-2" />
                Note moyenne: {statistiques.moyenneNote.toFixed(1)} / 5
              </p>
            </div>

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
          placeholder="Limite la taille du commentaire à 500 caractères"
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
        ) : currentComments.length > 0 ? (
          <div className="space-y-4">
            {currentComments.map((commentaire) => (
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
                    {/* Affichage du nom de l'auteur du commentaire */}

                    <p className="text-blue-600 font-semibold">
                      {commentaire.commentaireUser}
                    </p>

                    <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                      {/* Commentaire */}
                      <p className="text-gray-800 text-sm font-medium leading-relaxed">
                         {commentaire.commentaire}
                      </p>

                      {/* Étoiles */}
                      <div className="flex items-center space-x-2 mt-2">
                        {[...Array(commentaire.note)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-yellow-500 transition-transform transform hover:scale-110"
                          />
                        ))}
                      </div>

                      {/* Date et heure */}
                      <small className="text-gray-500 text-xs block mt-2">
                        📅{" "}
                        {new Date(commentaire.date).toLocaleDateString(
                          "fr-FR",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}{" "}
                        -{" "}
                        {new Date(commentaire.date).toLocaleTimeString(
                          "fr-FR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </small>
                    </div>

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
                        onClick={() => {
                          setCommentaireASupprimer(commentaire._id);
                          setShowModal(true);
                        }}
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

      {/* Pagination */}
<div className="flex justify-center items-center mt-6">
  {/* Bouton "Précédent" */}
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1 || commentaires.length === 0}
    className={`flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
      currentPage === 1 || commentaires.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:scale-105"
    }`}
  >
    <ChevronLeft size={20} className="mr-2" />
  </button>

  {/* Affichage de la page */}
  <span className="mx-4 text-lg font-medium text-gray-700">
    Page {currentPage} sur {totalPages}
  </span>

  {/* Bouton "Suivant" */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages || commentaires.length === 0}
    className={`flex items-center justify-center px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
      currentPage === totalPages || commentaires.length === 0
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:scale-105"
    }`}
  >
    <ChevronRight size={20} className="ml-2" />
  </button>
</div>


      {/* Modal de confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700">
              Confirmation
            </h3>
            <p className="text-gray-600 mt-4">
              Êtes-vous sûr de vouloir supprimer ce commentaire ?
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={supprimerCommentaire}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
