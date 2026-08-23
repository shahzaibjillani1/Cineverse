import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { fetchPopular } from '../redux/slices/popularSlice';
import { fetchTopRated } from '../redux/slices/topRatedSlice';
import { fetchUpcoming } from '../redux/slices/upcomingSlice';
import { fetchNowPlaying } from '../redux/slices/nowPlayingSlice';
import { fetchMovieDetailsAll, clearMovieDetails } from '../redux/slices/movieDetailsSlice';

export function useMovies() {
  const dispatch = useDispatch();

  // Selectors
  const popular = useSelector((state) => state.popular);
  const topRated = useSelector((state) => state.topRated);
  const upcoming = useSelector((state) => state.upcoming);
  const nowPlaying = useSelector((state) => state.nowPlaying);
  const details = useSelector((state) => state.movieDetails);

  // Fetch callbacks wrapped in useCallback to avoid re-renders
  const getPopular = useCallback((page) => {
    dispatch(fetchPopular(page));
  }, [dispatch]);

  const getTopRated = useCallback((page) => {
    dispatch(fetchTopRated(page));
  }, [dispatch]);

  const getUpcoming = useCallback((page) => {
    dispatch(fetchUpcoming(page));
  }, [dispatch]);

  const getNowPlaying = useCallback((page) => {
    dispatch(fetchNowPlaying(page));
  }, [dispatch]);

  const getMovieDetails = useCallback((movieId) => {
    dispatch(fetchMovieDetailsAll(movieId));
  }, [dispatch]);

  const resetDetails = useCallback(() => {
    dispatch(clearMovieDetails());
  }, [dispatch]);

  return {
    popular,
    topRated,
    upcoming,
    nowPlaying,
    details,
    getPopular,
    getTopRated,
    getUpcoming,
    getNowPlaying,
    getMovieDetails,
    resetDetails,
  };
}
export default useMovies;
