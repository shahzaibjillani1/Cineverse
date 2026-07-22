import { useEffect } from 'react';
import { X, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TrailerModal({ isOpen, onClose, videoKey, title }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/50">
            <h3 className="text-base font-bold text-zinc-100 flex items-center truncate">
              <Film className="w-5 h-5 text-brand-primary mr-2 shrink-0 animate-pulse" />
              <span className="truncate">{title || 'Official Trailer'}</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors focus:outline-none"
              aria-label="Close trailer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="aspect-video w-full bg-black">
            {videoKey ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0`}
                title={`${title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                <Film className="w-12 h-12 text-zinc-700 mb-3" />
                <p className="text-sm font-semibold">We couldn't find an official trailer on YouTube.</p>
                <p className="text-xs text-zinc-600 mt-1">Try searching on YouTube directly.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default TrailerModal;
