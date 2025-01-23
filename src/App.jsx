

import { Route, Routes } from "react-router-dom";

import Communautaire from './Pages/Communautaire.jsx';
import Client from './Pages/Client.jsx';
import Connection from './Authentification/PagesConnexion/Connection.jsx'
import InscriptionPrestataire from "./Authentification/Inscription/InscriptionPrestataire.jsx";
import MotDePasseOublie from "./Authentification/PagesConnexion/MotDePasseOublie.jsx";
import InscriptionClient from "./Authentification/Inscription/InscriptionClient.jsx";

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
      <Route path="/inscriptionPrestataire" element={<InscriptionPrestataire />} />

      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />

      {/* Inscription Client */}
      <Route path="/inscriptionClient" element={<InscriptionClient />} />


      <Route path="/Client" element={<Client />} />


       {/* Admin Dashboard and nested routes) */}
       <Route path="/dashboardAdmin" element={<IndexAdmin />}>
        <Route path="prestataire" element={<Prestataire />} />
        <Route path="prestataire/profil" element={<ProfilPrestataire />} />
        <Route path="clients" element={<InfoClients />} />
        <Route path="categories" element={<Categorie />} />
      </Route>

    </Routes>


  )


   
  

}

export default App
