
import { useParams } from "react-router-dom"
import Layout from "../components/Layout"

const DetailDemande = () => {
  const { id } = useParams()

  return (
    <Layout>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 pt-6 mt-6">Détail d'une demande</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="font-semibold text-gray-600">Nom</p>
            <p className="text-gray-800">Tidiany</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Prénom</p>
            <p className="text-gray-800">Mouhamed</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Service demandé</p>
            <p className="text-gray-800">Plomberie</p>
          </div>
          <div>
            <p className="font-semibold text-gray-600">Date</p>
            <p className="text-gray-800">12/02/2025</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Téléphone</p>
          <p className="text-gray-800">789653214</p>
        </div>
        <div>
          <p className="font-semibold text-gray-600">Localisation</p>
          <p className="text-gray-800">Dakar</p>
        </div>
        <div className="col-span-2 mt-4">
          <p className="font-semibold text-gray-600">Description</p>
          <p className="text-gray-800">
            Une toilette qui fuit, entraînant une augmentation de ma facture d'eau du à un flotteur défectueux ou un
            joint d'étanchéité usé. Je souhaite un remplacement de ces pièces pour résoudre le problème.
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