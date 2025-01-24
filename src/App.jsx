import Footer from './Composants/Footer/Footer';
import Navbar from './Composants/Navbar/Navbar';
import './App.css'
import PrestatairePage from './PrestatairePage/PrestatairePage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow">

      </div>
      <Navbar />
      <PrestatairePage />
      <Footer/>
    </div>
  )
}
export default App;