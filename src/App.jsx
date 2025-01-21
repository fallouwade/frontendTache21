
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Page/PageAdmin/dashboard/Dashboard";
import Clients from "./Page/PageAdmin/clients/Clients";
import Prestataire from "./Page/PageAdmin/prestataires/Prestataire";
import Categorie from "./Page/PageAdmin/categorie/Categorie";
import ProfilProstataire from "./Page/PageAdmin/prestataires/profilProstataire/ProfilProstataire";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/prestataire/profil" element={<ProfilProstataire />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/categories" element={<Categorie />} />
      </Routes>
  )
}

export default App
