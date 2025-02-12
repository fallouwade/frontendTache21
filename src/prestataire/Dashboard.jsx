import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarPrestataire from "./SidebarPrestataire";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaBell, FaClipboardList, FaClock, FaThumbsUp, FaThumbsDown, FaTimes } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const aggregateServicesByMonth = (services) => {
  const monthData = {};
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  services.forEach(service => {
    const date = new Date(service.date);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const monthName = `${months[monthIndex]}/${year}`;
    monthData[monthName] = (monthData[monthName] || 0) + 1;
  });

  const sortedMonths = Object.keys(monthData)
    .sort((a, b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');
      return yearA !== yearB 
        ? parseInt(yearA) - parseInt(yearB)
        : months.indexOf(monthA) - months.indexOf(monthB);
    });

  return {
    labels: sortedMonths,
    data: sortedMonths.map(month => monthData[month])
  };
};

export default function Dashboard() {
    const [services, setServices] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Demandes',
            data: [],
            borderColor: '#4ade80',
            backgroundColor: 'rgba(74, 234, 128, 0.2)',
            tension: 0.3,
            fill: true,
        }]
    });
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchServicesAndNotifications = async () => {
            try {
                const response = await axios.get('https://backendtache21.onrender.com/api/demandes-services/clientAll');
                const prestataireId = JSON.parse(atob(token.split('.')[1])).id;
                const prestataireServices = response.data.demandes.filter(
                    service => service.prestataire.id === prestataireId
                );
                
                setServices(prestataireServices);
                
                const monthlyData = aggregateServicesByMonth(prestataireServices);
                setChartData({
                    labels: monthlyData.labels,
                    datasets: [{
                        label: 'Nombre des demandes',
                        data: monthlyData.data,
                        borderColor: '#4ade80',
                        backgroundColor: 'rgba(74, 234, 128, 0.2)',
                        tension: 0.3,
                        fill: true,
                    }]
                });

                const newNotifications = prestataireServices
                    .filter(service => service.statut === 'attente')
                    .slice(-5)
                    .map((service) => ({
                        id: `notif-${service.id}`,  // Use actual service ID instead of index
                        text: `Nouvelle demande: ${service.typeService}`,
                        type: 'info'
                    }));
                setNotifications(newNotifications);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        };

        fetchServicesAndNotifications();
    }, [token]);
     console.log(services);
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

    const removeNotification = (id) => {
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    return (
        <SidebarPrestataire>       
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Tableau de bord</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaClipboardList className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Total Demandes</h2>
                        <p className="text-2xl sm:text-3xl font-bold">{services.length}</p>
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaClock className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">En Attente</h2>
                        <p className="text-2xl sm:text-3xl font-bold">
                            {services.filter(service => service.statut === 'attente').length}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaThumbsUp className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Acceptées</h2>
                        <p className="text-2xl sm:text-3xl font-bold">
                            {services.filter(service => service.statut === 'accepte').length}
                        </p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 rounded-lg shadow-md flex items-center transform hover:scale-105 transition-transform duration-300">
                    <FaThumbsDown className="text-2xl sm:text-3xl mr-3" />
                    <div>
                        <h2 className="text-base sm:text-lg font-semibold">Refusées</h2>
                        <p className="text-2xl sm:text-3xl font-bold">
                            {services.filter(service => service.statut === 'refuse').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-xl font-semibold mb-4 text-center">Graphique des Demandes</h2>
                    <Line data={chartData} options={options} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-full max-h-94 overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4 text-center">Notifications</h2>
                    <div className="space-y-3">
                        {notifications.length > 0 ? (
                            notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`flex items-center justify-between p-3 rounded-md text-sm sm:text-base shadow-sm transition-all duration-300 transform hover:scale-105 bg-blue-100 text-blue-800`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <FaBell className="text-lg" />
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