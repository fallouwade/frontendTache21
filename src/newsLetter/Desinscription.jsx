import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

const Desinscription = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // État de chargement
    const navigate = useNavigate();

    const handleDesinscription = async () => {
        setLoading(true); // Lancement du chargement
        try {
            const response = await fetch("https://backendtache21.onrender.com/api/newsletter/desinscrire", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);

            // Rediriger après quelques secondes
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            setMessage("Une erreur est survenue.");
        } finally {
            setLoading(false); // Fin du chargement
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">
                {/* Espace pour le logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo JOKKALE" className="w-24 h-24 object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-yellow-400">Désinscription de JOKKALE</h2>
                
                {email ? (
                    <>
                        <p className="text-gray-600 my-4">
                            Vous êtes sur le point de vous désinscrire de notre newsletter.
                        </p>
                        <button
                            onClick={handleDesinscription}
                            className={`bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition ${loading ? 'cursor-wait' : ''}`}
                            disabled={loading} // Désactiver le bouton pendant le chargement
                        >
                            {loading ? (
                                <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 border-solid border-white rounded-full"></div>
                            ) : (
                                'Confirmer ma désinscription'
                            )}
                        </button>
                    </>
                ) : (
                    <p className="text-gray-600">Aucun email spécifié.</p>
                )}

                {message && <p className="mt-4 text-gray-700">{message}</p>}
            </div>
        </div>
    );
};

export default Desinscription;
