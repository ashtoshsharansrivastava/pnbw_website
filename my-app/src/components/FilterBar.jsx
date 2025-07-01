const pills = ['Price ↑↓', 'Location A→Z', 'Newest', 'Popular'];
export default function FilterBar({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-3 p-3">
      {pills.map(p => (
        <button
          key={p}
          onClick={() => setActive(p)}
          className={`h-8 rounded-full px-4 text-sm font-medium ${active===p?'bg-skin-accent':'bg-skin-surface'}`}
        >{p}</button>
      ))}
    </div>
  );
}