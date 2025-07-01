import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { motion } from 'framer-motion';

export default function PropertyCard({ data }) {
  const { id, title, city, price, images, rating } = data;
  const [idx, setIdx] = useState(0);

  return (
    <Link to={`/property/${id}`} className="flex flex-col gap-3 pb-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="aspect-video w-full rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${images[idx]})` }}
        onClick={e => { e.preventDefault(); setIdx((idx+1)%images.length);} }
      />
      <div>
        <p className="font-medium truncate" title={title}>{title}</p>
        <p className="text-sm text-[#90aecb]">{city}</p>
        <p className="text-sm text-[#90aecb]">{price} · ★ {rating}</p>
      </div>
    </Link>
  );
}