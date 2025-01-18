import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./Composants/adminComposants/dashboard/Dashboard";
import Clients from "./Composants/adminComposants/clients/Clients";
import Prestataire from "./Composants/adminComposants/prestataires/prestataire";
import Services from "./Composants/adminComposants/Services/Services";
import Categorie from "./Composants/adminComposants/categorie/Categorie";
import Avis from "./Composants/adminComposants/Avis/Avis";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prestataire" element={<Prestataire/>} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/categories" element={<Categorie />} />
      </Routes>
  )
}

export default App