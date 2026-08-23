import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  executeSearch,
  fetchSuggestions,
  setQuery,
  setFilters,
  resetFilters,
  addRecentSearch,
  clearRecentSearches,
  clearSuggestions,
  clearSearchResults,
} from '../redux/slices/searchSlice';

export function useSearch() {
  const dispatch = useDispatch();
  const searchState = useSelector((state) => state.search);

  const performSearch = useCallback(
    (query, filters, page = 1) => {
      dispatch(executeSearch({ query, filters, page }));
      if (query && page === 1) {
        dispatch(addRecentSearch(query));
      }
    },
    [dispatch]
  );

  const getSuggestions = useCallback(
    (query) => {
      dispatch(fetchSuggestions(query));
    },
    [dispatch]
  );

  const updateQuery = useCallback(
    (query) => {
      dispatch(setQuery(query));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    (filters) => {
      dispatch(setFilters(filters));
    },
    [dispatch]
  );

  const clearAllFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const removeSuggestions = useCallback(() => {
    dispatch(clearSuggestions());
  }, [dispatch]);

  const clearSearch = useCallback(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  const deleteSearchHistory = useCallback(() => {
    dispatch(clearRecentSearches());
  }, [dispatch]);

  const addSearchHistory = useCallback((term) => {
    dispatch(addRecentSearch(term));
  }, [dispatch]);

  return {
    ...searchState,
    performSearch,
    getSuggestions,
    updateQuery,
    updateFilters,
    clearAllFilters,
    removeSuggestions,
    clearSearch,
    deleteSearchHistory,
    addSearchHistory,
  };
}
export default useSearch;
