import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Heart, Bookmark, Share2, Star, Clock, Calendar, Globe, DollarSign, ArrowLeft } from 'lucide-react';
import useMovies from '../hooks/useMovies';
import useFavorites from '../hooks/useFavorites';
import useWatchlist from '../hooks/useWatchlist';
import RatingBadge from '../components/common/RatingBadge';
import GenreBadge from '../components/common/GenreBadge';
import LazyImage from '../components/common/LazyImage';
import CastCard from '../components/movie/CastCard';
import ReviewCard from '../components/movie/ReviewCard';
import MovieSlider from '../components/movie/MovieSlider';
import TrailerModal from '../components/movie/TrailerModal';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import ErrorState from '../components/common/ErrorState';
import Button from '../components/ui/Button';
import { formatCurrency, formatRuntime, formatDate } from '../utils';
import toast from 'react-hot-toast';

export function MovieDetails() {
  const { id } = useParams();
  
  // Custom Hooks
  const { details: detailsState, getMovieDetails, resetDetails } = useMovies();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isWatchlist, addWatchlist, removeWatchlist } = useWatchlist();

  // Local Modal state
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Sync details on ID change and reset on unmount
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      getMovieDetails(id);
    }
    return () => {
      resetDetails();
    };
  }, [id, getMovieDetails, resetDetails]);

  // Destructure states
  const { details, credits, crew, videos, reviews, recommendations, similar, loading, error } = detailsState;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
        <ErrorState
          title="Unable to load details"
          message={typeof error === 'string' ? error : 'The movie details could not be retrieved from the server. It might have been removed.'}
          onRetry={() => getMovieDetails(id)}
        />
      </div>
    );
  }

  // Get important crew and trailers
  const directors = crew?.filter((c) => c.job === 'Director') || [];
  const writers = crew?.filter((c) => c.job === 'Screenplay' || c.job === 'Writer' || c.job === 'Story') || [];
  const trailer = videos?.find((v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));

  const isFav = isFavorite(details.id);
  const isWatch = isWatchlist(details.id);

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFavorite(details.id);
    } else {
      addFavorite(details);
    }
  };

  const handleWatchlistToggle = () => {
    if (isWatch) {
      removeWatchlist(details.id);
    } else {
      addWatchlist(details);
    }
  };

  const handleShareClick = () => {
    try {
      const link = window.location.href;
      navigator.clipboard.writeText(link);
      toast.success('Movie link copied to clipboard!', {
        icon: '🔗',
        style: {
          background: '#1a1a24',
          color: '#fff',
          border: '1px solid #3b82f6',
        },
      });
    } catch (err) {
      toast.error('Failed to copy sharing link.');
    }
  };

  // Image urls
  const backdropUrl = details.backdrop_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/original${details.backdrop_path}`
    : null;
  const posterUrl = details.poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w500${details.poster_path}`
    : null;

  return (
    <div className="bg-zinc-950 text-white min-h-screen pb-16 select-none">
      
      {/* Backdrop Backdrop Container */}
      <div className="relative w-full h-[50vh] sm:h-[65vh] overflow-hidden">
        {backdropUrl ? (
          <img
            src={backdropUrl}
            alt={details.title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 border-b border-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/60" />
      </div>

      {/* Main Details Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 sm:-mt-52 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          
          {/* Left Poster block */}
          <div className="w-48 sm:w-64 mx-auto lg:mx-0 shrink-0 select-none">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 aspect-[2/3]">
              <LazyImage
                src={posterUrl}
                alt={details.title}
                className="w-full h-full object-cover"
                placeholderClassName="w-full h-full"
                wrapperClassName="w-full h-full"
              />
            </div>

            {/* Collection Actions Panel */}
            <div className="flex justify-between items-center gap-3 mt-6">
              <Button
                onClick={handleWatchlistToggle}
                variant={isWatch ? 'secondary' : 'outline'}
                className="flex-grow flex items-center justify-center space-x-2 text-xs py-3"
              >
                <Bookmark className={`w-4 h-4 ${isWatch ? 'fill-current text-emerald-400' : ''}`} />
                <span>{isWatch ? 'In Watchlist' : 'Add Watchlist'}</span>
              </Button>

              <button
                onClick={handleFavoriteToggle}
                className={`p-3 rounded-full cursor-pointer transition-all duration-200 border ${
                  isFav
                    ? 'bg-rose-500 text-white border-rose-500 glow-accent'
                    : 'bg-zinc-900 text-zinc-400 hover:text-rose-500 border-zinc-800 hover:border-zinc-700'
                }`}
                title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <Heart className={`w-4.5 h-4.5 ${isFav ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShareClick}
                className="p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-full cursor-pointer transition-colors"
                title="Copy Link to Share"
              >
                <Share2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Right Movie Details Info Card */}
          <div className="flex-grow text-left space-y-6">
            
            {/* Title & Tagline */}
            <div>
              {details.tagline && (
                <span className="text-brand-primary text-xs sm:text-sm font-bold uppercase tracking-wider font-display">
                  {details.tagline}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight leading-tight mt-1">
                {details.title}
              </h1>
            </div>

            {/* Quick Metadata Pill Lists */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-zinc-400">
              <RatingBadge rating={details.vote_average} size="md" />
              <span className="text-zinc-700">|</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-brand-primary mr-1" />
                <span>{formatRuntime(details.runtime)}</span>
              </div>
              <span className="text-zinc-700">|</span>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-brand-primary mr-1" />
                <span>{formatDate(details.release_date)}</span>
              </div>
              {details.spoken_languages?.[0] && (
                <>
                  <span className="text-zinc-700">|</span>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4 text-brand-primary mr-1" />
                    <span className="uppercase">{details.spoken_languages[0].iso_639_1}</span>
                  </div>
                </>
              )}
            </div>

            {/* Genre badges list */}
            <div className="flex flex-wrap gap-2">
              {details.genres?.map((g) => (
                <GenreBadge key={g.id} name={g.name} />
              ))}
            </div>

            {/* Trailer Action Button */}
            {trailer && (
              <div className="pt-2">
                <Button onClick={() => setIsTrailerOpen(true)} className="flex items-center space-x-2 px-6">
                  <Play className="w-4.5 h-4.5 fill-current" />
                  <span>Watch Official Trailer</span>
                </Button>
              </div>
            )}

            {/* Overview / Story Plot */}
            <div className="space-y-2.5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-zinc-500">Synopsis</h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {details.overview || 'No overview available for this film.'}
              </p>
            </div>

            {/* Directors, Writers & Financial Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
              
              {/* Crew Details list */}
              <div className="space-y-4">
                {directors.length > 0 && (
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Director</h4>
                    <span className="text-sm font-bold text-zinc-200">{directors.map((d) => d.name).join(', ')}</span>
                  </div>
                )}
                {writers.length > 0 && (
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1">Writers</h4>
                    <span className="text-sm font-semibold text-zinc-300">{writers.slice(0, 3).map((w) => w.name).join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Financial Box Stats */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1 flex items-center">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 mr-0.5" />
                    Budget
                  </h4>
                  <span className="text-sm font-bold text-zinc-200">{formatCurrency(details.budget)}</span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1 flex items-center">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500 mr-0.5" />
                    Revenue
                  </h4>
                  <span className="text-sm font-bold text-zinc-200">{formatCurrency(details.revenue)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Members slider */}
        {credits && credits.length > 0 && (
          <div className="mt-16 text-left">
            <h3 className="text-lg font-bold text-white mb-6 font-display tracking-wide uppercase flex items-center">
              <span className="w-1.5 h-5 bg-brand-primary rounded mr-2.5 inline-block" />
              Principal Cast
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
              {credits.slice(0, 15).map((member) => (
                <CastCard key={member.cast_id || member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* User Reviews Section */}
        {reviews && reviews.length > 0 && (
          <div className="mt-16 text-left">
            <h3 className="text-lg font-bold text-white mb-6 font-display tracking-wide uppercase flex items-center">
              <span className="w-1.5 h-5 bg-brand-primary rounded mr-2.5 inline-block" />
              User Reviews
            </h3>
            <div className="max-w-4xl space-y-4">
              {reviews.slice(0, 3).map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          </div>
        )}

        {/* Recommendations slider */}
        {recommendations && recommendations.length > 0 && (
          <div className="mt-16 border-t border-zinc-900 pt-8">
            <MovieSlider title="Recommended Movies" movies={recommendations} loading={false} />
          </div>
        )}

        {/* Similar movies slider */}
        {similar && similar.length > 0 && (
          <div className="mt-12">
            <MovieSlider title="Similar Movies" movies={similar} loading={false} />
          </div>
        )}

      </div>

      {/* Trailer video modal */}
      {trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          videoKey={trailer.key}
          title={details.title}
        />
      )}
    </div>
  );
}

export default MovieDetails;
