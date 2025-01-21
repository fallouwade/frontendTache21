import { useState } from 'react';
import { Link } from "react-router-dom";

const Connection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 

    setFormData({
      email: '',
      password: '',
    });
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

        
        <div className="w-full md:w-1/2 relative block md:hidden">
          <img 
            src="https://cando.hr/wp-content/uploads/2020/10/bitmap12-e1603359469292.png"
            alt="Connexion"
            className="w-9/12 h-auto object-contain mx-auto mt-4"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 rounded-lg shadow-lg overflow-auto max-h-screen">
            <h2 className="text-3xl font-semibold text-black mb-6 text-center">CONNEXION</h2>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4 text-right">
              <p className="text-sm text-gray-600">Mot de passe oublié ? <Link className='text-blue-500 hover:text-blue-700' to="/motdepasseoublie">REINITIALISER</Link></p>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Se connecter</button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Vous n'avez pas encore de compte ? <Link className='text-blue-500 hover:text-blue-700' to="/signup">INSCRIVEZ-VOUS</Link></p>
            </div>
          </form>
        </div>

        <div className="md:w-1/2 relative hidden md:block">
          <img 
            src="https://cando.hr/wp-content/uploads/2020/10/bitmap12-e1603359469292.png"
            alt="Connexion"
            className="w-9/12 h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Connection;
