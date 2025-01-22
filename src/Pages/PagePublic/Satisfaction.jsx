import React from "react";

const Satisfaction = () => {
  const guarantees = [
    {
      title: "Des services adaptés à vos besoins",
      description:
        "Nous vous offrons des solutions personnalisées pour simplifier votre quotidien et répondre à vos attentes.",
    },
    {
      title: "Des experts locaux qualifiés",
      description:
        "Chaque prestataire est soigneusement sélectionné pour garantir un service fiable et de haute qualité.",
    },
    {
      title: "Un support client réactif",
      description:
        "Notre équipe est disponible pour vous accompagner et répondre à toutes vos questions, quand vous en avez besoin.",
    },
  ];

  return (
    <div>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-16 text-start">
        <span className="text-[#2B4C29]">Votre satisfaction</span>
        {" "}
        <span className="text-blue-500">garantie</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {guarantees.map((guarantee, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="flex items-start space-x-3">
              {guarantee.icon}
              <h3 className="text-xl font-bold text-[#2B4C29]">
                {guarantee.title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {guarantee.description}
            </p>
          
          </div>
        ))}
      </div>
    </div>
    {/* // Comment ca marche  */}
    <div>
        <div className="relative w-full h-auto md:h-[600px] bg-[#fff9e6] my-2">
      <div className="relative max-w-[1200px] mx-auto h-full px-4 md:px-0">
        <div className="hidden md:block absolute right-0 top-0 h-full w-3/5">
          <img
            src= 'https://img.freepik.com/premium-photo/woman-reading-message-beautiful-woman-wearing-glasses-reading-message-phone-smiling_259150-47605.jpg?ga=GA1.1.1197557927.1715790776&semt=ais_hybrid'
            alt="Personne utilisant l'application" 
            className="h-[500px] w-full object-cover rounded-lg mt-10"
          />
        </div>
        <div className="md:hidden w-full pt-8 pb-4">
          <img
            src= 'https://img.freepik.com/premium-photo/woman-reading-message-beautiful-woman-wearing-glasses-reading-message-phone-smiling_259150-47605.jpg?ga=GA1.1.1197557927.1715790776&semt=ais_hybrid'
            alt="Personne utilisant l'application" 
            className="w-full h-[300px] object-cover rounded-lg"
          />
        </div>

        <div className="relative md:absolute left-0 md:left-15 top-0 md:top-1/2 md:-translate-y-1/2 bg-white p-6 md:p-12 rounded-lg w-full md:w-[500px] shadow-lg">
          <h2 className="text-2xl font-medium text-green-900 mb-8 md:mb-12">
            Comment ça marche
          </h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#e8e6ff] flex items-center justify-center">
                <span className="text-xl font-medium">1</span>
              </div>
              <p className="text-gray-800 text-lg">
                Choisissez un prestataire local en fonction du prix, des compétences et des avis.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#dcf3ff] flex items-center justify-center">
                <span className="text-xl font-medium">2</span>
              </div>
              <p className="text-gray-800 text-lg">
                Planifiez un service selon vos disponibilités.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#e1f9f5] flex items-center justify-center">
                <span className="text-xl font-medium">3</span>
              </div>
              <p className="text-gray-800 text-lg">
                Discutez, payez et évaluez directement depuis la plateforme.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    </div>
  );
};

export default Satisfaction;