const RatingBadge = () => {
    return (
      <div className="bg-white rounded-lg p-6 border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 mb-6 sm:mb-0">
            <div className="text-2xl">⭐️</div>
            <div>
              <h3 className="font-medium">Coup de cœur clients</h3>
              <p className="text-gray-600 text-sm">
                Un des plombiers les plus appréciés
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center mb-4 sm:mb-0">
              <div className="font-semibold text-xl">4,85</div>
              <div className="text-gray-500 text-sm">Note</div>
            </div>
            <div className="text-center mb-4 sm:mb-0">
              <div className="font-semibold text-xl">562</div>
              <div className="text-gray-500 text-sm">Interventions</div>
            </div>
            <div className="text-center mb-4 sm:mb-0">
              <div className="font-semibold text-xl">15</div>
              <div className="text-gray-500 text-sm">Années d'exp.</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RatingBadge;
  