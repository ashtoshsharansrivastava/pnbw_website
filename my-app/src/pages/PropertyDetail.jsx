import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as api from '../api/properties';
import MapEmbed from '../components/MapEmbed.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import EnquireModal from '../components/EnquireModal.jsx';

export default function PropertyDetail() {
  const { id } = useParams();
  const [prop, setProp] = useState(null);

  useEffect(() => {
    api.get(id).then(setProp);
  }, [id]);

  if (!prop) return null;

  return (
    <section className="min-h-screen py-10 flex justify-center items-start bg-[#36454F]">
      <article className="w-full max-w-[960px] space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="relative">
          <img src={prop.images[0]} className="w-full rounded-xl" />
          <h1 className="absolute bottom-4 left-4 text-xl font-bold drop-shadow-md text-white bg-black/50 px-3 py-1 rounded">
            {prop.title}
          </h1>
        </div>

        <p className="text-3xl font-bold text-gray-800">{prop.price}</p>

        {/* quick facts pills */}
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

        <MapEmbed lat={prop.location.lat} lng={prop.location.lng} />
        <ReviewCarousel reviews={prop.reviews} />
        {/* related props */}
      </article>
    </section>
  );
}
