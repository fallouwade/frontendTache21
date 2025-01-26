

import Layout from "../components/Layout";
import Image from '/images/electricien.jpg'
import { Link } from "react-router-dom";


const Profil = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Profil</h1>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-8">Informations personnelles</h2>
          <div className="grid grid-cols-2 ">
            <div className="mb-3">
              <p className="font-semibold text-gray-600">Nom</p>
              <p className="text-gray-800 flex flex-wrap">Tidiany</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Prénom</p>
              <p className="text-gray-800">Mouhamed</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Téléphone</p>
              <p className="text-gray-800">789653214</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email</p>
              <p className="text-gray-800">mouhamedtidiany02@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <img src={Image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center mb-2">Mouhamed Tidiany</h2>
          <p className="text-gray-600 text-center mb-4">Entreprise général de plomberie</p>
          <p className="text-center mb-4">Plomberie professionel Tuyauterie appareillage assainissement et divers</p>
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


