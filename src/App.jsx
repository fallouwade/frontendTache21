
import { Route, Routes } from "react-router-dom";
// import Prestataire from "./Pages/admin/prestataires/prestataire";
// import Services from "./Pages/admin/Services/Services";
// import Categorie from "./Pages/admin/categorie/Categorie";
// import Avis from "./Pages/admin/Avis/Avis";
// import ProfilProstataire from "./Pages/admin/prestataires/profilProstataire/ProfilProstataire";
import Public from './Pages/Public';
import Client from './Pages/Client';
import Connection from './Authentification/PagesConnexion/Connection'
import Inscription from "./Authentification/InscriptionPrestataire/Inscription";
import MotDePasseOublie from "./Authentification/PagesPassword/MotDePasseOublie";
import Signup from "./Authentification/InscriptionClient/Signup";




function App() {
  return (

    <Routes>

      <Route path="/" element={<Public />} />

      <Route path="/connexion" element={<Connection />} />

      {/* //Inscription Prestataire */}
      <Route path="/inscription" element={<Inscription />} />

      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />

      {/* Inscription Client */}
      <Route path="/signup" element={<Signup />} />


      <Route path="/Client" element={<Client />} />


      {/* <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/prestataire/profil" element={<ProfilProstataire />} />
        <Route path="/clients" element={<Clients />} />

        <Route path="/services" element={<Services/>} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/categories" element={<Categorie />} /> */}


    </Routes>

   
  )

}

export default App
