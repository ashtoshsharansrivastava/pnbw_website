// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import * as api from '../api/properties'
import PropertyCard from '../components/PropertyCard.jsx'

export default function Home() {
  const [query, setQuery] = useState('')    // populated by header’s SearchBar via context or URL
  const [sort, setSort]   = useState('Popular')
  const [props, setProps] = useState([])

  useEffect(() => {
    api.list().then(setProps)
  }, [])

  // filter by title
  const filtered = props.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  // sort according to `sort`
  let display = [...filtered]
  switch (sort) {
    case 'Location A→Z':
      display.sort((a, b) => a.city.localeCompare(b.city))
      break
    case 'Location Z→A':
      display.sort((a, b) => b.city.localeCompare(a.city))
      break
    case 'Price Low→High':
      display.sort((a, b) => a.price - b.price)
      break
    case 'Price High→Low':
      display.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }

  return (
    <main className="bg-slate-100 min-h-screen pt-6 pb-12">
      {/* full-width container with comfortable padding */}
      <div className="w-full px-4 lg:px-8 xl:px-16 space-y-8">
        {/* Section Title, centered */}
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Featured Properties
        </h2>

        {/* Responsive grid: min 250px cards, fill each row */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
          }}
        >
          {display.map((p) => (
            <PropertyCard key={p.id} data={p} />
          ))}
        </div>

        {/* No Results Message */}
        {display.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            No properties found for “{query}”
          </p>
        )}
      </div>
    </main>
  )
}
