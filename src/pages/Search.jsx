import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Trash2, History, Film } from 'lucide-react';
import useSearch from '../hooks/useSearch';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/search/SearchBar';
import FilterSidebar from '../components/search/FilterSidebar';
import MovieGrid from '../components/movie/MovieGrid';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/loaders/LoadingSpinner';

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const {
    query,
    filters,
    results,
    loading,
    page,
    totalPages,
    recentSearches,
    performSearch,
    updateQuery,
    clearAllFilters,
    deleteSearchHistory,
    clearSearch,
  } = useSearch();

  const [localQuery, setLocalQuery] = useState(queryParam || query);
  const debouncedQuery = useDebounce(localQuery, 500);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync local query with URL search param
  useEffect(() => {
    if (queryParam !== localQuery) {
      setLocalQuery(queryParam);
      updateQuery(queryParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  // Execute search when debounced query or filters update
  useEffect(() => {
    // If we have a query, or if we have filters active, run search
    const hasFilters = filters.genre || filters.year || filters.rating !== '' || filters.sortBy !== 'popularity.desc';
    
    if (debouncedQuery.trim() || hasFilters) {
      performSearch(debouncedQuery.trim(), filters, 1);
      // Sync URL search params
      if (debouncedQuery.trim()) {
        setSearchParams({ q: debouncedQuery.trim() });
      } else {
        setSearchParams({});
      }
    } else {
      clearSearch();
      setSearchParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, filters.genre, filters.year, filters.rating, filters.sortBy]);

  const handleClear = () => {
    setLocalQuery('');
    updateQuery('');
    clearSearch();
    setSearchParams({});
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      performSearch(debouncedQuery.trim(), filters, page + 1);
    }
  };

  const handleHistoryClick = (term) => {
    setLocalQuery(term);
    updateQuery(term);
    setSearchParams({ q: term });
  };

  const hasActiveFilters = filters.genre || filters.year || filters.rating !== '' || filters.sortBy !== 'popularity.desc';

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Mobile filter trigger bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight flex items-center">
          <Film className="w-6.5 h-6.5 text-brand-primary mr-3" />
          <span>Explore Cinema</span>
        </h1>
        
        {/* Mobile Filters toggler button */}
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="lg:hidden flex items-center justify-center space-x-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-xl cursor-pointer text-sm font-semibold transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
          <span>Filters & Sort</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-brand-primary" />
          )}
        </button>
      </div>

      {/* Main Grid Wrapper */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar filters panel */}
        <FilterSidebar isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} />

        {/* Search Results Area */}
        <div className="flex-grow space-y-8">
          
          {/* Main search bar */}
          <SearchBar
            value={localQuery}
            onChange={setLocalQuery}
            onClear={handleClear}
            onSubmit={(e) => performSearch(localQuery.trim(), filters, 1)}
          />

          {/* Results check */}
          {results.length === 0 && !loading ? (
            <div className="py-8">
              {/* Recent searches history list */}
              {!localQuery && !hasActiveFilters && recentSearches.length > 0 ? (
                <div className="max-w-md mx-auto bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 text-left">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-900">
                    <h4 className="text-sm font-extrabold uppercase tracking-wide text-zinc-400 flex items-center">
                      <History className="w-4 h-4 text-brand-primary mr-2" />
                      <span>Recent Searches</span>
                    </h4>
                    <button
                      onClick={deleteSearchHistory}
                      className="text-zinc-600 hover:text-red-500 cursor-pointer transition-colors"
                      title="Clear History"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {recentSearches.map((term, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => handleHistoryClick(term)}
                          className="w-full text-left py-2 px-3 hover:bg-zinc-800/80 rounded-xl text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg font-bold text-zinc-400 font-display">No matches found</p>
                  <p className="text-sm text-zinc-500 max-w-sm mx-auto mt-2 leading-relaxed">
                    Try adjusting your spelling, choosing a different genre, or resetting the active filters.
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearAllFilters} variant="outline" className="mt-6">
                      Reset All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {/* Movie Grid */}
              <MovieGrid
                movies={results}
                loading={loading}
                emptyTitle="No match found"
                emptyMessage="Try adjusting filters."
              />

              {/* Loader Spinner */}
              {loading && <LoadingSpinner />}

              {/* Load More Button */}
              {!loading && page < totalPages && (
                <div className="flex justify-center pt-4">
                  <Button onClick={handleLoadMore} variant="secondary" className="px-8 py-3">
                    Load More Results
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
