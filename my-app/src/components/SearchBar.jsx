// src/components/SearchBar.jsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';   // lightweight search icon

export default function SearchBar({
  /* ------- controlled props ----------------------------------- */
  value,             // search text
  onChange,          // fn(text)
  sort,              // current sort value (eg. "popular")
  onSort,            // fn(value)
  onSearch,          // fn(text)
  /* ------- UI    props ---------------------------------------- */
  sortOptions = [
    { label: 'Popular',             value: 'popular'     },
    { label: 'Price: Low → High',   value: 'price-asc'   },
    { label: 'Price: High → Low',   value: 'price-desc'  },
    { label: 'Newest',              value: 'newest'      },
    { label: 'Oldest',              value: 'oldest'      },
  ],
  className        = '',
  inputClassName   = '',
  selectClassName  = '',
  buttonClassName  = '',
}) {
  /* fire onSearch when user presses <Enter> in the input */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch?.(value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* text field */}
      <input
        type="text"
        placeholder="Search for properties…"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={`flex-1 bg-transparent focus:outline-none ${inputClassName}`}
      />

      {/* sort dropdown */}
      <select
        value={sort}
        onChange={(e) => onSort?.(e.target.value)}
        className={`rounded-md ${selectClassName}`}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* search button */}
      <button
        onClick={() => onSearch?.(value)}
        className={`${buttonClassName}`}
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </div>
  );
}
