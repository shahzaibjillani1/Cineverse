import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem('cineverse_favorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage', error);
    return [];
  }
};

const initialState = {
  items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((item) => item.id === movie.id);
      if (!exists) {
        state.items.push(movie);
        localStorage.setItem('cineverse_favorites', JSON.stringify(state.items));
        toast.success(`"${movie.title}" added to Favorites`, {
          icon: '💖',
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid #e50914',
          },
        });
      }
    },
    removeFromFavorites: (state, action) => {
      const movieId = action.payload;
      const movie = state.items.find((item) => item.id === movieId);
      state.items = state.items.filter((item) => item.id !== movieId);
      localStorage.setItem('cineverse_favorites', JSON.stringify(state.items));
      if (movie) {
        toast.success(`"${movie.title}" removed from Favorites`, {
          icon: '💔',
          style: {
            background: '#1a1a24',
            color: '#fff',
            border: '1px solid #3b82f6',
          },
        });
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
