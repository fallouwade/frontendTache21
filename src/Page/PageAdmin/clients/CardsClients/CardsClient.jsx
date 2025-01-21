import { FaUsers } from "react-icons/fa6";
import CardProst from "../../prestataires/cardPrestataire/CardProst";

export default function CardsClient() {
  return (
    <>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst 
          color="bg-blue-400 text-white text-base md:text-lg" 
          titre="Total clients" 
          icone={<FaUsers />} 
          description="Utilisteurs inscrits" 
          nombre={10} 
        />
      </div>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst 
          color="bg-green-400 text-white text-base md:text-lg" 
          titre="Total clients - mois passé" 
          icone={<FaUsers />} 
          description="Clients inscrits" 
          nombre={10} 
        />
      </div>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst 
          color="bg-[#14e3ca] text-white text-base md:text-lg" 
          titre="Total clients - mois en cours" 
          icone={<FaUsers />} 
          description="Clients inscrits" 
          nombre={10} 
        />
      </div>
    </>
  );
}