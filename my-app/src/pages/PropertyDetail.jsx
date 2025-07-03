// src/pages/PropertyDetail.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as api from '../api/properties'
import MapEmbed from '../components/MapEmbed.jsx'
import ReviewCarousel from '../components/ReviewCarousel.jsx'
import EnquireModal from '../components/EnquireModal.jsx'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PropertyDetail() {
  const { id } = useParams()
  const [prop, setProp] = useState(null)
  const [showEnquire, setShowEnquire] = useState(false)

  useEffect(() => {
    api.get(id).then(setProp)
  }, [id])

  if (!prop) return null

  // helper to prefix public folder images
  const getImg = (p) => (p.startsWith('/') ? p : `/images/${p}`)

  return (
    <section className="min-h-screen py-10 flex justify-center items-start bg-[#36454F]">
      <article className="w-full max-w-[960px] space-y-8 bg-white p-6 rounded-xl shadow-md">
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
                className="object-cover w-full h-80"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* === TITLE & PRICE & ENQUIRE BUTTON === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{prop.title}</h1>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">
              ₹{Number(prop.price).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setShowEnquire(true)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Enquire
          </button>
        </div>

        {/* === QUICK FACTS === */}
        <section className="flex gap-3 flex-wrap">
          {prop.quickFacts.map((q) => (
            <span
              key={q.label}
              className="rounded-full bg-blue-100 text-blue-800 px-4 py-1 text-sm font-medium"
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
  )
}
