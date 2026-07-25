import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { fetchGenres } from '../../redux/slices/genresSlice';
import useSearch from '../../hooks/useSearch';
import Button from '../ui/Button';

export function FilterSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.genres);
  const { filters, updateFilters, clearAllFilters } = useSearch();

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => currentYear - index);

  const sortOptions = [
    { label: 'Popularity (Descending)', value: 'popularity.desc' },
    { label: 'Popularity (Ascending)', value: 'popularity.asc' },
    { label: 'Release Date (Descending)', value: 'release_date.desc' },
    { label: 'Release Date (Ascending)', value: 'release_date.asc' },
    { label: 'Rating (Descending)', value: 'vote_average.desc' },
    { label: 'Rating (Ascending)', value: 'vote_average.asc' },
  ];

  const ratingOptions = [
    { label: 'Any Rating', value: '' },
    { label: '8.0+ Stars', value: '8' },
    { label: '7.0+ Stars', value: '7' },
    { label: '6.0+ Stars', value: '6' },
    { label: '5.0+ Stars', value: '5' },
  ];

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
        <h3 className="text-base font-bold text-white flex items-center">
          <SlidersHorizontal className="w-5 h-5 text-brand-primary mr-2" />
          <span>Filters & Sorting</span>
        </h3>
        <button
          onClick={clearAllFilters}
          className="text-xs font-bold text-zinc-500 hover:text-white flex items-center space-x-1 cursor-pointer transition-colors"
          title="Reset Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-brand-primary cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">Genre</label>
        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-brand-primary cursor-pointer"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">Release Year</label>
        <select
          value={filters.year}
          onChange={(e) => handleFilterChange('year', e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-brand-primary cursor-pointer"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">Minimum Rating</label>
        <div className="grid grid-cols-2 gap-2">
          {ratingOptions.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleFilterChange('rating', opt.value)}
              className={`px-3 py-2 text-xs rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                filters.rating === opt.value
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 h-fit shadow-xl glass-panel">
        {content}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          
          <div className="relative w-80 bg-zinc-950 border-l border-zinc-900 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <Button onClick={onClose} className="w-full mt-8">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
