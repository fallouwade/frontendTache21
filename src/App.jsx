
import { Route, Routes } from "react-router-dom";

import Communautaire from './Pages/Communautaire.jsx';
import Client from './Pages/Client.jsx';
import Connection from './Authentification/PagesConnexion/Connection.jsx'
import Inscription from "./Authentification/inscription/InscriptionPrestataire.jsx";
import MotDePasseOublie from "./Authentification/PagesConnexion/MotDePasseOublie.jsx";
import Signup from "./Authentification/inscription/InscriptionClient.jsx";

import Categorie from "./Pages/Categorie.jsx";
import InfoClients from "./Pages/InfoClients.jsx";
import { IndexAdmin } from "./Pages/IndexAdmin.jsx";

import Prestataire from "./Pages/Prestataire.jsx";
import ProfilPrestataire from "./Pages/ProfilPrestataire.jsx";





function App() {
  return (

    <Routes>

      <Route path="/" element={<Communautaire />} />

      <Route path="/connexion" element={<Connection />} />

      {/* //Inscription Prestataire */}
      <Route path="/inscription" element={<Inscription />} />

      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />

      {/* Inscription Client */}
      <Route path="/signup" element={<Signup />} />


      <Route path="/Client" element={<Client />} />

      <Route path="/categorie" element={<Categorie />} />

      <Route path="/dashboardAdmin" element={<IndexAdmin />} />
      <Route path="/prestataireAdmin" element={<Prestataire />} />
      <Route path="/prestataireAdmin/profil" element={<ProfilPrestataire />} />
      <Route path="/clientAdmin" element={<InfoClients />} />

    </Routes>


  )

}

export default App
