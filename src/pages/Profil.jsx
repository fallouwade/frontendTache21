import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios"
import Image from '/images/electricien.jpg'
import { Link } from "react-router-dom";

const Profil = () => {
  const [formData, setFormData] = useState({})
  const token = JSON.parse(localStorage.getItems())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // fetch("https://backendtache21.onrender.com/api/prestataires/profil-prestataire", {
    //   method: 'GET',
    // })
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data, "formData");
    //   setFormData(data.data);
    // })
    const fetchPrestataireData = async () =>{
      try {
        const response = await axios.get("https://backendtache21.onrender.com/api/prestataires/profil-prestataire", {
          nom: formData.nom,
          prenom: formData.nom,
          email: formData.nom,
          telephone: formData.nom,
          
        },{
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(get)
        })
        const data = await response.json()
        setUserData(data)
        setIsLoading(false)
        .then(() => {
          Navigate('/profil')
        });
      } catch (error) {
        setError(error.response ? error.response.data : "Une erreur est survenue")
        setIsLoading(false)
      }
    };
    fetchPrestataireData()
  
  }, [])
  // if (isLoading){
  //   return (
  //     <Layout>
  //       <div className="text-center mt-8">Chargement...</div>
  //     </Layout>
  //   )
  // }
  // if (error){
  //   return(
  //     <Layout>
  //       <div className="text-center mt-8 text-red-500">Erreur: {error}</div>
  //     </Layout>
  //   )
  // }
  
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 mt-10">Profil</h1>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Informations personnelles</h2>
          <div className="grid grid-cols-2 ">
            <div className="mb-3">
              <p className="font-semibold text-gray-600">Nom</p>
              <p className="text-gray-800 flex flex-wrap">{formData.nom}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Prénom</p>
              <p className="text-gray-800">{formData.prenom}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Téléphone</p>
              <p className="text-gray-800">{formData.telephone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="text-gray-800">{formData.email}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <img src={Image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">{formData.prenom}</h2>
          <p className="text-gray-600 text-center mb-4">{formData.nomDeLEntreprise}</p>
          <p className="text-center mb-4">{formData.description}</p>
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

export default Profil;
