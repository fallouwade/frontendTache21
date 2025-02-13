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

  // Colonnes de tableau avec formatage de la date seulement
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
        return date.toLocaleDateString('fr-FR'); // Affiche uniquement la date
      }
    }
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="sm:px-5 mb-10 relative">
      <div className="grid md:grid-cols-2 gap-6 p-4">
        <div className="bg-white bg-opacity-10 rounded-lg relative">
          <CardsClient clients={clients} />
        </div>
        <ChartClient clients={clients} />
      </div>
      <div className="grid grid-cols-1 p-5 md:p-0 mx-8">
        <Table
          columns={columns}
          data={clients}
          title="Liste de clients"
        />
      </div>
    </div>
  );
}
