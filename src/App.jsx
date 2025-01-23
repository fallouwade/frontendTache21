import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Accueil from "./pages/Accueil";
import Dashboard from "./pages/Dashboard";
import Demande from "./pages/Demande";
import Profil from "./pages/Profil";
import EditerProfil from "./pages/EditerProfil";
import DetailDemande from "./pages/DetailDemande";
function App() {
    return (
        <>
            {/* <Navbar /> */}
            <BrowserRouter>
                <div className="App">
                    <Routes>
                    <Route exact path="/" element={<Accueil />}/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pages/profil" element={<Profil />} />
                    <Route path="/pages/editer" element={<EditerProfil />} />
                    <Route  path="/pages/demande" element={<Demande />}/>
                    <Route  path="/pages/detaildemande/:id" element={<DetailDemande />}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}
export default App;