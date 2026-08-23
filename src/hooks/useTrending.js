import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchTrending, setTimeWindow } from '../redux/slices/trendingSlice';

export function useTrending() {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.trending);

  const getTrending = useCallback((page, timeWindow) => {
    dispatch(fetchTrending({ page, timeWindow }));
  }, [dispatch]);

  const updateTimeWindow = useCallback((timeWindow) => {
    dispatch(setTimeWindow(timeWindow));
    dispatch(fetchTrending({ page: 1, timeWindow }));
  }, [dispatch]);

  return {
    ...trending,
    getTrending,
    updateTimeWindow,
  };
}
export default useTrending;
