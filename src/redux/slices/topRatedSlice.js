import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchTopRated = createAsyncThunk(
  'topRated/fetchTopRated',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getTopRated(page);
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
};

const topRatedSlice = createSlice({
  name: 'topRated',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch top rated movies';
      });
  },
});

export default topRatedSlice.reducer;
