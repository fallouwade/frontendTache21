
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Layout from "../components/Layout"
import { useEffect, useState } from "react"

const DetailDemande = () => {
  const { id } = useParams();
  const [detaildemande, setDetailDemande] = useState();
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // fonction de recupération des demandes
  const fetchDetailDemande = async () => {
    if (!token) {
      setError("Token manquant. Veuillez vous reconnecter.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get("", {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`,
        }
      });

      const data = response.data;
      console.log("Données reçues :", data);
      setDetailDemande(data);
      setIsLoading(false);
      setUpdate(prev => !prev); // Force un re-render
    } catch (error) {
      setError(error.response ? error.response.data : "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailDemande();
  }, [id]);
  if (isLoading) {
    return <p className="text-center text-gray-700">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 pt-6 mt-6">Détail d'une demande</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold text-gray-600">Nom</p>
            <p className="text-gray-800">{detaildemande.nom}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Prénom</p>
            <p className="text-gray-800">{detaildemande.prenom}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Service demandé</p>
            <p className="text-gray-800">{detaildemande.servicedemande}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Date</p>
            <p className="text-gray-800">{detaildemande.date}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Téléphone</p>
          <p className="text-gray-800">{detaildemande.telephone}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Localisation</p>
          <p className="text-gray-800">{detaildemande.localisation}</p>
        </div>
        <div className="col-span-2 mt-4">
          <p className="font-semibold text-gray-600">Description</p>
          <p className="text-gray-800">
            {detaildemande.description}
          </p>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Valider</button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Rejeter</button>
      </div>
    </Layout>
  )
}

export default DetailDemande

