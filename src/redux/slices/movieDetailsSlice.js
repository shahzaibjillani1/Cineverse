import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tmdbService from '../../services/tmdbService';

export const fetchMovieDetailsAll = createAsyncThunk(
  'movieDetails/fetchAll',
  async (movieId, { rejectWithValue }) => {
    try {
      const [details, credits, videos, reviews, recommendations, similar] = await Promise.all([
        tmdbService.getMovieDetails(movieId),
        tmdbService.getMovieCredits(movieId),
        tmdbService.getMovieVideos(movieId),
        tmdbService.getMovieReviews(movieId),
        tmdbService.getMovieRecommendations(movieId),
        tmdbService.getSimilarMovies(movieId),
      ]);

      // Add to recently viewed movies in local storage (handled in hook or reducer)
      try {
        const recent = JSON.parse(localStorage.getItem('cineverse_recently_viewed') || '[]');
        const filteredRecent = recent.filter((m) => m.id !== details.id);
        const updatedRecent = [details, ...filteredRecent].slice(0, 10);
        localStorage.setItem('cineverse_recently_viewed', JSON.stringify(updatedRecent));
      } catch (err) {
        console.error('Error updating recently viewed:', err);
      }

      return {
        details,
        credits: credits.cast || [],
        crew: credits.crew || [],
        videos: videos.results || [],
        reviews: reviews.results || [],
        recommendations: recommendations.results || [],
        similar: similar.results || [],
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  details: null,
  credits: [],
  crew: [],
  videos: [],
  reviews: [],
  recommendations: [],
  similar: [],
  loading: false,
  error: null,
  recentlyViewed: JSON.parse(localStorage.getItem('cineverse_recently_viewed') || '[]'),
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    clearMovieDetails: (state) => {
      state.details = null;
      state.credits = [];
      state.crew = [];
      state.videos = [];
      state.reviews = [];
      state.recommendations = [];
      state.similar = [];
      state.error = null;
    },
    loadRecentlyViewed: (state) => {
      state.recentlyViewed = JSON.parse(localStorage.getItem('cineverse_recently_viewed') || '[]');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetailsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetailsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload.details;
        state.credits = action.payload.credits;
        state.crew = action.payload.crew;
        state.videos = action.payload.videos;
        state.reviews = action.payload.reviews;
        state.recommendations = action.payload.recommendations;
        state.similar = action.payload.similar;
        // Reload recently viewed from localStorage in case it updated
        state.recentlyViewed = JSON.parse(localStorage.getItem('cineverse_recently_viewed') || '[]');
      })
      .addCase(fetchMovieDetailsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load movie details';
      });
  },
});

export const { clearMovieDetails, loadRecentlyViewed } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
