import Table from "./PageAdmin/tableReutilisable/Table";
import CardProst from "./PageAdmin/Components/CardProst";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Eye } from 'lucide-react';
import { FaUserCheck, FaUserMinus, FaCalendar } from "react-icons/fa6";
import ChartInfosStatus from './PageAdmin/Components/ChartInfosStatus';
import ChartNouveauInscription from './PageAdmin/Components/ChartNouveauInscription';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Prestataire() {
  const [data, setData] = useState([]);
  const [prestataires, setPrestataires] = useState([])
  const [prestatairesDeMois, setPrestatairesDeMois] = useState([]);
  const [prestatairesDeMoisPasse, setPrestatairesDeMoisPasse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "https://backendtache21.onrender.com/api/prestataires/liste-prestataires"

  const columns = [
    {
      header: 'Nom complet',
      accessorKey: 'nomComplet',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Téléphone',
      accessorKey: 'telephone',
    },
  ];

  // Fonction pour obtenir les prestataires du mois précédent
  const reccupPrestatairesMoisPasse = (prestataires) => {
    const now = new Date();
    const lastMonth = now.getMonth() - 1;
    const year = now.getFullYear();
    const adjustedYear = lastMonth === -1 ? year - 1 : year;
    const adjustedMonth = lastMonth === -1 ? 11 : lastMonth;

    return prestataires.filter(prestataire => {
      const createdAt = new Date(prestataire.createdAt);
      return createdAt.getMonth() === adjustedMonth &&
        createdAt.getFullYear() === adjustedYear;
    });
  };

  // Fonction pour obtenir les prestataires du mois en cours
  const reccupPrestataireDeCeMois = (prestataire) => {
    if (!prestataire) return [];

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return prestataire.filter(prestataire => {
      const createdAt = new Date(prestataire.createdAt);
      return createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear;
    });
  };

  // Fonction pour rendre les boutons d'action
  const renderActions = (row) => {
    return (
      <div className="flex gap-2">
        <Link
          to={`profil/${row._id}`}
          className="text-blue-600 hover:text-blue-900 flex items-center gap-2 px-3 py-1 rounded-md"
        >
          <Eye className="h-4 w-4" />
          <span>Détails</span>
        </Link>
      </div>
    );
  };

  useEffect(() => {
    const reccupDonnéePrestataire = async () => {
      try {
        const response = await axios.get(API_URL);
        setPrestataires(response.data);
        // Combiner le nom et le prénom
        const transformedData = response.data.map((item) => ({
          ...item,
          nomComplet: `${item.prenom} ${item.nom}`, // Combinaison prénom + nom
        }));
        setData(transformedData);

        const pres = reccupPrestataireDeCeMois(response.data)
        setPrestatairesDeMois(pres);

        const presMoispasse = reccupPrestatairesMoisPasse(response.data)
        setPrestatairesDeMoisPasse(presMoispasse)
      } catch (err) {
        setError(err.message || "Une erreur est survenue lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    }

    reccupDonnéePrestataire()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full p-4">
        <Link className="w-full">
          <CardProst
            color="text-white bg-blue-400"
            nombre={data.length}
            titre="Total prestataires"
            icone={<FaUserGroup />}
            description="Prestataires inscrits"
          />
        </Link>
        <Link className="w-full">
          <CardProst
            color="text-white bg-red-400"
            nombre="0"
            titre="Total bloqué"
            icone={<FaUserMinus />}
            description="Suspendus"
          />
        </Link>
        <Link className="w-full">
          <CardProst
            color="text-white bg-green-400"
            nombre={prestatairesDeMoisPasse.length}
            titre="Prestataires - mois passé"
            icone={<FaUserCheck />}
            description="Inscrits le mois dernier"
          />
        </Link>
        <Link className="w-full">
          <CardProst
            color="text-white bg-green-600"
            nombre={prestatairesDeMois.length}
            titre="Prestataires - Mois en cours"
            icone={<FaCalendar />}
            description="Inscrits ce mois-ci"
          />
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 w-full p-4">
        <div>
          <ChartNouveauInscription prestataires={data} />
        </div>
        <div>
          <ChartInfosStatus prestataires={prestataires} />
        </div>
      </div>
      <div className="flex w-full mb-10 px-4">
        <Table
          columns={columns}
          data={data}
          title="Listes de prestataires"
          action={renderActions}
        />
      </div>
    </div>
  )
}