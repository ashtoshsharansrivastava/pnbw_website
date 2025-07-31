import React from 'react';
import { MapPin } from 'lucide-react'; // Using Lucide for map pin icon

export default function MapEmbed({ lat, lng, address }) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`;
  const placeholderText = address ? `Location: ${address}` : `Map at Lat: ${lat}, Lng: ${lng}`;

  return (
    <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Property Location</h3>
      <div className="h-80 w-full bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center text-gray-600 text-xl font-semibold border border-dashed border-gray-400">
        {/* In a real application, replace this div with an actual map embed */}
        {/* Example for Google Maps iframe: */}
        {/* <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Property Location"
        ></iframe> */}
        <div className="flex flex-col items-center">
          <MapPin size={48} className="text-gray-500 mb-2" />
          {placeholderText}
          <p className="text-sm text-gray-500 mt-2">(Map integration placeholder)</p>
        </div>
      </div>
    </div>
  );
}
