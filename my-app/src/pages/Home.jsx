// src/pages/Home.jsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as api from '../api/properties';
import PropertyCard from '../components/PropertyCard.jsx';
import SearchBar from '../components/SearchBar.jsx';  // Keep this!

export default function Home() {
  /* ───────────────────── URL ↔ state sync (same as before) ─────────────────── */
  const { search: queryString } = useLocation();
  const navigate = useNavigate();
  const qs = new URLSearchParams(queryString);

  const [search, setSearch] = useState(qs.get('search') || '');
  const [sort,   setSort]   = useState(qs.get('sort') || 'popular');

  useEffect(() => {
    const p = new URLSearchParams();
    if (search) p.set('search', search);
    if (sort)   p.set('sort', sort);
    navigate({ pathname: '/', search: p.toString() }, { replace: true });
  }, [search, sort, navigate]);

  /* ───────────────────── load & prepare data ─────────────────── */
  const [props, setProps] = useState([]);
  useEffect(() => { api.list().then(setProps); }, []);

  const display = useMemo(() => {
    let list = props.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [props, search, sort]);

  /* ───────────────────── render ─────────────────── */
  return (
    <main className="min-h-screen pt-8 pb-16 bg-midnight text-white">
      
      {/* SearchBar is now handling sorting */}
      <div className="flex justify-center mb-8">
        <SearchBar
          value={search}
          onChange={setSearch}
          sort={sort}
          onSort={setSort}
          onSearch={(q) => setSearch(q)}
          className="w-full max-w-5xl bg-white/90 backdrop-blur rounded-xl shadow px-6 flex items-center space-x-2"
          inputClassName="flex-1 px-6 py-4 text-lg text-gray-900 placeholder-gray-500 rounded-md bg-transparent focus:outline-none"
          selectClassName="px-4 py-4 text-lg text-gray-900 rounded-md"
          buttonClassName="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        />
      </div>

      <section className="container mx-auto px-6 space-y-10">
        <h2 className="text-4xl font-extrabold text-center">Featured Properties</h2>

        {/* Property grid */}
        <div
          className="grid gap-8
                     grid-cols-1
                     sm:grid-cols-2
                     md:grid-cols-3
                     lg:grid-cols-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
        >
          {display.map((p) => (
            <PropertyCard key={p.id} data={p} />
          ))}
        </div>

        {display.length === 0 && (
          <p className="text-center text-slate-400 mt-12">
            No properties found for “{search}”
          </p>
        )}
      </section>
    </main>
  );
}
