import { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa6";
import CardProst from "./CardProst";

export default function CardsClient({clients}) {
  const [clientMoisPasse, setClientMoisPasse] = useState(null);
  const [clientMoisActuel, setClientMoisActuel] = useState(null);

  useEffect(() => {
    // Récupérer la date actuelle
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Mois actuel
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Mois précédent (décembre = 11)
    const currentYear = currentDate.getFullYear();

    // Créer les bornes de début et de fin pour le mois passé
    const startOfPreviousMonth = new Date(currentYear, previousMonth, 1);
    const endOfPreviousMonth = new Date(currentYear, previousMonth + 1, 0); // Dernier jour du mois précédent

    // Créer les bornes de début et de fin pour le mois actuel
    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const endOfCurrentMonth = new Date(currentYear, currentMonth + 1, 0); // Dernier jour du mois actuel

    // Filtrer les clients pour le mois passé (entre le début et la fin du mois précédent)
    const clientsMoisPasse = clients.filter(client => {
      const clientDate = new Date(client.createdAt); // On se base sur la date `createdAt`
      return clientDate >= startOfPreviousMonth && clientDate <= endOfPreviousMonth;
    });

    // Filtrer les clients pour le mois actuel (entre le début et la fin du mois actuel)
    const clientsMoisActuel = clients.filter(client => {
      const clientDate = new Date(client.createdAt); // On se base sur la date `createdAt`
      return clientDate >= startOfCurrentMonth && clientDate <= endOfCurrentMonth;
    });

    // Mettre à jour les états avec le nombre de clients
    setClientMoisPasse(clientsMoisPasse.length);
    setClientMoisActuel(clientsMoisActuel.length);
  }, [clients]);

 
  return (
    <>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst
          color="bg-blue-400 text-white text-base md:text-lg"
          titre="Total clients"
          icone={<FaUsers />}
          description="Utilisteurs inscrits"
          nombre={clients.length}
        />
      </div>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst
          color="bg-green-400 text-white text-base md:text-lg"
          titre="Total clients - mois passé"
          icone={<FaUsers />}
          description="Clients inscrits"
          nombre={clientMoisPasse}
        />
      </div>
      <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 p-6">
        <CardProst
          color="bg-[#14e3ca] text-white text-base md:text-lg"
          titre="Total clients - mois en cours"
          icone={<FaUsers />}
          description="Clients inscrits"
          nombre={clientMoisActuel}
        />
      </div>
    </>
  );
} 