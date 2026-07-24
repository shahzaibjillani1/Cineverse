import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import useFavorites from "../../hooks/useFavorites";
import useWatchlist from "../../hooks/useWatchlist";
import RatingBadge from "../common/RatingBadge";
import LazyImage from "../common/LazyImage";

export function MovieCard({ movie }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isWatchlist, addWatchlist, removeWatchlist } = useWatchlist();

  if (!movie) return null;

  const { id, title, poster_path, release_date, vote_average } = movie;
  const isFav = isFavorite(id);
  const isWatch = isWatchlist(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite(movie);
    }
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWatch) {
      removeWatchlist(id);
    } else {
      addWatchlist(movie);
    }
  };

  const releaseYear = release_date ? release_date.substring(0, 4) : "N/A";
  const posterUrl = poster_path
    ? `${import.meta.env.VITE_TMDB_IMAGE_URL}/w342${poster_path}`
    : null;

  return (
    <motion.div
      className="group relative flex flex-col bg-zinc-900/30 border border-zinc-800/40 rounded-xl overflow-hidden shadow-lg glass-card select-none"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${id}`} className="block h-full">
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950 zoom-img-container">
          <LazyImage
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
            placeholderClassName="h-full w-full"
            wrapperClassName="h-full w-full"
          />

          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md ${
                isFav
                  ? "bg-rose-500 text-white border border-rose-500"
                  : "bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-zinc-800"
              }`}
              title={isFav ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={handleWatchlistClick}
              className={`p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md ${
                isWatch
                  ? "bg-emerald-500 text-white border border-emerald-500"
                  : "bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-zinc-800"
              }`}
              title={isWatch ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              <Bookmark
                className={`w-4 h-4 ${isWatch ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="absolute bottom-2 left-2 z-10">
            <RatingBadge rating={vote_average} />
          </div>
        </div>

        <div className="p-3.5 flex-grow flex flex-col justify-between">
          <h4 className="text-xs font-bold text-zinc-100 group-hover:text-brand-primary line-clamp-1 transition-colors duration-200">
            {title}
          </h4>
          <span className="text-[10px] text-zinc-500 font-semibold mt-1">
            {releaseYear}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default MovieCard;
