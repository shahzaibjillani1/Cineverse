import React, { useEffect, useState } from 'react';
import useMovies from '../hooks/useMovies';
import useTrending from '../hooks/useTrending';
import MovieGrid from '../components/movie/MovieGrid';
import Pagination from '../components/ui/Pagination';
import ErrorState from '../components/common/ErrorState';

export function ListPage({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { popular, topRated, upcoming, getPopular, getTopRated, getUpcoming } = useMovies();
  const { movies: trendingMovies, loading: trendingLoading, error: trendingError, totalPages: trendingTotal, getTrending } = useTrending();

  // Map type to state and actions
  const getPageConfig = () => {
    switch (type) {
      case 'trending':
        return {
          title: 'Trending Movies',
          description: 'The most popular movies watched across the globe today.',
          movies: trendingMovies,
          loading: trendingLoading,
          error: trendingError,
          totalPages: trendingTotal,
          fetchAction: (page) => getTrending(page, 'day'),
        };
      case 'popular':
        return {
          title: 'Popular Releases',
          description: 'Audience favorites and blockbusters playing right now.',
          movies: popular.movies,
          loading: popular.loading,
          error: popular.error,
          totalPages: popular.totalPages,
          fetchAction: getPopular,
        };
      case 'top-rated':
        return {
          title: 'Top Rated Hits',
          description: 'Highest-reviewed cinematic masterworks of all time.',
          movies: topRated.movies,
          loading: topRated.loading,
          error: topRated.error,
          totalPages: topRated.totalPages,
          fetchAction: getTopRated,
        };
      case 'upcoming':
        return {
          title: 'Upcoming Movies',
          description: 'Highly anticipated films scheduled to release soon.',
          movies: upcoming.movies,
          loading: upcoming.loading,
          error: upcoming.error,
          totalPages: upcoming.totalPages,
          fetchAction: getUpcoming,
        };
      default:
        return {};
    }
  };

  const config = getPageConfig();

  // Reset page when category type changes
  useEffect(() => {
    setCurrentPage(1);
    if (config.fetchAction) {
      config.fetchAction(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (config.fetchAction) {
      config.fetchAction(page);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (config.error) {
    return (
      <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
        <ErrorState onRetry={() => config.fetchAction(currentPage)} />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight flex items-center">
          <span className="w-2.5 h-8 bg-brand-primary rounded-md mr-3.5 inline-block" />
          {config.title}
        </h1>
        <p className="text-zinc-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Grid of movie cards */}
      <MovieGrid
        movies={config.movies}
        loading={config.loading}
        emptyTitle={`No ${config.title} found`}
        emptyMessage="We couldn't retrieve any movies for this list at the moment. Please try again later."
      />

      {/* Pagination controls */}
      {!config.loading && config.movies?.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={config.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ListPage;
