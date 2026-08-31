// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Watchlist from './components/Watchlist';
import MovieList from './components/MovieList';
import { fetchMoviesBySearch } from './services/movieApi';
import './App.css';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';

function App() {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleToggleView = () => {
    setShowWatchlist(current => !current);
  };

  const handleSearchSubmit = async (query) => {
    // If the user clears the search bar or submits an empty string, reset movies to show the rows again
    if (!query.trim()) {
      setMovies([]);
      return;
    }
    const results = await fetchMoviesBySearch(query);
    setMovies(results);
  };

  const handleAddToWatchlist = (movie) => {
    const currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!currentWatchlist.includes(movie.imdbID)) {
      const updatedWatchlist = [...currentWatchlist, movie.imdbID];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${movie.Title} added to your watchlist!`);
    } else {
      alert(`${movie.Title} is already in your watchlist!`);
    }
  };

  return (
    <div className="app-container">
      <Navbar onToggleView={handleToggleView} showWatchlist={showWatchlist} />
      <main>
        {showWatchlist ? (
          <Watchlist onToggleView={handleToggleView} />
        ) : (
          <>
            <Hero />
            <SearchBar onSearch={handleSearchSubmit} />
            
            {/* 🟢 CONDITIONAL RENDERING SWITCH */}
            {movies && movies.length > 0 ? (
              /* VIEW A: Show search results when movies array has data */
              <div className="search-results-wrapper">
                <h2 className="search-results-heading">Search Results</h2>
                <MovieList movies={movies} onAddToWatchlist={handleAddToWatchlist} />
              </div>
            ) : (
              /* VIEW B: Default home view with curated rows when no search active */
              <div className="homepage-rows">
  <MovieRow title="Featured Blockbusters" fetchQuery="avengers" onAddToWatchlist={handleAddToWatchlist} />
  <MovieRow title="Action & Adventure" fetchQuery="batman" onAddToWatchlist={handleAddToWatchlist} />
  <MovieRow title="Heartfelt & Comedies" fetchQuery="love" onAddToWatchlist={handleAddToWatchlist} />
</div>

            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
