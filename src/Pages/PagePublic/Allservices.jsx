import { useState } from "react";
import { FaTools, FaVideo, FaTruck, FaBroom, FaTree, FaWrench,  FaFire } from "react-icons/fa";
import ServiceCard from "./ServicesCard";

const Allservices = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { icon: <FaTools />, label: "Mécanicien", associatedService: "Mécanicien" },
    { icon: <FaVideo />, label: "Design", associatedService: "Design" },
    { icon: <FaTruck />, label: "Électricité", associatedService: "Électricité" },
    { icon: <FaBroom />, label: "Enseignants", associatedService: "Enseignants" },
    { icon: <FaTree />, label: "Plombier", associatedService: "Plombier" },
    { icon: <FaWrench />, label: "Menuisieur", associatedService: "Menuisieur" },
    { icon: <FaFire />, label: "Développeur", associatedService: "Développeur Freelance" },
    { icon: <FaFire />, label: "Technicien Climatisateur", associatedService: "Technicien Climatisateur" },
    { icon: <FaFire />, label: "Nouvautés", associatedService: "Nouvautés" },
  ];

  const servicesDetails = {
    "Mécanicien": [
      {
        title: "Réparation et entretien de véhicules",
        description: "Réparation, entretien, et diagnostic de véhicules automobiles pour garantir leur performance et sécurité.",
        imgSrc: "https://thumbs.dreamstime.com/b/femme-noire-m%C3%A9canicien-travaillant-sous-le-capot-dans-garage-de-r%C3%A9paration-automobile-portrait-d-une-m%C3%A9canicienne-confiante-et-221246082.jpg",
        altText: "Mécanicien"
      },
      {
        title: "Réparation et entretien de véhicules",
        description: "Réparation, entretien, et diagnostic de véhicules automobiles pour garantir leur performance et sécurité.",
        imgSrc: "https://img.freepik.com/photos-gratuite/ouvrier-examine-moteur-voiture-panne_482257-91092.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_hybrid",
        altText: "Mécanicien"
      },
    ],
    "Électricité": [
      {
        title: "Électricien",
        description: "Des électriciens professionnels pour vos besoins domestiques.",
        imgSrc: "public/images/elsctric1.jpg",
        altText: "Électricien"
      },
      {
        title: "Électricien",
        description: "Des électriciens professionnels pour vos besoins domestiques.",
        imgSrc: "public/images/elsctric1.jpg",
        altText: "Électricien"
      },
    ],
  };

  const handleClick = (serviceLabel) => {
    if (selectedService === serviceLabel) {
      setSelectedService(null); 
    } else {
      setSelectedService(serviceLabel); 
    }
  };

  return (
    <div className="w-full border-b border-gray-200 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex whitespace-nowrap min-w-max px-4">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => handleClick(service.label)}
                className={`flex flex-col items-center py-4 px-5 cursor-pointer relative transition-all duration-300 ease-in-out transform  ${
                  selectedService === service.label ? "text-blue-500" : "text-gray-600"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                    selectedService === service.label ? "bg-blue-100" : "bg-gray-200"
                  } shadow-lg`}
                >
                  <span className="text-3xl">{service.icon}</span>
                </div>
                <span className="text-sm font-medium mt-2">{service.label}</span>
                {selectedService === service.label && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedService && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-center mb-6">Services associés à {selectedService}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {servicesDetails[selectedService]?.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                imgSrc={service.imgSrc}
                altText={service.altText}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Allservices;