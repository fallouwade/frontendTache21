

import React from 'react';
import Inscription from './AuthentificationClient/inscription/Page';
import Connection from './AuthentificationClient/connexion/Page';
import MotDePasseOublie from './AuthentificationClient/forgetPassword/Page';
import PageCommunaitaire from './pagesCommunautaire/Page.jsx'
// import Utilisateur from './PagesClient/Utilisateur';

import { BrowserRouter, Routes, Route } from "react-router";


function App() {

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageCommunaitaire />} />
          <Route path="/connexion" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App





