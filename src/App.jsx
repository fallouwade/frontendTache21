import Inscription from './registre-client/Inscription';
import Connection from './registre-client/Connection';
import MotDePasseOublie from './registre-client/MotDePasseOublie';
import { BrowserRouter, Routes, Route } from "react-router";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connection />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/motdepasseoublie" element={<MotDePasseOublie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
