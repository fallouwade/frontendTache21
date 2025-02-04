
import { useEffect, useState } from 'react';
import axios from 'axios';
import CardsClient from './PageAdmin/Components/CardsClient';
import ChartClient from './PageAdmin/Components/ChartClient';
import Table from './PageAdmin/tableReutilisable/Table';

export default function InfoClients({clientId}) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      header: 'Action',
      accessorKey: 'action',
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
          }))}
          title="Liste de clients"
        />
      </div>
    </div>
  );
}