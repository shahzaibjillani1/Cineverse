import React from 'react';
import { motion } from 'framer-motion';

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) {
  const getVariants = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700/50';
      case 'outline':
        return 'bg-transparent hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500';
      case 'ghost':
        return 'bg-transparent hover:bg-zinc-900/60 text-zinc-400 hover:text-white';
      default:
        // Primary cinematic red
        return 'bg-brand-primary hover:bg-red-700 text-white shadow-lg glow-primary';
    }
  };

  const getSizes = () => {
    switch (size) {
      case 'lg':
        return 'px-6 py-3 text-base rounded-full font-bold';
      case 'sm':
        return 'px-3 py-1.5 text-xs rounded-full font-semibold';
      default:
        return 'px-4.5 py-2.5 text-sm rounded-full font-bold';
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed ${getVariants()} ${getSizes()} ${className}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
