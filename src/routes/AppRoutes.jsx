import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import LoadingSpinner from '../components/loaders/LoadingSpinner';

// Dynamic lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Search = lazy(() => import('../pages/Search'));
const Favorites = lazy(() => import('../pages/Favorites'));
const Watchlist = lazy(() => import('../pages/Watchlist'));
const ListPage = lazy(() => import('../pages/ListPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <Routes>
        {/* Layout wrapper */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
          
          {/* Reusable list collections */}
          <Route path="/movies/trending" element={<ListPage type="trending" />} />
          <Route path="/movies/popular" element={<ListPage type="popular" />} />
          <Route path="/movies/top-rated" element={<ListPage type="top-rated" />} />
          <Route path="/movies/upcoming" element={<ListPage type="upcoming" />} />

          {/* Fallbacks */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
