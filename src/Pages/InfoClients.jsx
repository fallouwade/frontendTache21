
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardsClient from './PageAdmin/Components/CardsClient';
import ChartClient from './PageAdmin/Components/ChartClient';
import Table from './PageAdmin/tableReutilisable/Table';

export default function InfoClients({clientId}) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blockedClients, setBlockedClients] = useState([]); // Liste des clients bloqués
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://backendtache21.onrender.com/api/clients/liste-clients', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setClients(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); 
        setLoading(false);
      });
  }, []);

  const handleBlockClient = (clientId) => {
    setBlockedClients((prevState) => {
      if (prevState.includes(clientId)) {
        return prevState.filter(id => id !== clientId);
      } else {
        return [...prevState, clientId];
      }
    });
  };

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
     
     
      cell: ({ row }) => {
        const clientId = row.original.id; // On récupère l'ID du client
        const isBlocked = blockedClients.includes(clientId);

        return (
          <button 
            onClick={() => handleBlockClient(clientId)} 
            className={`px-4 py-2 text-white ${isBlocked ? 'bg-red-600' : 'bg-blue-600'} rounded`}
          >
            {isBlocked ? 'Débloquer' : 'Bloquer'}
          </button>
        );
      }
    },
  ];

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="sm:px-5 mb-10 relative">
      <div className="grid md:grid-cols-2 gap-6 p-4">
        <div className="bg-white bg-opacity-10 rounded-lg relative">
          <CardsClient clients={clients} />
        </div>
        <ChartClient  clients={clients}/>
      </div>
      <div className="grid grid-cols-1 p-5 md:p-0 mx-8">
        <Table
          columns={columns}
          data={clients.map(client => ({
            ...client,
            isBlocked: blockedClients.includes(client.id), // Ajout de l'état bloqué dans les données
          }))}
          title="Liste de clients"
          action={handleBlockClient} // Passage de l'action ici
        />
      </div>
    </div>
  );
}