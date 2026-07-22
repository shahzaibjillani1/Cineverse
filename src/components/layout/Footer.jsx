import { Link } from "react-router-dom";
import { Film, Code, Send, Camera, Mail } from "lucide-react";

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="w-6 h-6 text-brand-primary" />
              <span className="text-xl font-bold tracking-wider text-white font-display">
                CINEVERSE
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Explore your next movie obsession. CineVerse provides live
              trailers, cast indexes, genre queries, and curated lists for
              cinema lovers worldwide. Powered by TMDB.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Github"
              >
                <Code className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/movies/trending"
                  className="hover:text-white transition-colors"
                >
                  Trending Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/popular"
                  className="hover:text-white transition-colors"
                >
                  Popular Releases
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/top-rated"
                  className="hover:text-white transition-colors"
                >
                  Top Rated Hits
                </Link>
              </li>
              <li>
                <Link
                  to="/movies/upcoming"
                  className="hover:text-white transition-colors"
                >
                  Upcoming Soon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/watchlist"
                  className="hover:text-white transition-colors"
                >
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="hover:text-white transition-colors"
                >
                  My Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="hover:text-white transition-colors"
                >
                  Search & Filter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API License Agreement
                </a>
              </li>
              <li className="text-xs text-zinc-500 pt-2 leading-relaxed">
                This product uses the TMDB API but is not endorsed or certified
                by TMDB.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>© {currentYear} CineVerse Inc. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Designed and built with 💖 by Shahzaib Jillani
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
