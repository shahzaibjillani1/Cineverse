import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/watchlistSlice';

export function useWatchlist() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.watchlist.items);

  const add = useCallback(
    (movie) => {
      dispatch(addToWatchlist(movie));
    },
    [dispatch]
  );

  const remove = useCallback(
    (movieId) => {
      dispatch(removeFromWatchlist(movieId));
    },
    [dispatch]
  );

  const checkIsWatchlist = useCallback(
    (movieId) => {
      return items.some((item) => item.id === movieId);
    },
    [items]
  );

  return {
    watchlist: items,
    count: items.length,
    addWatchlist: add,
    removeWatchlist: remove,
    isWatchlist: checkIsWatchlist,
  };
}
export default useWatchlist;
