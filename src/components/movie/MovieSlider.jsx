import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import SkeletonCard from '../loaders/SkeletonCard';

export function MovieSlider({ movies, loading, title }) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollBounds);
      checkScrollBounds();
      window.addEventListener('resize', checkScrollBounds);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollBounds);
      }
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [movies, loading]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { clientWidth } = sliderRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group/slider my-8">
      {title && (
        <h3 className="text-lg font-bold text-white mb-4 px-1 font-display tracking-wide uppercase flex items-center">
          <span className="w-1.5 h-5 bg-brand-primary rounded mr-2.5 inline-block" />
          {title}
        </h3>
      )}

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/70 hover:bg-brand-primary text-white rounded-full shadow-lg border border-zinc-800 hover:border-brand-primary cursor-pointer transition-all duration-200 opacity-0 group-hover/slider:opacity-100 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div
          ref={sliderRef}
          className="flex space-x-5 overflow-x-auto overflow-y-hidden pb-4 pt-1 px-1 scroll-smooth no-scrollbar"
        >
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="w-[150px] sm:w-[180px] shrink-0">
                  <SkeletonCard />
                </div>
              ))
            : movies?.map((movie) => (
                <div key={movie.id} className="w-[150px] sm:w-[180px] shrink-0">
                  <MovieCard movie={movie} />
                </div>
              ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/70 hover:bg-brand-primary text-white rounded-full shadow-lg border border-zinc-800 hover:border-brand-primary cursor-pointer transition-all duration-200 opacity-0 group-hover/slider:opacity-100 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieSlider;
