import React from 'react';

// You can keep the MapPin icon for a potential fallback or loading state if you wish
// import { MapPin } from 'lucide-react'; 

export default function MapEmbed({ lat, lng, address }) {
  // Correctly interpolate the lat and lng variables into the URL
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Property Location</h3>
      
      {/* Container for the map iframe */}
      <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={address || 'Property Location'}
        ></iframe>
      </div>
    </div>
  );
}