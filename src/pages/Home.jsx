import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGenres } from '../redux/slices/genresSlice';
import useMovies from '../hooks/useMovies';
import useTrending from '../hooks/useTrending';
import useSearch from '../hooks/useSearch';
import HeroBanner from '../components/movie/HeroBanner';
import MovieSlider from '../components/movie/MovieSlider';
import LazyImage from '../components/common/LazyImage';
import { fetchPopular } from '../redux/slices/popularSlice';
import tmdbService from '../services/tmdbService';
import { User, Flame, Clapperboard, Award, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Custom hooks
  const { popular, topRated, upcoming, nowPlaying, getPopular, getTopRated, getUpcoming, getNowPlaying } = useMovies();
  const { movies: trendingMovies, loading: trendingLoading, getTrending } = useTrending();
  const { genres, loading: genresLoading } = useSelector((state) => state.genres);
  const { updateFilters } = useSearch();

  // Local state for actors section
  const [actors, setActors] = useState([]);
  const [actorsLoading, setActorsLoading] = useState(false);

  // Load all movie collections on mount
  useEffect(() => {
    getTrending(1, 'day');
    getNowPlaying(1);
    getPopular(1);
    getTopRated(1);
    getUpcoming(1);

    if (genres.length === 0) {
      dispatch(fetchGenres());
    }

    // Fetch popular actors
    const fetchActors = async () => {
      setActorsLoading(true);
      try {
        const data = await tmdbService.getPopularPeople(1);
        setActors(data.results?.slice(0, 10) || []); // Get top 10 popular actors
      } catch (err) {
        console.error('Error fetching popular actors:', err);
      } finally {
        setActorsLoading(false);
      }
    };
    fetchActors();
  }, [dispatch, getTrending, getNowPlaying, getPopular, getTopRated, getUpcoming, genres.length]);

  // Pick the first trending movie as the featured hero banner film
  const featuredMovie = trendingMovies?.[0] || popular.movies?.[0] || null;

  const handleGenreClick = (genreId) => {
    // Set the genre filter in Redux and navigate to Search
    updateFilters({ genre: genreId.toString() });
    navigate(`/search`);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-16">
      {/* Featured Film banner */}
      <HeroBanner movie={featuredMovie} loading={trendingLoading && !featuredMovie} />

      {/* Main categories lists */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 -mt-16 sm:-mt-24 relative z-10">
        
        {/* Trending Slider */}
        <MovieSlider
          title="Trending Today"
          movies={trendingMovies}
          loading={trendingLoading && (!trendingMovies || trendingMovies.length === 0)}
        />

        {/* Now Playing Slider */}
        <MovieSlider
          title="Now In Theaters"
          movies={nowPlaying.movies}
          loading={nowPlaying.loading && nowPlaying.movies.length === 0}
        />

        {/* Popular Slider */}
        <MovieSlider
          title="Popular Releases"
          movies={popular.movies}
          loading={popular.loading && popular.movies.length === 0}
        />

        {/* Interactive Categories list */}
        <div className="my-10 text-left">
          <h3 className="text-lg font-bold text-white mb-5 px-1 font-display tracking-wide uppercase flex items-center">
            <span className="w-1.5 h-5 bg-brand-primary rounded mr-2.5 inline-block" />
            Browse Genres
          </h3>
          {genresLoading && genres.length === 0 ? (
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="h-9 w-24 rounded-full shimmer dark:shimmer" />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <motion.button
                  key={genre.id}
                  onClick={() => handleGenreClick(genre.id)}
                  className="px-5 py-2 text-xs sm:text-sm font-bold text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-brand-primary hover:text-white rounded-full transition-all duration-300 cursor-pointer shadow-md select-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {genre.name}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Top Rated Slider */}
        <MovieSlider
          title="Top Rated Classics"
          movies={topRated.movies}
          loading={topRated.loading && topRated.movies.length === 0}
        />

        {/* Top Actors Section */}
        <div className="my-12 text-left">
          <h3 className="text-lg font-bold text-white mb-6 px-1 font-display tracking-wide uppercase flex items-center">
            <span className="w-1.5 h-5 bg-brand-primary rounded mr-2.5 inline-block" />
            Top Personalities
          </h3>
          <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
            {actorsLoading && actors.length === 0
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center w-28 sm:w-32 shrink-0 space-y-3">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shimmer dark:shimmer" />
                    <div className="h-4 w-3/4 rounded shimmer dark:shimmer" />
                  </div>
                ))
              : actors.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center text-center w-28 sm:w-32 shrink-0 group select-none cursor-pointer"
                    onClick={() => {
                      // Perform search for actor's name
                      updateQuery(actor.name);
                      navigate(`/search?q=${encodeURIComponent(actor.name)}`);
                    }}
                  >
                    {/* Actor Picture */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border border-zinc-800 bg-zinc-900 group-hover:border-brand-primary transition-all duration-300 shadow-lg shrink-0">
                      {actor.profile_path ? (
                        <LazyImage
                          src={`${import.meta.env.VITE_TMDB_IMAGE_URL}/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          placeholderClassName="w-full h-full"
                          wrapperClassName="w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 bg-zinc-900">
                          <User className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    {/* Actor Name */}
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-brand-primary line-clamp-1 w-full transition-colors">
                      {actor.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-semibold mt-0.5 line-clamp-1 w-full">
                      {actor.known_for_department || 'Acting'}
                    </span>
                  </div>
                ))}
          </div>
        </div>

        {/* Upcoming Slider */}
        <MovieSlider
          title="Coming Soon"
          movies={upcoming.movies}
          loading={upcoming.loading && upcoming.movies.length === 0}
        />

      </div>
    </div>
  );
}

export default Home;
