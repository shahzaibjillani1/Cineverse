import React from 'react';
import { Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import MovieGrid from '../components/movie/MovieGrid';
import EmptyState from '../components/common/EmptyState';

export function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight flex items-center">
          <Heart className="w-8 h-8 text-rose-500 mr-3.5 fill-current" />
          <span>My Favorites</span>
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base mt-2 leading-relaxed">
          Your personal hall of fame. Movies you've added to favorites are saved here locally.
        </p>
      </div>

      {/* Grid listing */}
      {favorites.length === 0 ? (
        <div className="py-12">
          <EmptyState
            title="No favorite movies yet"
            message="Tap the heart icon on any movie poster to add it to your personal favorites collection."
            icon={Heart}
            actionText="Browse Popular Movies"
            onActionClick={() => navigate('/')}
          />
        </div>
      ) : (
        <MovieGrid
          movies={favorites}
          loading={false}
          emptyTitle="No favorite movies yet"
          emptyMessage="Your favorite list is currently empty."
        />
      )}
    </div>
  );
}

export default Favorites;
