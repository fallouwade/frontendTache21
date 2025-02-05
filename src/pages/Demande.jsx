import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import { Link, useNavigate, useParams } from "react-router-dom"

const Demande = () => {
  const [demande, setDemande] = useState({});
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { id } = useParams();

  // recupérer les demandes
  const fetchDemandeData = async () => {
    if (!token) {
      setError("Token manquant. Veuillez vous reconnecter.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.get("https://backendtache21.onrender.com/api/demandeservices/demande-prestataire", {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        }
      });

      const dataDemande = response.data;
      console.log("Données reçues :", dataDemande);
      setDemande(dataDemande);
      setIsLoading(false);
      setUpdate(prev => !prev); // Force un re-render
    } catch (error) {
      setError(error.response ? error.response.dataDemande: "Erreur de chargement");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDemandeData();
  }, [update]);

  if (isLoading) {
    return <p className="text-center text-gray-700">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }
  // fonction de mis à jour
  // const handleUpdate = (id) => {
  //   navigate(`/editerprofil/${id}`)
  // }
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 mt-10">Liste des demandes</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adresse
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">{demande.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{demande.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{demande.adresse}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/detail/${id}`}
                    // `/view/${id}`}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Voir
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Demande

