// src/pages/PropertyDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as api from '../api/properties';
import MapEmbed from '../components/MapEmbed.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import EnquireModal from '../components/EnquireModal.jsx';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertyDetail() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);
  const [showEnquire, setShowEnquire] = useState(false);

  useEffect(() => {
    api.get(id).then(setProp);
  }, [id]);

  if (!prop) return null;

  // helper to prefix public folder images
  const getImg = (p) => (p.startsWith('/') ? p : `/images/${p}`);

  return (
    <section className="min-h-screen py-10 flex justify-center items-start bg-midnight">
      <article className="w-full max-w-[960px] space-y-8 bg-white p-8 rounded-3xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-2xl">
        {/* === IMAGE SLIDER === */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="h-80 rounded-xl overflow-hidden"
        >
          {prop.images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={getImg(img)}
                alt={`${prop.title} — image ${idx + 1}`}
                className="object-cover w-full h-80 transform transition-all hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* === TITLE & PRICE & ENQUIRE BUTTON === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">{prop.title}</h1>
            <p className="text-4xl font-extrabold text-blue-600 mt-2">
              ₹{Number(prop.price).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setShowEnquire(true)}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-transform duration-200 ease-in-out hover:scale-110"
          >
            Enquire
          </button>
        </div>

        {/* === QUICK FACTS === */}
        <section className="flex gap-3 flex-wrap">
          {prop.quickFacts.map((q) => (
            <span
              key={q.label}
              className="rounded-full bg-indigo-100 text-indigo-800 px-6 py-2 text-sm font-semibold shadow-md"
            >
              {q.label}
            </span>
          ))}
        </section>

        {/* === MAP === */}
        <MapEmbed lat={prop.location.lat} lng={prop.location.lng} />

        {/* === REVIEWS CAROUSEL === */}
        <ReviewCarousel reviews={prop.reviews} />

        {/* === ENQUIRE MODAL === */}
        {showEnquire && (
          <EnquireModal
            property={prop}
            onClose={() => setShowEnquire(false)}
          />
        )}
      </article>
    </section>
  );
}
