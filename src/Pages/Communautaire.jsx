import CardCommunautaire from './PagePublic/Components/CardCommunautaire';

import Allservices from './PagePublic/Components/Allservices';
import Satisfaction from './PagePublic/Components/Satisfaction';
import NavCommunautaire from './PagePublic/Components/NavCommunautaire';
import Temoignages from './PagePublic/Components/Temoignages';
import SearchBar from './Composants/SearchBar';
import Footer from './Composants/Footer';
const Communautaire = () => {
  return (
    <div>
      {/* navbar  */}
      <div className=''>
        < NavCommunautaire />
      </div>
      <div className="relative w-full h-screen mb-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover bg-opacity-40"
          autoPlay
          muted
          playsInline
          loop
          src="/images/gettyimages-2180909650-640_adpp.mp4"
          style={{ objectFit: 'cover', zIndex: -1 }}
        ></video>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 px-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto">
            <div className="text-center sm:text-left">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
                Besoin d'un <span className="text-yellow-400">professionnel</span> près de chez vous ?
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white">
                Trouvez rapidement des plombiers, électriciens, Developpeur freelance, enseignants et bien plus,
                disponibles dans votre région, en quelques clics !
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
         <SearchBar/>
        </div>

        <div>
          <Allservices />
        </div>

        <div>
          <CardCommunautaire/>
        </div>
        {/* section temoignages */}
        <div>
          <Temoignages />
        </div>
        {/* Satisfaction garantie  */}
        <div>
          <Satisfaction />
        </div>
      </div>
      {/* Footer  */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Communautaire;