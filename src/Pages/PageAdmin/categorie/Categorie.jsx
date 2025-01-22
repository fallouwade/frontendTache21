import LayoutAdmine from "../layout/LayoutAdmine";
import CategorieListe from "./ListeCategorie/CategorieListe";
import CategorieAjout from "./AjoutCategorie/CategorieAjout";

const Categorie = () => {
  const cards = [
    {
      title: "Total Categorie",
      count: 0,
      description: "",
      bgColor: "bg-blue-500",
    },
    {
      title: "Categorie archivé",
      count: 0,
      description: "",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <LayoutAdmine>
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-blue-50">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-lg shadow-md text-white ${card.bgColor} flex flex-col items-center`}
          >
            <h3 className="text-lg font-semibold text-center">{card.title}</h3>
            <div className="text-4xl font-bold py-2 text-center">{card.count}</div>
            <p className="text-sm text-center">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-6">
        <div className="flex-1 min-w-[300px]">
          <CategorieListe />
        </div>
        <div className="flex-1 min-w-[300px]">
          <CategorieAjout />
        </div>
      </div>
    </LayoutAdmine>
  );
};

export default Categorie;