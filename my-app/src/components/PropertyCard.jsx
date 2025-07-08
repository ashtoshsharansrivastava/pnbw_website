// src/components/PropertyCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function PropertyCard({ data }) {
  const { id, title, city, price, images, rating } = data;
  const getImg = (p) => (p.startsWith('/') ? p : `/images/${p}`);

  return (
    <Link
      to={`/properties/${id}`}
      className="flex flex-col gap-3 pb-3 bg-card-bg rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-full aspect-[4/3] overflow-hidden"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          className="w-full h-full"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={getImg(img)}
                alt={title}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <div className="p-4 space-y-2">
        <p className="font-medium text-white truncate" title={title}>
          {title}
        </p>
        <p className="text-sm text-gray-300">{city}</p>
        <p className="text-sm text-gray-300">
          ₹{Number(price).toLocaleString()} · ★ {rating}
        </p>
      </div>
    </Link>
  );
}
