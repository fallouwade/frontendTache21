
import { useState, useEffect } from "react";
import Image from '/images/electricien.jpg'

import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const EditerProfil = () => {



    //   const [nom, setNom] = useState("")
    //   const [prenom, setPrenom] = useState("")
    //   const [email, setEmail] = useState("")
    //   const [telephone, setTelephone] = useState("")

    //   const handleSubmit = (e) => {

    //     e.preventDefault()
    //     // Handle form submission
    //     console.log({ nom, prenom, email, telephone })
    //   }
    const [userData, setUserData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        entreprise: "",
        description: "",
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://backendtache21.onrender.com/api/utilisateurs/devenir-prestataire")
                if (!response.ok) {
                    throw new Error("Impossible de récupérer vos données")
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    // mis à jour du profil utiisateur
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSaving(true)
        try {
            const response = await fetch("https://backendtache21.onrender.com/api/utilisateurs/devenir-prestataire", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                throw new Error("Votre profil n'a pas été mis à jour")
            }

            navigate("/profil")
        } catch (err) {
            setError(err.message)
        } finally {
            setIsSaving(false)
        }
    }
    // affichage des données si la requete renvoie true
    if (isLoading) {
        return (
            <Layout>
                <div className="text-center mt-8">Chargement...</div>
            </Layout>
        )
    }
    // affichage d'une erreur si la requete est fausse
    if (error) {
        return (
            <Layout>
                <div className="text-center mt-8 text-red-500">Erreur: {error}</div>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 pt-6 mt-6">Editer Profil</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="nom"
                                    value={userData.nom}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    id="prenom"
                                    value={userData.prenom}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    value={userData.telephone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img src={Image} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-center mb-2">{`${userData.prenom} ${userData.nom}`}</h2>
                    <p className="text-gray-600 text-center mb-4">{userData.entreprise}</p>
                    <p className="text-center mb-4">{userData.description}</p>
                    <a
                        href="/profil"
                        className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                    >
                        Voir Profil
                    </a>
                </div>
            </div>
        </Layout>
    )
}

export default EditerProfil
