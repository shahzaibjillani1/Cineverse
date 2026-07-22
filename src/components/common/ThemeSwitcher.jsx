import { Sun, Moon } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import { motion } from 'framer-motion';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-full cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-800 hover:text-brand-primary dark:text-zinc-300 text-zinc-700 transition-colors focus:outline-none"
      aria-label="Toggle Theme"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-zinc-900" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeSwitcher;
