

const categories = [
  { name: "Jardinage", icon: "🌱", href: "/services/jardinage" },
  { name: "Plomberie", icon: "🚽", href: "/services/plomberie" },
  { name: "Électricité", icon: "💡", href: "/services/electricite" },
  { name: "Menuiserie", icon: "🪑", href: "/services/menuiserie" },
  { name: "Peinture", icon: "🎨", href: "/services/peinture" },
  { name: "Nettoyage", icon: "🧹", href: "/services/nettoyage" },
  { name: "Déménagement", icon: "📦", href: "/services/demenagement" },
  { name: "Réparation", icon: "🔧", href: "/services/reparation" },
];

const API_URL = "https://backendtache21.onrender.com" ;

function CategoryGrid({ onCategoryClick, selectedCategory }) {
  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Nos Services</h2>
      <div
        className="flex overflow-x-auto space-x-4 py-1 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={`flex flex-col items-center p-5 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0 ${
              selectedCategory === category.name ? "bg-primary-100" : ""
            }`}
          >
            <span className="text-3xl mb-3">{category.icon}</span>
            <span className="text-center text-lg text-gray-800 font-semibold">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;