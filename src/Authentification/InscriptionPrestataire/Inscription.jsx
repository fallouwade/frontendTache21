import  { useState } from 'react';
import { StepIndicator, FormComponents } from './Component/FormComponents';
import { serviceCategories, initialFormData, commonStyles as styles } from './Component/Constants';
// import professionel from '../images/professionel.png'

const Inscription = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (event, field) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ...files]
    }));
  };

  const validateStep = (currentStep) => {
    switch(currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.phone && formData.region && formData.departement;
      case 2:
        return formData.serviceName && formData.nomEntreprise && 
               formData.serviceCategory && formData.description && 
               formData.prix;
      case 3:
        return formData.portfolio.length > 0 && formData.termsAccepted;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (step === 3) {
      setIsSubmitting(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Formulaire soumis:', formData);
        alert('Inscription réussie! Nous examinerons votre dossier et vous contacterons rapidement.');
        // Redirection ou autre logique post-soumission
      } catch  {
        alert('Une erreur est survenue lors de la soumission. Veuillez réessayer.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex bg-gray-50">
    <div className="hidden lg:block lg:w-1/2 relative">
      <img
        // src={professionel}
        alt="Service Provider"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Rejoignez notre communauté de prestataires</h1>
        <p className="text-lg opacity-90">Développez votre activité et trouvez de nouveaux clients</p>
      </div>
    </div>

    <div className="w-full lg:w-1/2 h-full overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto py-8 px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-900">Inscription Prestataire</h2>
            <p className="mt-2 text-center text-gray-600">Étape {step} sur 3</p>
          </div>

          <StepIndicator currentStep={step} />

          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8">
            <FormComponents
              step={step}
              formData={formData}
              setFormData={setFormData}
              serviceCategories={serviceCategories}
              handleFileUpload={handleFileUpload}
            />

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className={styles.button.secondary}
                  disabled={isSubmitting}
                >
                  Précédent
                </button>
              )}
              <button
                type="submit"
                className={`${styles.button.primary} ml-auto flex items-center`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </>
                ) : (
                  step === 3 ? 'Soumettre' : 'Suivant'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {step === 1 && "Informations personnelles"}
            {step === 2 && "Détails du service"}
            {step === 3 && "Documents et validation"}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Inscription;