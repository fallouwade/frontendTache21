import { useEffect, useState } from 'react';
import axios from 'axios';
import CardsClient from './PageAdmin/Components/CardsClient';
import ChartClient from './PageAdmin/Components/ChartClient';
import Table from './PageAdmin/tableReutilisable/Table';

export default function InfoClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Aucun token trouvé. Veuillez vous reconnecter.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://backendtache21.onrender.com/api/clients/liste-clients', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        setError(error.response?.data?.message || error.message || 'Une erreur est survenue');
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const columns = [
    {
      header: 'Prenom',
      accessorKey: 'prenom',
    },
    {
      header: 'Nom',
      accessorKey: 'nom',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: "Date d'inscription",
      accessorKey: 'createdAt',
      cell: ({ getValue }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString('fr-FR');
      }
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Section Cards et Graphique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white bg-opacity-10 rounded-lg p-4 shadow-lg">
          <CardsClient clients={clients} />
        </div>
        <div className="bg-white bg-opacity-10 rounded-lg p-4 shadow-lg">
          <ChartClient clients={clients} />
        </div>
      </div>

      {/* Section Tableau */}
      <div className="bg-white bg-opacity-10 rounded-lg shadow-lg overflow-hidden">
        <Table
          columns={columns}
          data={clients}
          title="Liste de clients"
        />
      </div>
    </div>
  );
}