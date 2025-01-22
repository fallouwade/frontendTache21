import { HiOutlineArrowLeft } from 'react-icons/hi';
import LayoutAdmine from '../../layout/LayoutAdmine';

import Image from '../../../../../public/images/electricien'
import CardStatic from './static/CardStatic';
import { Link } from 'react-router-dom';

const ProfilProstataire = () => {
    // const skills = [
    //     'User Interface Designing', 'UX', 'UI',
    //     'Adobe XD', 'Mobile Apps', 'User Research',
    //     'Wireframing', 'Information Architecture'
    // ];

    // const experiences = [
    //     {
    //         service: 'électricité en bâtiment',
    //         approche: 'électricien indépendant',
    //         period: 'Apr 2018',
    //         location: 'Dakar',
    //         color: 'bg-blue-500'
    //     },
    //     {
    //         service: 'Pixel Studio',
    //         approche: 'UI/UX Designer',
    //         period: 'May 2018',
    //         location: 'Dakar',
    //         color: 'bg-pink-500'
    //     },
    //     {
    //         service: 'Retention Studio',
    //         approche: 'Web Designer',
    //         period: 'July 2015',
    //         location: 'Dakar',
    //         color: 'bg-orange-500'
    //     }
    // ];

    return (
        <LayoutAdmine>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-10">
                <div className="flex justify-between items-center mb-8">
                    <Link to={"/prestataire"} className="flex items-center text-gray-600">
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
                            <h3 className="font-semibold mb-4">Informations</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 text-sm">AGE</p>
                                    <p className="font-medium">28 ans</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">ANNEE D'EXPERIENCE</p>
                                    <p className="font-medium">6 ans</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">TELEPHONE</p>
                                    <p className="font-medium">+221 77 199 65 89</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">EMAIL</p>
                                    <p className="font-medium">saliou@gmail.com</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">ADRESSE</p>
                                    <p className="font-medium">Grand yoff, Arafat</p>
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
        </LayoutAdmine>
    );
};

export default ProfilProstataire
;