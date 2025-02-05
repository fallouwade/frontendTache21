import { Route, Routes } from "react-router-dom";
import  { useState } from 'react';

import Communautaire from './Pages/Communautaire.jsx';
import Connection from './Authentification/PagesConnexion/Connection.jsx'
import InscriptionPrestataire from "./Authentification/inscription/InscriptionPrestataire.jsx";
import MotDePasseOublie from "./Authentification/PagesConnexion/MotDePasseOublie.jsx";
import InscriptionClient from "./Authentification/inscription/InscriptionClient.jsx";

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
import Reservation from "./Pages/PageReservation/Reservation.jsx";
import ModifieMotDePass from "./Authentification/PagesConnexion/ModifieMotDePass.jsx";
import ProfileClient from "./Pages/PageClient/Components/ProfilClients.jsx";
import ProtectionRoute from "./Authentification/util/ProtectionRoute.jsx";
import LayoutClients from "./Pages/PageClient/layout/LayoutClients.jsx";
import Dashboard from "./prestataire/Dashboard.jsx";
import LesDemandes from "./prestataire/LesDemandes.jsx";
import ProfilDuPrestataire from "./prestataire/ProfilDuPrestataire.jsx";
import AjouterServicesPrestataire from "./prestataire/AjouterServicesPrestataire.jsx";






function App() {

  const [id, setid]= useState()

  const identifiant=  (id) => {
    setid(id)
  }

  return (
    
    <Routes>
      {/* Route public */}
      <Route path="/" element={<Communautaire />} />
      <Route path="/connexion" element={<Connection />} />
      <Route path="/inscriptionPrestataire" element={<InscriptionPrestataire />} />
      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />
      <Route path="/modifier" element={<ModifieMotDePass />} />
      <Route path="/inscriptionClient" element={<InscriptionClient />} />


      {/* Routes Client */}
      <Route path="/Client" element={<ProtectionRoute allowedRoles={['client', 'prestataire']}><LayoutClients id={identifiant} /></ProtectionRoute>}>
        <Route path="message" element={<MessageClient />} />
        <Route path="profilClient" element={<ProfileClient />} />
      </Route>


       {/* Route Réservation avec ID du prestataire */}
       <Route path="/reservation" element={
          <ProtectionRoute allowedRoles={['client', 'prestataire']}>
            <Reservation id={id} />
          </ProtectionRoute>
        } />

      {/* Routes Prestataire */}
      <Route path="/accueil" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <Accueil />
        </ProtectionRoute>
      } />
      <Route path="/profil" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <Profil />
        </ProtectionRoute>
      } />
      <Route path="/demande" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <Demande />
        </ProtectionRoute>
      } />
      <Route path="/detail" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <DetailDemande />
        </ProtectionRoute>
      } />
      <Route path="/editerprofil" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <EditerProfil />
        </ProtectionRoute>
      } />
      <Route path="/ajouter" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <AjouterService />
        </ProtectionRoute>
      } />


      {/* Admin Dashboard and nested routes) */}
      <Route path="/dashboardAdmin" element={
        <ProtectionRoute allowedRoles={['admin']}>
          <IndexAdmin />
        </ProtectionRoute>
      }>
        <Route path="prestataire" element={<Prestataire />} />
        <Route path="prestataire/profil" element={<ProfilPrestataire />} />
        <Route path="clients" element={<InfoClients />} />
        <Route path="categories" element={<Categorie />} />
      </Route>




      {/* route test prestataire */}
      {/* <Route path="/app-test" element={<AppTest />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/les-demande" element={<LesDemandes />} />
      <Route path="/les-demande" element={<LesDemandes />} />
      <Route path="/profil-prestataire" element={<ProfilDuPrestataire />} />
      <Route path="/ajouter-service-prestataire" element={<AjouterServicesPrestataire />} />     

    </Routes>


  )
}
export default App