import { useEffect, useState } from 'react';
import * as api from '../api/properties';
import SearchBar from '../components/SearchBar.jsx';
import FilterBar from '../components/FilterBar.jsx';
import PropertyCard from '../components/PropertyCard.jsx';

export default function Home() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('Popular');
  const [props, setProps] = useState([]);

  useEffect(()=>{ api.list().then(setProps); },[]);

  const filtered = props.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()));
  // naive sort (extend as needed)
  if (sort==='Location A→Z') filtered.sort((a,b)=>a.city.localeCompare(b.city));

  return (
    <section className="mx-auto max-w-[960px]">
      <SearchBar value={query} onChange={setQuery} />
      <h2 className="px-4 pb-3 pt-5 text-2xl font-bold">Featured Properties</h2>
      <FilterBar active={sort} setActive={setSort} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 p-4">
        {filtered.map(p => <PropertyCard key={p.id} data={p} />)}
      </div>
    </section>
  );
}