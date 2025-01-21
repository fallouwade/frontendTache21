

import { Route, Routes } from "react-router-dom";
// import { Dashboard } from "./Pages/admin/dashboard";
// import Clients from "./Pages/admin/clients/Clients";
// import Prestataire from "./Pages/admin/prestataires/prestataire";
// import Services from "./Pages/admin/Services/Services";
// import Categorie from "./Pages/admin/categorie/Categorie";
// import Avis from "./Pages/admin/Avis/Avis";
// import ProfilProstataire from "./Pages/admin/prestataires/profilProstataire/ProfilProstataire";
import Utilisateur from './Pages/Utilisateur';

function App() {
  return (
      <Routes>
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/prestataire/profil" element={<ProfilProstataire />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/categories" element={<Categorie />} /> */}
        <Route path="/" element={<Utilisateur />} />

          {/* <Route path="/" element={<PageCommunait />} /> */}
          {/* <Route path="/connexion" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/motdepasseoublie" element={<MotDePasseOublie />} /> */}
      </Routes>

  )
}

export default App
