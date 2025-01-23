import {MdOutlineHomeRepairService} from "react-icons/md";
import {BiMessageDots} from "react-icons/bi";
import UserChart from "./UserChart";
import {LuUsers} from "react-icons/lu";
import CardAdmin from "./CardAdmin";
import ReservationChart from "./ReservationChart";

export default function DashboardContent() {
  return (
        <div className="w-full p-4 sm:p-0">
            {/* Blocs d'information totale */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CardAdmin 
                        titre="Utilisateurs totaux" 
                        titrePourcent="utilisateurs actifs" 
                        pourcent="0" 
                        icone={<LuUsers className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600"/>}
                        color="border-l-4 border-blue-500 rounded-lg"
                    />
                    <CardAdmin 
                        titre="Services totaux" 
                        titrePourcent="Services actifs" 
                        pourcent="0" 
                        icone={<MdOutlineHomeRepairService 
                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600"/>} 
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
            <div className="flex flex-col md:flex-row mt-3">
                <div className="w-full md:w-6/12">
                    <UserChart />
                </div>
                <div className="w-full md:w-6/12">
                    <div className="w-full max-w-4xl mx-auto p-2">
                        <div className="rounded-lg shadow-lg">
                            <ReservationChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}