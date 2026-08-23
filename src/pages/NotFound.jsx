import React from 'react';
import { Link } from 'react-router-dom';
import { Film, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Animated Camera Icon */}
      <motion.div
        initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="p-6 bg-zinc-900 border border-zinc-800 rounded-full mb-8 text-brand-primary glow-primary"
      >
        <Film className="w-16 h-16 animate-pulse" />
      </motion.div>

      {/* Title */}
      <h1 className="text-7xl sm:text-9xl font-black text-white font-display tracking-tighter">
        404
      </h1>
      
      {/* Tagline */}
      <h2 className="text-xl sm:text-2xl font-bold text-zinc-300 mt-4 font-display">
        Lost in the Cinematic Universe?
      </h2>
      
      {/* Description */}
      <p className="text-sm text-zinc-500 max-w-md mt-2 mb-10 leading-relaxed">
        The scene you are looking for has been cut from the final edit, or it was never filmed at all. Let's redirect you back to safety.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/">
          <Button variant="primary" className="flex items-center space-x-2 w-full sm:w-auto">
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Button>
        </Link>
        <Link to="/search">
          <Button variant="outline" className="flex items-center space-x-2 w-full sm:w-auto">
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Movies</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
