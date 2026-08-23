import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const executeSearch = createAsyncThunk(
  'search/executeSearch',
  async ({ query, filters, page = 1 }, { rejectWithValue }) => {
    try {
      const data = await tmdbService.searchMovies(query, filters, page);
      return { data, query, filters };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSuggestions = createAsyncThunk(
  'search/fetchSuggestions',
  async (query, { rejectWithValue }) => {
    if (!query || query.trim() === '') return { results: [] };
    try {
      const data = await tmdbService.searchMovies(query, {}, 1);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  query: '',
  filters: {
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity.desc',
  },
  results: [],
  suggestions: [],
  recentSearches: JSON.parse(localStorage.getItem('cineverse_recent_searches') || '[]'),
  loading: false,
  suggestionsLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.results = []; // Clear current results for new filter parameters
      state.page = 1;
    },
    resetFilters: (state) => {
      state.filters = {
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity.desc',
      };
      state.results = [];
      state.page = 1;
    },
    addRecentSearch: (state, action) => {
      const search = action.payload?.trim();
      if (!search) return;
      const filtered = state.recentSearches.filter((s) => s.toLowerCase() !== search.toLowerCase());
      state.recentSearches = [search, ...filtered].slice(0, 8); // Keep last 8 searches
      localStorage.setItem('cineverse_recent_searches', JSON.stringify(state.recentSearches));
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
      localStorage.setItem('cineverse_recent_searches', JSON.stringify([]));
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.page = 1;
      state.totalPages = 1;
      state.query = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Execute Search
      .addCase(executeSearch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // If loading page 1, clear results to show skeleton
        if (action.meta.arg.page === 1) {
          state.results = [];
        }
      })
      .addCase(executeSearch.fulfilled, (state, action) => {
        state.loading = false;
        const { results, page, total_pages } = action.payload.data;
        if (page === 1) {
          state.results = results;
        } else {
          // Append for infinite scroll
          // Filter duplicates just in case
          const existingIds = new Set(state.results.map((m) => m.id));
          const newResults = results.filter((m) => !existingIds.has(m.id));
          state.results = [...state.results, ...newResults];
        }
        state.page = page;
        state.totalPages = total_pages;
        state.query = action.payload.query;
      })
      .addCase(executeSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Search execution failed';
      })
      // Suggestions
      .addCase(fetchSuggestions.pending, (state) => {
        state.suggestionsLoading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestionsLoading = false;
        state.suggestions = action.payload.results.slice(0, 5); // top 5 suggestions
      })
      .addCase(fetchSuggestions.rejected, (state) => {
        state.suggestionsLoading = false;
      });
  },
});

export const {
  setQuery,
  setFilters,
  resetFilters,
  addRecentSearch,
  clearRecentSearches,
  clearSuggestions,
  clearSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
