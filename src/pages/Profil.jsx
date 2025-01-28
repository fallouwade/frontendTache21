import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { Link } from "react-router-dom"

const Profil = () => {
  // const [nom, setNom] = useState('');
  // const [prenom, setPrenom] = useState('');
  // const [tlephone, setTelephone] = useState('');
  // const [email, setEmail] = useState('');
  // const [adresse, setAdresse] = useState('');
  // const [ville, setVille] = useState('');
  // const [description, setDescription] = useState('');

  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://backendtache21.onrender.com/api/utilisateurs/connexion", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any necessary authentication headers here
          },
        })
        if (!response.ok) {
          throw new Error("Pas de données")
        }
        const data = await response.json()
        setUserData(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center mt-8">Chargement...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center mt-8 text-red-500">Erreur: {error}</div>
      </Layout>
    )
  }
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 mt-10">Profil du Prestataire</h1>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Informations personnelles</h2>
          <div className="grid grid-cols-2 ">
            <div className="mb-3">
              <p className="font-semibold text-gray-600">Nom</p>
              <p className="text-gray-800 flex flex-wrap">{userData.nom}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Prénom</p>
              <p className="text-gray-800">{userData.prenom}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Téléphone</p>
              <p className="text-gray-800">{userData.telephone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="text-gray-800">{userData.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Adresse</p>
              <p className="text-gray-800">{userData.adresse}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Ville</p>
              <p className="text-gray-800">{userData.ville}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={userData.photo || "/placeholder.svg?height=128&width=128"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center mb-2">
            {userData.prenom} {userData.nom}
          </h2>
          <p className="text-gray-600 text-center mb-4">{userData.nomEntreprise}</p>
          <p className="text-center mb-4">{userData.description}</p>
          <Link
            to="/editerprofil"
            className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Editer Profil
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Profil

