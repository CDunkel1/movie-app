// src/components/Watchlist.jsx
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../services/movieApi';
import MovieCard from './MovieCard';

export default function Watchlist({ onToggleView }) {
  const [watchlistIds, setWatchlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch full movie details safely
  useEffect(() => {
    let isMounted = true; 
    
    const loadMovieData = async () => {
      // 🟢 FIXED: If the watchlist is completely empty, clear state safely INSIDE the async line flow 
      if (watchlistIds.length === 0) {
        if (isMounted) setMovies([]);
        return;
      }

      setLoading(true);
      try {
        const moviePromises = watchlistIds.map(id => fetchMovieById(id));
        const details = await Promise.all(moviePromises);
        
        if (isMounted) {
          const normalizedMovies = details
            .filter(movie => movie !== null)
            .map(movie => ({
              imdbID: movie.imdbID,
              Title: movie.Title,
              Poster: movie.Poster,
              Year: movie.Year ? movie.Year.substring(0, 4) : 'N/A', 
              Runtime: movie.Runtime,
              Genre: movie.Genre,
              Plot: movie.Plot
            }));

          setMovies(normalizedMovies);
        }
      } catch (error) {
        console.error("Error loading watchlist details:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadMovieData();
    
    return () => {
      isMounted = false; 
    };
  }, [watchlistIds]); // Triggers cleanly only when storage array modifications execute

  // Remove Item handler
  const handleRemove = (id) => {
    const updatedIds = watchlistIds.filter(movieId => movieId !== id);
    setWatchlistIds(updatedIds);
    localStorage.setItem("watchlist", JSON.stringify(updatedIds));
  };

  if (loading) return <p className="loading">Loading your watchlist...</p>;

  // Empty State Layout
  if (watchlistIds.length === 0) {
    return (
      <div id="watchlist">
        <h2 className="empty">Your watchlist is looking a little empty...</h2>
        <button className="watchlist-btn" onClick={onToggleView}>
          <span className="plus-icon">+</span> Let's add some movies!
        </button>
      </div>
    );
  }

  return (
    <div id="watchlistContainer" className="watchlist-results-wrap">
      {movies.map(movie => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onAddToWatchlist={handleRemove} 
          isWatchlistPage={true} 
        />
      ))}
    </div>
  );
}
