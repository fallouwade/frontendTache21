import ServiceCard from "./ServicesCard";

export default function Cards() {
    const services = [
      {
        title: "Plomberie",
        description:
          "Trouvez des plombiers qualifiés et disponibles pour vos réparations et installations.",
        imgSrc: "https://media.istockphoto.com/id/1464818215/fr/photo/plombi%C3%A8re-noire-au-travail.jpg?s=612x612&w=0&k=20&c=tcbWghdR3bJdAr52xfsLCyW5sYcj8sniikcVCjRomkU=",
        altText: "Plumbing service image"
      },
      {
        title: "Électricité",
        description:
          "Des électriciens professionnels pour tous vos besoins en électricité domestique ou industrielle.",
        imgSrc: "/images/elsctric1.jpg", 
        altText: "Electricity service image"
      },
      {
        title: "Menuisier",
        description: "Que ce soit pour la fabrication sur mesure de meubles, la réparation ou l'installation de portes et fenêtres, notre menuisier qualifié saura répondre à vos besoins.",
        imgSrc: "https://img.freepik.com/photos-gratuite/collegues-souriants-entrepot-scannent-code-barres-boite-carton-discutent_482257-77667.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted",
        altText: "Menuisier"
      },
      {
        title: "Coiffeur",
        description:
          "Réservez vos coupes de cheveux avec des coiffeurs qualifiés .",
        imgSrc: "https://img.freepik.com/photos-premium/coiffeur-afro-americain-coupe-cheveux-homme-afro-americain-coupe-cheveux-tondeuse_345343-4392.jpg", 
        altText: "Haircut service image"
      },
      {
        title: "Développeur Freelance",
        description: "Besoin d'un site web personnalisé ou d'une application mobile ? Faites appel à un développeur freelance pour des solutions digitales sur-mesure.",
        imgSrc: "https://img.freepik.com/photos-gratuite/developpeur-logiciels-utilisant-application-fenetre-terminal-ordinateur-portable-apprenant-coder-nouveau-programme-interface-utilisateur-developpement-serveur-ligne-cloud-computing-securite-pare-feu-script-html-css_482257-48031.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted",
        altText: "Développeur Freelance"
      },
      {
        title: "Génie Civil",
        description: "Notre expert en génie civil vous accompagne dans la construction de bâtiments, routes, et infrastructures avec des solutions adaptées à vos besoins.",
        imgSrc: "https://img.freepik.com/photos-gratuite/portrait-homme-architecte-afro-americain-confiant-souriant-plan-directeur-regardant-camera-isolee-fond-gris_231208-2214.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted",
        altText: "Génie Civil"
      },
      {
        title: "Designer",
        description: "Création de logos, chartes graphiques, et supports de communication visuelle pour donner vie à votre image de marque.",
        imgSrc: "https://img.freepik.com/photos-gratuite/pigiste-satisfait-faisant-session-shopping-ligne-ordinateur-portable_482257-75374.jpg",
        altText: "Designer"
      },
      {
        title: "Peintre",
        description: "Peinture intérieure et extérieure, rénovation de façades, créations artistiques pour embellir vos espaces.",
        imgSrc: "https://img.freepik.com/photos-gratuite/jeune-homme-constructeur-afro-americain-portant-uniformes-construction-casque-securite-tenant-rouleau-peinture-pinceau-souriant-joyeusement-debout-rose_141793-18994.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted",
        altText: "Peintre"
      },
      {
        title: "Technicien Climatisateur",
        description: "Installation, entretien et dépannage de systèmes de climatisation pour un confort optimal toute l'année.",
        imgSrc:'https://media.gettyimages.com/id/1464816116/fr/photo/noir-technicienne-service-climatiseur-ouvert-int%C3%A9rieur-pour-v%C3%A9rification-et-r%C3%A9paration.jpg?s=612x612&w=0&k=20&c=7Cu8Xa-0RGlPQrQKHHT0epNn30s_meS1BMFPcPoiOPM=',
        altText: "Technicien Climatisateur"
      },
      {
        title: "Mécanicien",
        description: "Réparation, entretien, et diagnostic de véhicules automobiles pour garantir leur performance et sécurité.",
        imgSrc: "https://thumbs.dreamstime.com/b/femme-noire-m%C3%A9canicien-travaillant-sous-le-capot-dans-garage-de-r%C3%A9paration-automobile-portrait-d-une-m%C3%A9canicienne-confiante-et-221246082.jpg", 
        altText: "Mécanicien"
      },
      {
        title: "Enseignant Privé",
        description: "Cours particuliers adaptés pour améliorer les performances scolaires des élèves, du primaire à l'université.",
        imgSrc: "https://img.freepik.com/photos-gratuite/gens-litterature-etude-concept_273609-23604.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted", 
        altText: "Enseignant Privé"
      },
      {
        title: "Enseignant Privé",
        description: "Cours particuliers adaptés pour améliorer les performances scolaires des élèves, du primaire à l'université.",
        imgSrc: "https://img.freepik.com/photos-gratuite/gens-litterature-etude-concept_273609-23604.jpg?ga=GA1.1.1841303701.1736946038&semt=ais_tags_boosted", 
        altText: "Enseignant Privé"
      },
    
    ];
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imgSrc={service.imgSrc}
            altText={service.altText}
          />
        ))}
      </div>
    );
  }
  