import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async ({ page, timeWindow } = { page: 1, timeWindow: 'day' }, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getTrending(page, timeWindow);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  movies: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  timeWindow: 'day',
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    setTimeWindow: (state, action) => {
      state.timeWindow = action.payload;
      state.movies = []; // Clear current list to load fresh
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch trending movies';
      });
  },
});

export const { setTimeWindow } = trendingSlice.actions;
export default trendingSlice.reducer;
