

const ServiceCard = ({ title, description, imgSrc, altText }) => {
  return (
    <div className="service-card">
      <img src={imgSrc} alt={altText} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};
export default ServiceCard;