
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Composants/adminComposants/dashboard/Dashboard";
import Clients from "./Composants/adminComposants/clients/Clients";
import Prestataire from "./Composants/adminComposants/prestataires/prestataire";
import Services from "./Composants/adminComposants/Services/Services";
import Categorie from "./Composants/adminComposants/categorie/Categorie";
import Avis from "./Composants/adminComposants/Avis/Avis";
import ProfilProstataire from "./Composants/adminComposants/prestataires/profilProstataire/ProfilProstataire";
import Utilisateur from './Page/Utilisateur';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/prestataire/profil" element={<ProfilProstataire />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/categories" element={<Categorie />} />
        <Route path="/" element={<Utilisateur />} />

          {/* <Route path="/" element={<PageCommunait />} /> */}
          {/* <Route path="/connexion" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/motdepasseoublie" element={<MotDePasseOublie />} /> */}
      </Routes>
  )
}

export default App
