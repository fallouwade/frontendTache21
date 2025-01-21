

import { BrowserRouter, Routes, Route } from "react-router";
import PageCommunautaire from "./pagesCommunautaire/PageCommunautaire";
import Connection from "./AuthentificationClient/connexion/Connection";
import Inscription from "./AuthentificationClient/inscription/Inscription";
import MotDePasseOublie from "./AuthentificationClient/forgetPassword/MotDePasseOublie";


function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageCommunautaire />} />
          <Route path="/connexion" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App





