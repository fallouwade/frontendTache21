import { MdOutlineHomeRepairService } from "react-icons/md";
import { BiMessageDots } from "react-icons/bi";
import UserChart from "./UserChart";
import { LuUsers } from "react-icons/lu";
import CardAdmin from "./CardAdmin";
import ReservationChart from "./ReservationChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardContent() {
    const [donneesClients, setDonneesClients] = useState([]);
    const [totaleClients, setTotalClients] = useState(0);
    const [loading, setLoading] = useState(true);
    const [erreur, setErreur] = useState(null);
    const token = localStorage.getItem('token');

    // Fonction pour récuperer les infos utilisateurs
    const reccupUtilisateur = async (token) => {
        const API_URL = 'https://backendtache21.onrender.com/api/statistiques/liste-utilisateurs';

        try {
            const response = await axios.get(
                API_URL,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs : ', error);
            throw error;
        }
    }

    useEffect(() => {
        const chargeDonnees = async () => {
            try {
                const resultat = await reccupUtilisateur(token);
                // Formater les clients avec leur rôle
                const clients = (resultat.clients || []).map(client => ({
                    ...client,
                    role: 'client'
                }));

                // Formater les prestataires avec leur rôle
                const prestataires = (resultat.prestataires || []).map(prestataire => ({
                    ...prestataire,
                    role: 'professional'  // Assurez-vous que c'est exactement 'professional'
                }));


                const utilisateurs = [...clients, ...prestataires];
                setDonneesClients(utilisateurs);

                const totalUtilisateurs = resultat.totalClients + resultat.totalPrestataires;
                setTotalClients(totalUtilisateurs);

                setLoading(false);
            } catch (error) {
                setErreur(error.message);
                setLoading(false);
            }
        };

        chargeDonnees();
    }, [token])

    if (loading) return <div>Chargement...</div>;
    if (erreur) return <div>Erreur : {erreur}</div>;

    return (
        <div className="w-full p-4 sm:p-0">
            {/* Blocs d'information totale */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardAdmin
                        titre="Utilisateurs totaux"
                        titrePourcent="utilisateurs actifs"
                        pourcent="0"
                        totalUsers={totaleClients}
                        icone={<LuUsers className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />}
                        color="border-l-4 border-blue-500 rounded-lg"
                    />
                    <CardAdmin
                        titre="Services totaux"
                        titrePourcent="Services actifs"
                        pourcent="0"
                        icone={<MdOutlineHomeRepairService
                            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />}
                        color="border-l-4 border-green-400 rounded-lg h-full"
                    />
                    <CardAdmin
                        titre="Utilisateurs bloqué"
                        titrePourcent="Des utilisateurs"
                        pourcent="0"
                        icone={<LuUsers className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600" />}
                        color="border-l-4 border-red-500 rounded-lg"
                    />
                    <CardAdmin
                        titre="Nouveaux avis"
                        titrePourcent="Avis rejeter"
                        pourcent="0"
                        icone={<BiMessageDots className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />}
                        color="border-l-4 border-green-500 rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row mt-5 p-4 mb-10">
                <div className="w-full d:w-6/12">
                    <UserChart data={donneesClients} />
                </div>
                <div className="w-full d:w-6/12">
                    <ReservationChart />
                </div>
            </div>
        </div>
    )
}