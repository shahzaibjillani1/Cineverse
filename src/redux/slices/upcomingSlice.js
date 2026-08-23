import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchUpcoming = createAsyncThunk(
  'upcoming/fetchUpcoming',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getUpcoming(page);
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

const upcomingSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch upcoming movies';
      });
  },
});

export default upcomingSlice.reducer;
