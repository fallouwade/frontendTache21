// Données des régions et départements
export const serviceCategories = [
    'Plomberie',
    'Électricité',
    'Coiffure',
    'Enseignant',
    'Mécaniciens',
    'Développeur',
    'Maintenance',
    'Autre'
  ];
  
  export const regions = [
    "Dakar",
    "Diourbel",
    "Fatick",
    "Kaffrine",
    "Kaolack",
    "Kédougou",
    "Kolda",
    "Louga",
    "Matam",
    "Saint-Louis",
    "Sédhiou",
    "Tambacounda",
    "Thiès",
    "Ziguinchor"
  ];
  
  export const departements = {
    "Dakar": ["Dakar", "Guédiawaye", "Pikine", "Rufisque"],
    "Diourbel": ["Bambey", "Diourbel", "Mbacké"],
    "Fatick": ["Fatick", "Foundiougne", "Gossas"],
    "Kaffrine": ["Birkilane", "Kaffrine", "Koungheul", "Malem Hodar"],
    "Kaolack": ["Guinguinéo", "Kaolack", "Nioro du Rip"],
    "Kédougou": ["Kédougou", "Salémata", "Saraya"],
    "Kolda": ["Kolda", "Médina Yoro Foulah", "Vélingara"],
    "Louga": ["Kébémer", "Linguère", "Louga"],
    "Matam": ["Kanel", "Matam", "Ranérou Ferlo"],
    "Saint-Louis": ["Dagana", "Podor", "Saint-Louis"],
    "Sédhiou": ["Bounkiling", "Goudomp", "Sédhiou"],
    "Tambacounda": ["Bakel", "Goudiry", "Koumpentoum", "Tambacounda"],
    "Thiès": ["Mbour", "Thiès", "Tivaouane"],
    "Ziguinchor": ["Bignona", "Oussouye", "Ziguinchor"]
  };
  
  export const initialFormData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    region: '',
    departement: '',
    serviceName: '',
    serviceCategory: '',
    description: '',
    portfolio: [],
    diplome: [],
    prix: '',
    nomEntreprise: '',
    // serviceArea: '',
    termsAccepted: false
  };
  
  export const commonStyles = {
    input: "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white",
    label: "block text-sm font-medium text-gray-700 mb-1",
    required: "text-red-500",
    optional: "text-gray-500 ml-1 text-sm",
    button: {
      primary: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
      secondary: "px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
    }
  };
  