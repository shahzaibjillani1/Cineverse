import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchNowPlaying = createAsyncThunk(
  'nowPlaying/fetchNowPlaying',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await tmdbService.getNowPlaying(page);
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

const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch now playing movies';
      });
  },
});

export default nowPlayingSlice.reducer;
