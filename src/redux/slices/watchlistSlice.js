import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadWatchlistFromStorage = () => {
  try {
    const saved = localStorage.getItem('cineverse_watchlist');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load watchlist from localStorage', error);
    return [];
  }
};

const initialState = {
  items: loadWatchlistFromStorage(),
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((item) => item.id === movie.id);
      if (!exists) {
        state.items.push(movie);
        localStorage.setItem('cineverse_watchlist', JSON.stringify(state.items));
        toast.success(`"${movie.title}" added to Watchlist`, {
          icon: '🔖',
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid #10b981',
          },
        });
      }
    },
    removeFromWatchlist: (state, action) => {
      const movieId = action.payload;
      const movie = state.items.find((item) => item.id === movieId);
      state.items = state.items.filter((item) => item.id !== movieId);
      localStorage.setItem('cineverse_watchlist', JSON.stringify(state.items));
      if (movie) {
        toast.success(`"${movie.title}" removed from Watchlist`, {
          icon: '🗑️',
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        });
      }
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
