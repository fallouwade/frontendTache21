
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Composants/admin/dashboard/Dashboard";
import Clients from "./Composants/admin/clients/Clients";
import Prestataire from "./Composants/admin/prestataires/prestataire";
import Categorie from "./Composants/admin/categorie/Categorie";
import Avis from "./Composants/admin/Avis/Avis";
import ProfilProstataire from "./Composants/admin/prestataires/profilProstataire/ProfilProstataire";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/prestataire/profil" element={<ProfilProstataire />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/categories" element={<Categorie />} />
      </Routes>
  )
}

export default App
