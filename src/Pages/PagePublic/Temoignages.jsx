import Slider from "react-slick";

// Importer les styles slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Temoignages = () => {
  // Paramètres de configuration du carousel
  const settings = {
    // dots: true,           
    infinite: true,       
    speed: 500,           
    slidesToScroll: 1,    
    centerMode: true,   
    centerPadding: "0",
    focusOnSelect: true,  
    autoplay: true,     
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-4 md:px-8 py-8 md:py-12 bg-gray-100 flex justify-center shadow-gray-500">
      <div className="w-full max-w-3xl"> 
        <h1 className="text-xl md:text-2xl text-green-800 font-medium mb-8 md:mb-16 text-center">
          Découvrez ce que disent les clients satisfaits de notre plateforme
        </h1>

        <Slider {...settings}>
          {/* Première critique */}
          <div className="flex justify-center items-center ">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Ndeye Ngone Gningue</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Vitalii a assemblé pour moi la commode à tiroirs IKEA Norli en moins de 30 minutes, et il a également assemblé une étagère en fil métallique en environ 10 minutes. Il a également fixé un tiroir sur un...
              </p>
              <span className="text-green-600 font-medium">Assemblage de meubles</span>
            </div>
          </div>

          {/* Deuxième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Abdoulaye Diouf</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                David a fait un travail formidable en assemblant un berceau et une commode pour la chambre de bébé. J'apprécie vraiment ça ! Il a nettoyé la zone après son travail, a organisé les boîtes pour une élimination facil...
              </p>
              <span className="text-green-600 font-medium">Installation de portes</span>
            </div>
          </div>

          {/* Troisième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Fallou Wade</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                J'ai engagé Joe pour réparer 2 trous sur mon mur et 1 trou sur mon plafond. Joe a été très bon en communication, il a été rapide, professionnel et a fait un travail fantastique. Il est même revenu pour...
              </p>
              <span className="text-green-600 font-medium">Réparation de murs</span>
            </div>
          </div>
          {/* Quatrième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Mouhamed Gueye</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Mouhamed était fantastique ! Il est venu avec tout l'équipement nécessaire pour faire le travail, même le matériel dont je ne savais pas que j'aurais besoin. Il a parfaitement accroché un lustre...
              </p>
              <span className="text-green-600 font-medium">Installation électrique</span>
            </div>
          </div>
          {/* Cinquième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Abdou Khoudoss Mbacke</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Service exceptionnel ! Le montage de ma cuisine a été fait avec une précision remarquable. Tout a été installé parfaitement et le travail a été terminé plus tôt que prévu. Je recommande vivement...
              </p>
              <span className="text-green-600 font-medium">Montage de cuisine</span>
            </div>
          </div>
          {/* Sixième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Abdourahmane Soilihi</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Une expérience très positive ! Le peintre a fait un travail impeccable dans tout l'appartement. Il a été minutieux, propre et efficace. Les finitions sont parfaites et le résultat dépasse mes attentes...
              </p>
              <span className="text-green-600 font-medium">Peinture d'intérieur</span>
            </div>
          </div>

          {/* Septième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Alimatou Sow</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Excellent service de plomberie ! Le problème a été diagnostiqué rapidement et réparé efficacement. Le plombier était professionnel, ponctuel et a laissé l'espace de travail impeccable après son intervention...
              </p>
              <span className="text-green-600 font-medium">Plomberie</span>
            </div>
          </div>

          {/* Huitième critique */}
          <div className="flex justify-center items-center">
            <div className="w-full  bg-white p-6 rounded-xl shadow-lg transform transition-all ">
              <div>
                <span className="text-lg font-medium">Ali</span>
                <div className="flex gap-1 text-yellow-400 my-2">★ ★ ★ ★ ★</div>
              </div>
              <p className="text-gray-700 my-4 line-clamp-4">
                Service de déménagement parfait ! L'équipe était ponctuelle, efficace et très soigneuse avec mes meubles. Ils ont géré le transport avec professionnalisme et ont tout installé exactement comme demandé...
              </p>
              <span className="text-green-600 font-medium">Déménagement</span>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};


export default Temoignages;
