import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getPopular(page);
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

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch popular movies';
      });
  },
});

export default popularSlice.reducer;
