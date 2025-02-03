import { Link } from "react-router-dom";
const ServiceCard = ({ title, description, imgSrc, altText }) => {
  return (
    <div className="max-w-xs  service-card bg-white rounded-lg shadow-lg shadow-gray-500 overflow-hidden transition-transform transform hover:scale-105 relative">
      <Link to='/connexion'>
      <img src={imgSrc} alt={altText} className="w-full h-40 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" /></Link>
      <h3 className="text-xl font-semibold mt-4 m-2">{title}</h3>
      <p className="text-gray-700 m-2">{description}</p>
      
    </div>
  );
};
export default ServiceCard;