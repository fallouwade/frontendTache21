import { FaWrench, FaCut, FaBolt, FaBook, FaCar, FaPaintBrush, FaCamera, FaUtensils, FaLaptop, FaBriefcase } from 'react-icons/fa';

export const categories = [
  { id: 'plomberie', name: 'Plomberie', icon: FaWrench },
  { id: 'coiffure', name: 'Coiffure', icon: FaCut },
  { id: 'electricite', name: 'Électricité', icon: FaBolt },
  { id: 'enseignement', name: 'Enseignement', icon: FaBook },
  { id: 'mecanique', name: 'Mécanique', icon: FaCar },
  { id: 'design', name: 'Design', icon: FaPaintBrush },
  { id: 'photographie', name: 'Photographie', icon: FaCamera },
  { id: 'cuisine', name: 'Cuisine', icon: FaUtensils },
  { id: 'informatique', name: 'Informatique', icon: FaLaptop },
  { id: 'autres', name: 'Autres services', icon: FaBriefcase },
];

export const localities = [
  'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 
  'Toulouse', 'Nantes', 'Strasbourg', 'Montpellier', 'Nice'
];

