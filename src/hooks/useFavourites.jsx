import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addToFavorites, removeFromFavorites } from '../redux/slices/favoritesSlice';

export function useFavorites() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.favorites.items);

  const add = useCallback(
    (movie) => {
      dispatch(addToFavorites(movie));
    },
    [dispatch]
  );

  const remove = useCallback(
    (movieId) => {
      dispatch(removeFromFavorites(movieId));
    },
    [dispatch]
  );

  const checkIsFavorite = useCallback(
    (movieId) => {
      return items.some((item) => item.id === movieId);
    },
    [items]
  );

  return {
    favorites: items,
    count: items.length,
    addFavorite: add,
    removeFavorite: remove,
    isFavorite: checkIsFavorite,
  };
}
export default useFavorites;
