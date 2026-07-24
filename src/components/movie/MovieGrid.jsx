import MovieCard from './MovieCard';
import SkeletonCard from '../loaders/SkeletonCard';
import EmptyState from '../common/EmptyState';

export function MovieGrid({ movies, loading, emptyMessage, emptyTitle }) {
  if (loading && (!movies || movies.length === 0)) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No movies to display'}
        message={emptyMessage || 'It looks like this list has no content. Start exploration by searching for titles!'}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
