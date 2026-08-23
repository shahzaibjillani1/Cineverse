import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Cap total pages to 500 max (TMDB API limit for listing pages)
  const maxPages = Math.min(totalPages, 500);

  return (
    <div className="flex items-center justify-center space-x-4 py-12 select-none">
      {/* Prev Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 cursor-pointer focus:outline-none transition-colors"
        whileHover={currentPage === 1 ? {} : { scale: 1.05 }}
        whileTap={currentPage === 1 ? {} : { scale: 0.95 }}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Page indicator */}
      <div className="text-sm font-bold text-zinc-400">
        Page <span className="text-white font-extrabold">{currentPage}</span> of{' '}
        <span className="text-white font-extrabold">{maxPages}</span>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPages}
        className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 cursor-pointer focus:outline-none transition-colors"
        whileHover={currentPage === maxPages ? {} : { scale: 1.05 }}
        whileTap={currentPage === maxPages ? {} : { scale: 0.95 }}
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}

export default Pagination;
