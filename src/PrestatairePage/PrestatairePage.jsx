import React from 'react';
import ProfessionelGallery from '..PrestatairePage/ProfessionelGallery';
import ProfessionelDetails from '../PrestatairePage/ProfessionelDetails';
import Testimonials from '../PrestatairePage/Temoignages';

const PrestatairePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <ProfessionelGallery />
        <ProfessionelDetails />
        <Testimonials />
  
      </div>
    </div>
  );
};

export default PrestatairePage;


