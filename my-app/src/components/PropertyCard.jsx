// src/components/PropertyCard.jsx
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide }                           from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import { Link }   from 'react-router-dom'

// register modules once
SwiperCore.use([Navigation, Pagination, Autoplay])

export default function PropertyCard({ data }) {
  const { id, title, city, price, images, rating } = data
  const getImg = (p) => (p.startsWith('/') ? p : `/images/${p}`)

  return (
    <Link to={`/properties/${id}`} className="flex flex-col gap-3 pb-3">
      <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-xl">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          className="w-full aspect-[4/3]"  // 4:3 ratio makes cards shorter
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${getImg(img)})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <div>
        <p className="font-medium truncate" title={title}>{title}</p>
        <p className="text-sm text-[#90aecb]">{city}</p>
        <p className="text-sm text-[#90aecb]">
          ₹{Number(price).toLocaleString()} · ★ {rating}
        </p>
      </div>
    </Link>
  )
}

