import { Route, Routes } from "react-router-dom";

import Communautaire from "./Pages/Communautaire.jsx";
import Client from "./Pages/Client.jsx";
import Connection from "./Authentification/PagesConnexion/Connection.jsx";
import Inscription from "./Authentification/InscriptionPrestataire/Inscription.jsx";
import MotDePasseOublie from "./Authentification/PagesPassword/MotDePasseOublie.jsx";
import Signup from "./Authentification/InscriptionClient/Signup.jsx";

import Categorie from "./Pages/PageAdmin/categorie/Categorie.jsx";
import InfoClients from "./Pages/PageAdmin/clients/InfoClients.jsx";
import { DashboardAdmin } from "./Pages/PageAdmin/dashboard/DashboardAdmin.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Communautaire />} />

      <Route path="/connexion" element={<Connection />} />

      {/* //Inscription Prestataire */}
      <Route path="/inscription" element={<Inscription />} />

      <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />

      {/* Inscription Client */}
      <Route path="/signup" element={<Signup />} />

      <Route path="/Client" element={<Client />} />

      <Route path="/categorie" element={<Categorie />} />

      <Route path="/infoClient" element={<InfoClients />} />

      <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
    </Routes>
  );
}

export default App;
