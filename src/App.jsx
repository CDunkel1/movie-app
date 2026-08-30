// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Watchlist from './components/Watchlist';
import MovieList from './components/MovieList';
import { fetchMoviesBySearch } from './services/movieApi'; // 👈 1. Import your API service
import './App.css';
import Hero from './components/Hero';

// src/App.jsx
// ... keep your imports the same ...

function App() {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleToggleView = () => {
    setShowWatchlist(current => !current);
  };

  const handleSearchSubmit = async (query) => {
    const results = await fetchMoviesBySearch(query);
    setMovies(results); 
  };

  // 👇 ADD THIS NEW FUNCTION HERE
  const handleAddToWatchlist = (movie) => {
    // 1. Get current watchlist from localStorage, fallback to empty array if empty
    const currentWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    
    // 2. Check if the movie is already in the watchlist to avoid duplicates
    if (!currentWatchlist.includes(movie.imdbID)) {
      const updatedWatchlist = [...currentWatchlist, movie.imdbID];
      
      // 3. Save back to localStorage
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
            
            {/* 👇 UPDATE THIS LINE: Pass the new function as a prop */}
            <MovieList movies={movies} onAddToWatchlist={handleAddToWatchlist} /> 
          </>
        )}
      </main>
    </div>
  );
}

export default App;
