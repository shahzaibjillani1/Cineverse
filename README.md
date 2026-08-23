# 🎬 Cineverse

Cineverse is a movie and TV discovery web app built with **React** and **Vite**, powered by **The Movie Database (TMDB) API**. Browse trending titles, search for movies and shows, and view detailed information — all in a fast, modern single-page app.

## ✨ Features

- 🔍 Search movies and TV shows in real time
- 🔥 Browse trending, popular, and top-rated titles
- 🎞️ Detailed view with overview, rating, release date, genres, and cast
- 🖼️ Poster and backdrop images served via TMDB's image CDN
- ⚡ Fast dev experience with Vite's HMR
- 📱 Responsive UI for desktop and mobile

## 🛠️ Tech Stack

| Category   | Technology            |
|------------|------------------------|
| Frontend   | React (Vite)           |
| Styling    | Tailwind |
| Data       | TMDB API                |
| Tooling    | ESLint, Vite            |

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cineverse.git
cd cineverse

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The optimized production build will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
cineverse/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── services/         # TMDB API calls
│   ├── assets/           # Images, icons, etc.
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## 🔌 API Reference

Cineverse uses [TMDB's API v3](https://developer.themoviedb.org/reference/intro/getting-started) for:

- `/trending/movie/{time_window}` — Trending movies
- `/search/movie` — Search movies
- `/movie/{movie_id}` — Movie details

## 🧹 Linting

This project uses ESLint for code quality. Run:

```bash
npm run lint
```

## 🚀 Deployment

Cineverse can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages). Remember to set your `VITE_TMDB_API_KEY` in the hosting provider's environment variable settings.

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for providing the movie and TV data API
- [Vite](https://vitejs.dev/) for the build tooling
- [React](https://react.dev/) for the UI framework

---

*This product uses the TMDB API but is not endorsed or certified by TMDB.*
