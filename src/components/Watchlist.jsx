// src/components/Watchlist.jsx
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../services/movieApi';
import MovieCard from './MovieCard'; 

export default function Watchlist({ onToggleView }) {
  // 1. Initialize state by reading directly from LocalStorage
  const [watchlistIds, setWatchlistIds] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Fetch full movie details safely
  useEffect(() => {
    if (watchlistIds.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMovies([]);
      return;
    }

    let isMounted = true; // Prevents updating state if component unmounts mid-fetch

    const loadMovieData = async () => {
      setLoading(true);
      try {
        const moviePromises = watchlistIds.map(id => fetchMovieById(id));
        const details = await Promise.all(moviePromises);
        
        if (isMounted) {
          setMovies(details.filter(movie => movie !== null));
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
      isMounted = false; // Cleanup function to break the rendering loop chain
    };
  }, [watchlistIds]); // ✅ Controlled loop dependency

  // 3. Remove Item handler
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
        /* 🟢 Reusing the premium card asset with removal control flags passed down */
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


