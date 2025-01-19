import React from 'react';
import Services from './Cards';
import InputSearch from './InputSearch';
import Professions from './Allservices';
import SatisfactionGuarantee from './Satisfaction';
import Navbar from '../../Composants/Navbar/Navbar';
import Footer from '../../Composants/Footer/Footer';

const PageCommunautaire = () => {
  return (
    <div>
      {/* navbar  */}
      <div className=''>
        <Navbar />
      </div>
      <div className="relative w-full h-screen mb-10">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover bg-opacity-40"
          autoPlay
          muted
          playsInline
          loop
          src="/src/images/gettyimages-2180909650-640_adpp.mp4"
          style={{ objectFit: 'cover', zIndex: -1 }}
        ></video>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 px-8 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-screen-xl mx-auto">
            <div className="text-center sm:text-left">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
                Besoin d'un <span className="text-yellow-400">professionnel</span> près de chez vous ?
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-white">
                Trouvez rapidement des plombiers, électriciens, coiffeurs, enseignants et bien plus,
                disponibles dans votre région, en quelques clics !
              </p>
            </div>
          </div>
        </div>
      </div>


      <div>
        <div>
          <InputSearch />
        </div>

        <div>
          <Professions />
        </div>

        <div>
          <Services />
        </div>
        {/* section temoignages */}
        <div className=''>
          <div className="w-full px-4 md:px-8 py-8 md:py-12">
            <h1 className="text-xl md:text-2xl text-green-800 font-medium mb-8 md:mb-16">
              Découvrez ce que disent les clients satisfaits de notre plateforme
            </h1>

            <div className="flex flex-col gap-8 md:gap-16">
              {/* Première rangée */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Ndeye Ngone Gningue</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Vitalii a assemblé pour moi la commode à tiroirs IKEA Norli en moins de 30 minutes,
                    et il a également assemblé une étagère en fil métallique en environ 10 minutes.
                    Il a également fixé un tiroir sur un...
                  </p>
                  <span className="text-green-600 font-medium">Assemblage de meubles </span>
                </div>

                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Abdoulaye Diouf</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    David a fait un travail formidable en assemblant un berceau et une commode pour
                    la chambre de bébé. J'apprécie vraiment ça ! Il a nettoyé la zone après son travail,
                    a organisé les boîtes pour une élimination facil...
                  </p>
                  <span className="text-green-600 font-medium">Installation de portes</span>
                </div>
              </div>

              {/* Deuxième rangée */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Fallou Wade</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    J'ai engagé Joe pour réparer 2 trous sur mon mur et 1 trou sur mon plafond.
                    Joe a été très bon en communication, il a été rapide, professionnel et a fait
                    un travail fantastique. Il est même revenu po...
                  </p>
                  <span className="text-green-600 font-medium">Réparation de murs</span>
                </div>

                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Mouhamed Gueye</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Mouhamed était fantastique ! Il est venu avec tout l'équipement nécessaire
                    pour faire le travail, même le matériel dont je ne savais pas que j'aurais besoin.
                    Il a parfaitement accroché un lustre...
                  </p>
                  <span className="text-green-600 font-medium">Installation électrique</span>
                </div>
              </div>

              {/* Troisième rangée */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Abdou Khoudoss Mbacke</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Service exceptionnel ! Le montage de ma cuisine  a été fait avec une précision
                    remarquable. Tout a été installé parfaitement et le travail a été terminé plus tôt
                    que prévu. Je recommande vivement...
                  </p>
                  <span className="text-green-600 font-medium">Montage de cuisine</span>
                </div>

                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Abdourahmane Soilihi</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Une expérience très positive ! Le peintre a fait un travail impeccable dans tout
                    l'appartement. Il a été minutieux, propre et efficace. Les finitions sont parfaites
                    et le résultat dépasse mes attentes...
                  </p>
                  <span className="text-green-600 font-medium">Peinture d'intérieur</span>
                </div>
              </div>

              {/* Quatrième rangée */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Alimatou Sow</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Excellent service de plomberie ! Le problème a été diagnostiqué rapidement et
                    réparé efficacement. Le plombier était professionnel, ponctuel et a laissé
                    l'espace de travail impeccable après son intervention...
                  </p>
                  <span className="text-green-600 font-medium">Plomberie</span>
                </div>

                <div className="w-full md:w-[500px]">
                  <div>
                    <span className="text-lg font-medium">Ali</span>
                    <div className="flex gap-1 text-yellow-400 my-2">
                      ★ ★ ★ ★ ★
                    </div>
                  </div>
                  <p className="text-gray-700 my-4 line-clamp-4">
                    Service de déménagement parfait ! L'équipe était ponctuelle, efficace et très
                    soigneuse avec mes meubles. Ils ont géré le transport avec professionnalisme et
                    ont tout installé exactement comme demandé...
                  </p>
                  <span className="text-green-600 font-medium">Déménagement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Satisfaction garantie  */}
        <div>
          <SatisfactionGuarantee />
        </div>
      </div>
      {/* Footer  */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageCommunautaire;
