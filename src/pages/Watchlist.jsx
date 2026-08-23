import React from 'react';
import { Bookmark, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useWatchlist from '../hooks/useWatchlist';
import MovieGrid from '../components/movie/MovieGrid';
import EmptyState from '../components/common/EmptyState';

export function Watchlist() {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight flex items-center">
          <Bookmark className="w-8 h-8 text-emerald-500 mr-3.5 fill-current" />
          <span>My Watchlist</span>
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base mt-2 leading-relaxed">
          Your personal queue. Movies you plan to watch later, saved locally.
        </p>
      </div>

      {/* Grid listing */}
      {watchlist.length === 0 ? (
        <div className="py-12">
          <EmptyState
            title="Your watchlist is empty"
            message="Tap the bookmark icon on any movie card to build your customized queue."
            icon={Bookmark}
            actionText="Browse Trending Movies"
            onActionClick={() => navigate('/')}
          />
        </div>
      ) : (
        <MovieGrid
          movies={watchlist}
          loading={false}
          emptyTitle="Your watchlist is empty"
          emptyMessage="You haven't saved any movies to your watchlist yet."
        />
      )}
    </div>
  );
}

export default Watchlist;
