import {HiOutlineArrowLeft} from 'react-icons/hi';
import Image from '/images/electricien.jpg'
import CardStatic from './PageAdmin/static/CardStatic';
import {Link} from 'react-router-dom';

const ProfilPrestataire = () => {


    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
            <div className="flex justify-between items-center mb-8">
                <Link to={"/dashboardAdmin/prestataire"} className="flex items-center text-gray-600">
                    <HiOutlineArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-1">
                    <div className="text-center mb-6">
                        <img
                            src={Image}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-xl font-bold">Saliou Bâ</h2>
                        <p className="text-gray-600">Electricien </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        Installation, Entretient et réparation des systèmes électriques dans divers environement
                    </p>
                    <div>

                    </div>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2">
                    <div className="mb-6">
                        <h3 className="font-semibold mb-4 text-center border">Informations</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600 text-sm">REGION</p>
                                <p className="font-medium">Dakar</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">ADRESSE E-MAIL</p>
                                <p className="font-medium">salioubâ@gmail.com</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">DEPARTEMENT</p>
                                <p className="font-medium">Pikine</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">TELEPHONE</p>
                                <p className="font-medium">77 712 39 46</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <CardStatic />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button className="flex-1 border border-red-600 text-red-600 hover:bg-red-600 
                                            hover:text-white py-2 rounded-lg transition-all duration-200 transform active:scale-95"
                        >
                            Bloqué
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilPrestataire;