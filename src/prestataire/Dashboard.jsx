import { useState } from 'react';
import SidebarPrestataire from "./SidebarPrestataire";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaBell, FaCheckCircle, FaTimesCircle, FaClipboardList, FaClock, FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const data = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Demandes par mois',
                data: [10, 20, 15, 30, 40, 50],
                borderColor: '#4ade80',
                backgroundColor: 'rgba(74, 234, 128, 0.2)',
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw} demandes`;
                    },
                },
            },
        },
    };

    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Nouvelle demande urgente.', type: 'info' },
        { id: 2, text: 'Demande de peinture en attente.', type: 'success' },
        { id: 3, text: 'Demande de jardinage refusée.', type: 'error' },
        { id: 4, text: 'Nouvelle demande urgente.', type: 'info' },
        { id: 5, text: 'Demande de peinture en attente.', type: 'success' },
        { id: 6, text: 'Demande de jardinage refusée.', type: 'error' },
    ]);

    // Fonction pour supprimer une notification
    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    return (
        <SidebarPrestataire>       
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Tableau de bord</h1>

            {/* Section des cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaClipboardList className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Demandes</h2>
                        <p className="text-2xl sm:text-3xl font-bold">25</p>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaClock className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">En Attente</h2>
                        <p className="text-2xl sm:text-3xl font-bold">8</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaThumbsUp className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Acceptées</h2>
                        <p className="text-2xl sm:text-3xl font-bold">15</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaThumbsDown className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Refusées</h2>
                        <p className="text-2xl sm:text-3xl font-bold">5</p>
                    </div>
                </div>
            </div>

            {/* Section Graphique + Notifications (Alignées) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Graphique */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-xl font-semibold mb-4 text-center">Graphique des Demandes</h2>
                    <Line data={data} options={options} />
                </div>

                {/* Notifications avec scroll */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-h-96 overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Notifications</h2>
                    <div className="space-y-3">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`flex items-center justify-between p-3 rounded-md text-sm sm:text-base shadow-sm transition-all duration-300 transform hover:scale-105 ${
                                        notif.type === 'info' ? 'bg-blue-100 text-blue-800' 
                                        : notif.type === 'success' ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        {notif.type === 'info' && <FaBell className="text-lg" />}
                                        {notif.type === 'success' && <FaCheckCircle className="text-lg" />}
                                        {notif.type === 'error' && <FaTimesCircle className="text-lg" />}
                                        <p>{notif.text}</p>
                                    </div>
                                    <button 
                                        className="text-gray-600 hover:text-gray-900 transition duration-200" 
                                        onClick={() => removeNotification(notif.id)}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Aucune notification</p>
                        )}
                    </div>
                </div>
            </div>
        </SidebarPrestataire>
    );
}
