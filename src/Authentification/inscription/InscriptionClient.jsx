import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const InscriptionClient = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmMotDePasse: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://backendtache21.onrender.com/api/clients/inscription-client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          motDePasse: formData.motDePasse
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription de l\'utilisateur');
      }

      setFormData({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        confirmMotDePasse: ''
      });

      toast.success('Inscription réussie !');

      navigate('/connexion');
    } catch (err) {
      setError(err.message);
      toast.error(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <nav className="w-full bg-white text-gray flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.freepik.com/vecteurs-libre/modele-logo-cobra-couleur-degrade_23-2149192539.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_hybrid"
            alt="Logo"
            className="w-10 h-10 object-cover ml-2"
          />
        </div>
        <Link to="/" className="text-black font-semibold hover:text-blue-500 mr-4">Accueil</Link>
      </nav>

      <div className="flex flex-grow flex-col md:flex-row">
        <div className="md:w-1/2 relative hidden md:block">
          <img
            src="https://www.imaago.fr/wp-content/uploads/2023/12/budget-main-d_oeuvre-1024x559.webp"
            alt="Inscription"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-2">
          <form onSubmit={handleSubmit} className="w-full max-w-lg p-2 rounded-lg overflow-auto ">
            <h2 className="text-3xl font-semibold text-black mb-6 text-center">INSCRIPTION</h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="mb-4 flex-1">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-600">Nom</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4 flex-1">
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-600">Prénom</label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-600">Mot de passe</label>
              <input
                type="password"
                id="motDePasse"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmMotDePasse" className="block text-sm font-medium text-gray-600">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmMotDePasse"
                name="confirmMotDePasse"
                value={formData.confirmMotDePasse}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? 'Enregistrement...' : "S'inscrire"}
            </button>
            <div className="mt-4 text-center">
              <p className="text-xs text-sm text-gray-600">Vous avez déjà un compte ? <Link className='text-blue-500 hover:text-blue-700' to="/connexion">CONNECTEZ-VOUS</Link></p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default InscriptionClient;
