import React, { useState, useEffect } from 'react';
import { Play, Bookmark, Heart, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import tmdbService from '../../services/tmdbService';
import useWatchlist from '../../hooks/useWatchlist';
import useFavorites from '../../hooks/useFavorites';
import TrailerModal from './TrailerModal';
import RatingBadge from '../common/RatingBadge';
import Button from '../ui/Button';

export function HeroBanner({ movie, loading }) {
  const [trailerKey, setTrailerKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { isWatchlist, addWatchlist, removeWatchlist } = useWatchlist();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isSaved = movie ? isWatchlist(movie.id) : false;
  const isFav = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const fetchTrailer = async () => {
      if (movie?.id) {
        try {
          const videos = await tmdbService.getMovieVideos(movie.id);
          const trailer = videos.results?.find(
            (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
          );
          setTrailerKey(trailer?.key || '');
        } catch (error) {
          console.error('Error fetching trailer in HeroBanner:', error);
        }
      }
    };
    fetchTrailer();
  }, [movie]);

  if (loading || !movie) {
    return (
      <div className="w-full h-[65vh] sm:h-[80vh] bg-zinc-900 shimmer dark:shimmer" />
    );
  }

  const { id, title, overview, backdrop_path, vote_average, release_date } = movie;
  const backdropUrl = `${import.meta.env.VITE_TMDB_IMAGE_URL}/original${backdrop_path}`;
  const releaseYear = release_date ? release_date.substring(0, 4) : 'N/A';

  const handleWatchlistToggle = () => {
    if (isSaved) {
      removeWatchlist(id);
    } else {
      addWatchlist(movie);
    }
  };

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[85vh] overflow-hidden select-none bg-black">
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover object-top animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 sm:pb-16 text-left space-y-4 sm:space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4 max-w-3xl"
          >
            <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold">
              <span className="px-2 py-0.5 bg-brand-primary text-white text-[10px] sm:text-xs rounded font-bold uppercase tracking-wider">
                Featured Film
              </span>
              <span className="text-zinc-300">{releaseYear}</span>
              <span className="text-zinc-500">•</span>
              <div className="flex items-center text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-current mr-1 shrink-0" />
                <span>{vote_average?.toFixed(1) || '0.0'} Rating</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight leading-tight line-clamp-2">
              {title}
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-2xl">
              {overview}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2"
          >
            {trailerKey && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center space-x-2 px-6 sm:px-7 py-3"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play Trailer</span>
              </Button>
            )}

            <Button
              onClick={handleWatchlistToggle}
              variant="secondary"
              className="flex items-center space-x-2 px-5 sm:px-6 py-3"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current text-emerald-400' : ''}`} />
              <span>{isSaved ? 'In Watchlist' : 'Watchlist'}</span>
            </Button>

            <Button
              onClick={handleFavoriteToggle}
              variant="outline"
              className="flex items-center justify-center p-3 rounded-full hover:border-rose-500 hover:text-rose-500"
              title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current text-rose-500' : ''}`} />
            </Button>
          </motion.div>
        </div>
      </div>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoKey={trailerKey}
        title={title}
      />
    </div>
  );
}

export default HeroBanner;
