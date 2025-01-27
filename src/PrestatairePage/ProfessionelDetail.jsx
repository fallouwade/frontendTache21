import React from 'react';
import RatingBadge from './RatingBadge';
import Stats from './Stats';
import Calendar from './Calendar';
import noir from '../images/noir.png';


import { 
  FaTools, 
  FaMapMarkerAlt, 
  FaStar, 
  FaTrophy,
  FaRegCalendarAlt,
  FaRegClock,
  FaWrench,
  FaAward,
  FaFlag,
  FaGem,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const ProfessionelDetails = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="space-y-4 mb-6">
        <h1 className="text-2xl font-semibold">Service plomberie d'urgence 24h/24 - Dakar et environs</h1>
        <div className="flex items-center gap-2 text-sm">
          <span>Intervention express</span>
          <span>•</span>
          <span>Intervention 7j/7</span>
          <span>•</span>
          <span>Devis gratuit </span>
        </div>
      </div>
   
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Top Section with Award */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <FaAward className="text-yellow-400 w-5 h-5" />
                <span className="font-medium">Artisan Certifié</span>
              </div>
              <p className="text-gray-600 mt-1">Un des plombiers les mieux notés de votre région </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className="font-semibold">4.99</span>
                <FaStar className="text-yellow-400 w-5 h-5" />
              </div>
              <span className="text-gray-600">562 Interventions</span>
            </div>
          </div>



          {/* Plumber Info */}
          <div className="flex items-center gap-4">
            <img 
              src={noir}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-medium">Plombier Moustapha</h2>
              <p className="text-gray-600">Super-plombier • Plus de 15 ans d'expérience</p>
            </div>
          </div>
          <RatingBadge />
          <Stats />
          {/* Key Features */}
          <div>
            <div className="flex gap-4 items-center p-4 border-b">
              <FaTrophy className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="font-medium">Garantie satisfaction</h3>
                <p className="text-gray-600">Intervention garantie avec assurance décennale.</p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4 border-b">
              <FaTools className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Dépannage rapide</h3>
                <p className="text-gray-600">Intervention en moins d'une heure selon urgence.</p>
              </div>
            </div>

            <div className="flex gap-4 items-center p-4">
              <FaMapMarkerAlt className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Secteur d'intervention</h3>
                <p className="text-gray-600">Dakar et sa proche banlieue.</p>
              </div>
            </div>
          </div>
{/* 
             <h2 className="text-xl font-medium">Disponibilités du plombier</h2>
             <div className="text-gray-600">Sélectionnez une date d'intervention</div>
            <div className="flex justify-between items-center my-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-medium">Mars 2025</span>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div> */}

            <Calendar />

            {/* <div className="border rounded-lg p-4">
  <div className="grid grid-cols-7 gap-2 text-center">
    <div className="text-sm text-gray-500">Lun.</div>
    <div className="text-sm text-gray-500">Mar.</div>
    <div className="text-sm text-gray-500">Mer.</div>
    <div className="text-sm text-gray-500">Jeu.</div>
    <div className="text-sm text-gray-500">Ven.</div>
    <div className="text-sm text-gray-500">Sam.</div>
    <div className="text-sm text-gray-500">Dim.</div>
    
    {[...Array(35)].map((_, index) => {
      const day = index - 4; 
      return (
        <div 
          key={index}
          className={`
            text-center p-2 text-sm
            ${day >= 1 && day <= 31 ? '' : 'invisible'}
            ${(day >= 13 && day <= 17) ? 'bg-black text-white rounded-full' : ''}
          `}
        >
          {day >= 1 && day <= 31 ? day : ''}
        </div>
      );
    })}
  </div>
</div> */}

          <div className="space-y-4">
            
            <div className="border rounded-xl p-4 mt-6">
              <div className="flex gap-3">
                <FaGem className="w-6 h-6 text-rose-500 flex-shrink-0" />
                <div>
                   <h3 className="font-medium">Expert reconnu</h3>
                     <p className="text-gray-600">
                      Ce plombier est très demandé dans votre secteur.
                     </p>
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:underline cursor-pointer mt-4">
              <FaFlag className="w-4 h-4" />
              <span>Signaler cette annonce</span>
            </div>
          </div>
        </div>

<div className="border rounded-xl p-6 shadow-lg h-fit bg-white sticky top-4">
  <div className="space-y-4">
    <div>
      <span className="text-2xl font-semibold">60 €</span>
      <span className="text-gray-600"> /intervention</span>
    </div>

    <div className="border rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 border-b">
        <div className="p-3 border-b sm:border-r">
          <div className="text-xs text-gray-500">DISPONIBLE</div>
          <div className="flex items-center gap-2">
            <FaRegCalendarAlt className="w-4 h-4 text-gray-500" />
            <span>Aujourd'hui</span>
          </div>
        </div>
        <div className="p-3 border-t sm:border-t-0">
          <div className="text-xs text-gray-500">HORAIRES</div>
          <div className="flex items-center gap-2">
            <FaRegClock className="w-4 h-4 text-gray-500" />
            <span>8h - 20h</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500">TYPE D'INTERVENTION</div>
        <div className="flex items-center gap-2 mt-1">
          <FaWrench className="w-4 h-4 text-gray-500" />
          <select className="w-full p-2 border rounded">
            <option>Fuite d'eau</option>
            <option>WC bouché</option>
            <option>Chauffe-eau</option>
            <option>Robinetterie</option>
            <option>Installation neuve</option>
            <option>Autre intervention</option>
          </select>
        </div>
      </div>
    </div>

    <button className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700">
      Demander une intervention
    </button>

    <p className="text-center text-sm text-gray-500">
      Devis gratuit • Déplacement inclus
    </p>

    {/* Price Details */}
    <div className="space-y-2 pt-4 border-t">
      <div className="flex justify-between">
        <span>Tarif diagnostic</span>
        <span>60 €</span>
      </div>
      <div className="flex justify-between">
        <span>Déplacement Dakar</span>
        <span>Offert</span>
      </div>
      <div className="flex justify-between font-semibold pt-2 border-t">
        <span>Total estimé</span>
        <span>60 €</span>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ProfessionelDetails;