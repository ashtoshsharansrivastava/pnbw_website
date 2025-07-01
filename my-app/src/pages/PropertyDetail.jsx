import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as api from '../api/properties';
import MapEmbed from '../components/MapEmbed.jsx';
import ReviewCarousel from '../components/ReviewCarousel.jsx';
import EnquireModal from '../components/EnquireModal.jsx';

export default function PropertyDetail() {
  const { id } = useParams();
  const [prop,setProp] = useState(null);
  useEffect(()=>{ api.get(id).then(setProp); },[id]);
  if(!prop) return null;

  return (
    <article className="mx-auto max-w-[960px] space-y-8">
      <div className="relative">
        <img src={prop.images[0]} className="w-full rounded-xl" />
        <h1 className="absolute bottom-4 left-4 text-xl font-bold drop-shadow-md">{prop.title}</h1>
      </div>
      <p className="text-3xl font-bold">{prop.price}</p>
      {/* quick facts pills */}
      <section className="flex gap-3 flex-wrap">
        {prop.quickFacts.map(q => <span key={q.label} className="rounded-full bg-skin-surface px-4 py-1 text-sm">{q.label}</span>)}
      </section>
      <MapEmbed lat={prop.location.lat} lng={prop.location.lng} />
      <ReviewCarousel reviews={prop.reviews} />
      {/* related props */}
    </article>
  );
}