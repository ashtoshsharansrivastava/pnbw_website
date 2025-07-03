// src/components/SearchBar.jsx
import { useState } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'

export default function SearchBar({
  value,
  onChange,
  sort,
  onSort,
  onSearch,
  className = '',
  inputClassName = '',
  selectClassName = '',
  buttonClassName = '',
}) {
  const [local, setLocal] = useState(value)

  const handleSubmit = (e) => {
    e.preventDefault()
    onChange(local)
    onSearch?.(local)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex items-center w-full max-w-xl bg-slate-800 rounded-full shadow-lg overflow-hidden
        transition-shadow hover:shadow-xl
        ${className}
      `}
    >
      {/* Search Input */}
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Search for properties…"
        className={`
          flex-grow text-white placeholder-gray-400 bg-transparent focus:outline-none
          px-4 py-3 text-lg
          ${inputClassName}
        `}
      />

      {/* Sort Dropdown */}
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className={`
          bg-slate-700 text-white focus:outline-none
          text-lg px-4 py-3
          ${selectClassName}
        `}
      >
        <option value="Popular">Popular</option>
        <option value="Location A→Z">Location A→Z</option>
        <option value="Location Z→A">Location Z→A</option>
        <option value="Price Low→High">Price Low→High</option>
        <option value="Price High→Low">Price High→Low</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className={`
          flex items-center justify-center bg-blue-600 hover:bg-blue-700
          px-4 py-3
          ${buttonClassName}
        `}
      >
        <HiOutlineSearch className="w-6 h-6 text-white" />
      </button>
    </form>
  )
}
