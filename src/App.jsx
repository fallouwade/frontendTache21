import { Route, Routes } from "react-router-dom";
import  { useState } from 'react';

import Connection from './Authentification/PagesConnexion/Connection.jsx'
import InscriptionPrestataire from "./Authentification/inscription/InscriptionPrestataire.jsx";
import MotDePasseOublie from "./Authentification/PagesConnexion/MotDePasseOublie.jsx";
import InscriptionClient from "./Authentification/inscription/InscriptionClient.jsx";

import Categorie from "./Pages/Categorie.jsx";
import InfoClients from "./Pages/InfoClients.jsx";
import { IndexAdmin } from "./Pages/IndexAdmin.jsx";
import Prestataire from "./Pages/Prestataire.jsx";
import ProfilPrestataire from "./Pages/ProfilPrestataire.jsx";
import ProfilAdmin from "./Pages/ProfilAdmin.jsx"


// import Accueil from "./Pages/Accueil.jsx";
import Profil from "./Pages/Profil.jsx";
import Demande from "./Pages/Demande.jsx";
import DetailDemande from "./Pages/DetailDemande.jsx";
import EditerProfil from "./Pages/EditerProfil.jsx";
import AjouterService from "./Pages/AjouterService.jsx";
import Reservation from "./Pages/PageReservation/Reservation.jsx";
import ModifieMotDePass from "./Authentification/PagesConnexion/ModifieMotDePass.jsx";
import ProtectionRoute from "./Authentification/util/ProtectionRoute.jsx";
import LayoutClients from "./Pages/PageClient/layout/LayoutClients.jsx";
// import ClientContent from "./Pages/PageClient/Components/ClientContent.jsx";
import LayoutCommunautaire from "./Pages/PageClient/layout/LayoutCommunautaire.jsx";
import ProfilCli from "./Pages/PageClient/Components/ProfilCli.jsx";


import Dashboard from "./prestataire/Dashboard.jsx";
import LesDemandes from "./prestataire/LesDemandes.jsx";
import ProfilDuPrestataire from "./prestataire/ProfilDuPrestataire.jsx";
import AjouterServicesPrestataire from "./prestataire/AjouterServicesPrestataire.jsx";
import InfoDemande from "./Pages/PageClient/Components/InfoDemande.jsx";


function App() {

  const [id, setid]= useState()

  const identifiant=  (id) => {
    setid(id)
  }

  return (
    
    <Routes>
      {/* Route public */}
      <Route path="/" element={<LayoutCommunautaire  id={identifiant} />} />
      <Route path="/connexion" element={<Connection />} />
      <Route path="/inscriptionPrestataire" element={<InscriptionPrestataire />} />
      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />
      <Route path="/modifier" element={<ModifieMotDePass />} />
      <Route path="/inscriptionClient" element={<InscriptionClient />} />
      {/* <Route path="/messages" element={<InfoDemande />} /> */}


      {/* Routes Client */}
      <Route path="/Client" element={<ProtectionRoute allowedRoles={['client', 'prestataire']}><LayoutClients id={identifiant} /></ProtectionRoute>}>
       <Route path="messages" element={<InfoDemande/>} /> 
        <Route path="profilClient" element={<ProfilCli/>} />
      </Route>


       {/* Route Réservation avec ID du prestataire */}
       <Route path="/reservation" element={
         <Reservation id={id} />
        } />

      {/* Routes Prestataire */}
      {/* <Route path="/accueil" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <Accueil />
        </ProtectionRoute>
      } /> */}
    

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
        <Route path="profilAdmin" element={<ProfilAdmin />} />
        <Route path="prestataire" element={<Prestataire />} />
        <Route path="prestataire/profil/:id" element={<ProfilPrestataire />} />
        <Route path="clients" element={<InfoClients />} />
        <Route path="categories" element={<Categorie />} />
      </Route>




      {/* route test prestataire */}
      {/* <Route path="/app-test" element={<AppTest />} /> */}
      <Route path="/dashboard" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <Dashboard />
        </ProtectionRoute>
      } />

      <Route path="/les-demande" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <LesDemandes />
        </ProtectionRoute>
      } />

      <Route path="/profil-prestataire" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <ProfilDuPrestataire />
        </ProtectionRoute>
      } />

      <Route path="/ajouter-service-prestataire" element={
        <ProtectionRoute allowedRoles={['prestataire']}>
          <AjouterServicesPrestataire />
        </ProtectionRoute>
      } />
    </Routes>


  )
}
export default App