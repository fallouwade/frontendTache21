import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios'; 
import { regions, departements } from '../Constant';
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const InscriptionPrestataire = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    confirmMotDePasse: '',
    nomDeLentreprise: '',
    region: '',
    departement: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Vérification que les mots de passe correspondent
    if (formData.motDePasse !== formData.confirmMotDePasse) {
      toast.error("Les mots de passe ne correspondent pas !");
      return;
    }
  
    // Vérification de la longueur du mot de passe
    if (formData.motDePasse.length < 6) {
      return toast.error("Le mot de passe doit comporter au moins 6 caractères.");
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('https://backendtache21.onrender.com/api/prestataires/inscription-prestataire', {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        motDePasse: formData.motDePasse,
        region: formData.region,
        departement: formData.departement,
        description: formData.description,
        nomDeLentreprise: formData.nomDeLentreprise,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      toast.success('Inscription réussie !');

      // Délai de 3 secondes avant de rediriger
      setTimeout(() => {
        navigate('/connexion');
      }, 3000); // 3000 ms = 3 secondes
      
    } catch (err) {
      console.error('Erreur de la requête : ', err);
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
        <Link
          to="/"
          className="text-black font-semibold hover:text-blue-500 mr-4"
        >
          Accueil
        </Link>
      </nav>

      <div className="flex flex-grow flex-col md:flex-row">
        <div className="md:w-1/2 relative hidden md:block">
          <img
            src="https://img.freepik.com/photos-gratuite/homme-aide-tablette_23-2149370585.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_incoming_vrsd"
            alt="Inscription"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">
              Rejoignez notre communauté de prestataires
            </h1>
            <p className="text-lg opacity-90">
              Développez votre activité et trouvez de nouveaux clients
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-2">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-2 rounded-lg"
          >
            <h2 className="text-3xl font-semibold text-black mb-4 text-center">
              INSCRIPTION PRESTATAIRE
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="mb-2 flex-1">
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-600"
                >
                  Nom
                </label>
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
              <div className="mb-2 flex-1">
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-600"
                >
                  Prénom
                </label>
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
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="mb-2 flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  E-mail
                </label>
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
              <div className="mb-2 flex-1">
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Téléphone
                </label>
                <input
                  type="number"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de Passe et Confirmation Mot de Passe en ligne */}
            <div className="mb-4 flex space-x-4">
              <div className="relative flex-1">
                <label
                  htmlFor="motDePasse"
                  className="block text-sm font-medium text-gray-600"
                >
                  Mot de passe
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="motDePasse"
                  name="motDePasse"
                  value={formData.motDePasse}
                  onChange={handleChange}
                  maxLength="6" // Limitation à 6 caractères
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 pt-5 transform cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="relative flex-1">
                <label
                  htmlFor="confirmMotDePasse"
                  className="block text-sm font-medium text-gray-600"
                >
                  Confirmer mot de passe
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmMotDePasse"
                  name="confirmMotDePasse"
                  value={formData.confirmMotDePasse}
                  onChange={handleChange}
                  maxLength="6" // Limitation à 6 caractères
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 pt-5 transform cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="nomDeLentreprise"
                className="block text-sm font-medium text-gray-600"
              >
                Nom de l'entreprise
              </label>
              <input
                type="text"
                id="nomDeLentreprise"
                name="nomDeLentreprise"
                value={formData.nomDeLentreprise}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Sélecteur de région */}
            <div className="mb-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-600"
              >
                Région
              </label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionnez une région</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélecteur de département */}
            {formData.region && (
              <div className="mb-2">
                <label
                  htmlFor="departement"
                  className="block text-sm font-medium text-gray-600"
                >
                  Département
                </label>
                <select
                  id="departement"
                  name="departement"
                  value={formData.departement}
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Sélectionnez un département</option>
                  {departements[formData.region]?.map((departement) => (
                    <option key={departement} value={departement}>
                      {departement}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-4">
              <textarea 
                className="w-full mt-2 border border-gray-300 rounded-md" 
                name="description" 
                id="description" 
                placeholder="Description">
              </textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Enregistrement..." : "S'inscrire"}
            </button>
            <div className="mt-4 text-right">
              <p className="text-sm text-gray-600">
                <Link className="text-blue-500 hover:text-blue-700" to="/connexion">
                  Vous avez déjà un compte ?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Container pour les toasts */}
      <ToastContainer />
    </div>
  );
};

export default InscriptionPrestataire;
