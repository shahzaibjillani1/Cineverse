import { Search, X } from 'lucide-react';

export function SearchBar({ value, onChange, onClear, onSubmit, placeholder = 'Search for movies, actors, release years...' }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center bg-zinc-900 border border-zinc-800/80 rounded-2xl px-4 py-3.5 focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20 shadow-xl transition-all duration-300">
        <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors focus:outline-none"
            aria-label="Clear search text"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
