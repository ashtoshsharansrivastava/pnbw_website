export default function SearchBar({ value, onChange }) {
    return (
      <label className="block w-full">
        <input
          type="search"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search for properties"
          className="mt-2 w-full rounded-xl bg-skin-surface px-4 py-3 text-white placeholder:text-[#90aecb] focus:outline-none"
        />
      </label>
    );
  }