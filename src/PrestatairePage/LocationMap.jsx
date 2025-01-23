import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const LocationMap = () => {
  const position = { lat: 14.4544, lng: -17.0028 }; // Coordonnées de Mbour, Sénégal

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 text-start">
        <h2 className="text-2xl font-semibold mb-2">Où me Trouvez  </h2>
        <p className="text-gray-600">Mbour, Thiès Region, Sénégal</p>
      </div>

      {/* Carte Google Maps */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
        <LoadScript googleMapsApiKey="dependable-keep-448320-f6">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={position}
            zoom={13}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default LocationMap;
