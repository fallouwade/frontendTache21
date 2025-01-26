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


import Accueil from "./Pages/Accueil.jsx";
import Profil from "./Pages/Profil.jsx";
import Demande from "./Pages/Demande.jsx";
import DetailDemande from "./Pages/DetailDemande.jsx";
import EditerProfil from "./Pages/EditerProfil.jsx";
import MessageClient from "./Pages/MessageClient.jsx";
import AjouterService from "./Pages/AjouterService.jsx";






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

      {/* Client */}
      <Route path="/Client">
        <Route index element={<Client />} />
        <Route path="Message" element={<MessageClient />} />
      </Route>

    {/* Route pour la partie Prestataire */}
      <Route path="/Accueil" element={<Accueil />} />
      <Route path="/profil" element={<Profil />} />
      <Route path="/demande" element={<Demande />} />
      <Route path="/detail" element={<DetailDemande />} />
      <Route path="/editerprofil" element={<EditerProfil />} />
      <Route path="/ajouter" element={<AjouterService />} />



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







