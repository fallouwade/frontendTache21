import LayoutAdmine from "../Layout/LayoutAdmine";
import Table from "../TableRéutilisable/Table";
import CardProst from "./cardPrestataire/CardProst";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaUserCheck, FaUserMinus, FaCalendar } from "react-icons/fa6";
import ChartNouveauInscription from './chartStatic/ChartNouveauInscription';
import ChartInfosStatus from './chartStatic/ChartInfosStatus';
import ProfilProstataire from "./profilProstataire/ProfilProstataire";

export default function Prestataire() {
  const columns = [
    {
      header: 'Nom complet',
      accessorKey: 'fullName',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Téléphone',
      accessorKey: 'phone',
    },
    {
      header: 'Date de naissance',
      accessorKey: 'birthDate',
    },
    {
      header: 'Adresse',
      accessorKey: 'address',
    }
  ];

  const data = [
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      birthDate: '15/04/1990',
      address: '123 Rue Example, Ville',
      action: '<button>Consulter</button>'
    },
    // Ajoutez plus de données ici
  ];

  return (
    <LayoutAdmine>
      <div className="flex flex-col gap-4 items-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 w-full p-4">
          <Link className="w-full">
            <CardProst
              color="text-white bg-blue-400"
              nombre="0"
              titre="Total prestataires"
              icone={<FaUserGroup />}
              description="Prestataires inscrits"
            />
          </Link>
          <Link className="w-full">
            <CardProst
              color="text-white bg-green-400"
              nombre="0"
              titre="Total prestataires Actifs"
              icone={<FaUserCheck />}
              description="Prestataires actifs"
            />
          </Link>
          <Link className="w-full">
            <CardProst
              color="text-white bg-red-400"
              nombre="0"
              titre="Total prestataires inactifs"
              icone={<FaUserMinus />}
              description="inactifs & suspendus"
            />
          </Link>
          <Link className="w-full">
            <CardProst
              color="text-white bg-green-600"
              nombre="0"
              titre="nouveaux prestataires"
              icone={<FaCalendar />}
              description="Nouveaux ce mois"
            />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 w-full p-4">
          <div>
          <ChartNouveauInscription />
          </div>
          <div>
          <ChartInfosStatus />
          </div>
        </div>
        <div className="flex w-full mb-10 p-4">
            <Table columns={columns} data={data} title="Listes de prestataires" routeProfil="/prestataire/profil" />
        </div>
      </div>
    </LayoutAdmine>
  )
}
