import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Corrected import path for API, assuming 'properties' is the correct module name
import * as propertiesApi from '../api/properties'; // Renamed import to avoid conflict and be explicit
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/autoplay';

import StatsCard from '../components/StatsCard.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import MapEmbed from '../components/MapEmbed.jsx';
import EnquireModal from '../components/EnquireModal.jsx';
import { useAuthStore } from '../store/useAuthStore.js'; // To get user details for enquiry

import { FiMapPin, FiTag, FiSquare, FiCalendar, FiHome, FiDollarSign, FiUsers, FiInfo } from 'react-icons/fi'; // Icons for details

/* helper: 6 200 000 → “62 Lakh” */
const toLakhs = (rupees) => {
  if (rupees === undefined || rupees === null) return 'N/A';
  const numRupees = Number(rupees);
  if (isNaN(numRupees)) return 'N/A';
  const lakhs = Math.round(numRupees / 1_00_000);
  return `${lakhs} Lakh`;
};

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user); // Get current user for enquiry modal

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Corrected: Call propertiesApi.getById
    propertiesApi.getById(id) // Assuming your API has a getById method
      .then(data => {
        if (data) {
          setProperty(data);
        } else {
          setError("Property not found.");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load property details:", err);
        setError("Failed to load property details. Please try again later.");
        setLoading(false);
      });
  }, [id]); // Re-fetch if ID changes

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <p className="text-blue-600 text-xl animate-pulse">Loading property details...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-16 text-red-600 text-xl">
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Go Back</button>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <p className="text-gray-600 text-xl">Property data not available.</p>
      </main>
    );
  }

  // Dummy reviews for demonstration
  const dummyReviews = [
    { author: "Anjali Sharma", rating: 5, comment: "Absolutely loved the property! The process was so smooth and transparent." },
    { author: "Rahul Verma", rating: 4, comment: "Great location and fair price. PNBW Officials provided excellent support." },
    { author: "Priya Singh", rating: 5, comment: "Highly professional service. They truly understand client needs." },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 py-16 sm:py-20 md:py-24">
      {/* Edge-to-edge container with responsive padding */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 space-y-16 sm:space-y-20">

        {/* ── Property Header & Image Carousel ──────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            {property.title}
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl flex items-center mb-6">
            <FiMapPin className="mr-2 text-blue-500" /> {property.locality}, {property.city}
          </p>

          <div className="relative h-96 sm:h-[500px] mb-6 rounded-xl overflow-hidden shadow-lg">
            {property.images && property.images.length > 0 ? (
              <>
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
                  loop={true}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="mySwiper2 h-full w-full"
                >
                  {property.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={`/images/${img}`} alt={`${property.title} - ${index + 1}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-4 h-20 sm:h-24"
                >
                  {property.images.map((img, index) => (
                    <SwiperSlide key={`thumb-${index}`}>
                      <img src={`/images/${img}`} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-gray-700 text-2xl font-bold">
                No Images Available
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 flex items-center">
              <FiTag className="mr-2" /> {toLakhs(property.price)}
            </p>
            <button
              onClick={() => setIsEnquireModalOpen(true)}
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Enquire Now
            </button>
          </div>
        </section>

        {/* ── Key Details & Stats ───────────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-8 inline-block">Key Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard label="Property Type" value={property.propertyType || 'N/A'} />
            <StatsCard label="Area (Units)" value={`${property.units || 'N/A'}+`} />
            <StatsCard label="Bedrooms" value={property.bedrooms || 'N/A'} /> {/* Assuming bedrooms prop */}
            <StatsCard label="Bathrooms" value={property.bathrooms || 'N/A'} /> {/* Assuming bathrooms prop */}
            <StatsCard label="Furnishing" value={property.furnishing || 'N/A'} /> {/* Assuming furnishing prop */}
            <StatsCard label="Possession" value={property.possession || 'Immediate'} /> {/* Assuming possession prop */}
            <StatsCard label="Built Year" value={property.builtYear || 'N/A'} /> {/* Assuming builtYear prop */}
            <StatsCard label="Views" value={property.views || '0'} />
          </div>
        </section>

        {/* ── Property Description ───────────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">Description</h2>
          <p className="text-gray-800 leading-relaxed text-lg">
            {property.description || "A detailed description of this property is not yet available. Please contact us for more information."}
          </p>
          {property.amenities && property.amenities.length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Amenities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
                {property.amenities.map((amenity, index) => (
                  <li key={index} className="flex items-center text-gray-700 text-lg">
                    <FiInfo className="mr-2 text-blue-500 flex-shrink-0" /> {amenity}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* ── Reviews ───────────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <ReviewCarousel reviews={dummyReviews} />
        </section>

        {/* ── Map Location ───────────────────────────────────────── */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
          <MapEmbed lat={property.lat} lng={property.lng} address={`${property.locality}, ${property.city}`} />
        </section>

        {/* ── Enquire Modal ───────────────────────────────────────── */}
        {isEnquireModalOpen && (
          <EnquireModal
            isOpen={isEnquireModalOpen}
            onClose={() => setIsEnquireModalOpen(false)}
            property={property}
            user={user} // Pass the logged-in user object
          />
        )}
      </div>
    </main>
  );
}
