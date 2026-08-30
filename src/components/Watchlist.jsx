// src/components/Watchlist.jsx
import { useState, useEffect } from 'react';
import { fetchMovieById } from '../services/movieApi';

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
    <div id="watchlistContainer">
      {movies.map(movie => (
        <div className="movie" key={movie.imdbID}>
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
            alt={movie.Title} 
          />
          <div className="movie-info">
            <h3>{movie.Title} <span className="rating">⭐ {movie.imdbRating}</span></h3>
            <div className="movie-meta">
              <span className="runtime">{movie.Runtime}</span>
              <span className="genre">{movie.Genre}</span>
              <button className="remove-from-watchlist" onClick={() => handleRemove(movie.imdbID)}>
                <span className="minus-icon"> - </span> Remove From Watchlist
              </button>
            </div>
            <MoviePlot fullPlot={movie.Plot || ""} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── HELPER MINI-COMPONENT FOR INDEPENDENT READ MORE TOGGLING ───
function MoviePlot({ fullPlot }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = fullPlot.length > 135;
  const shortPlot = shouldTruncate ? fullPlot.substring(0, 135) + "..." : fullPlot;

  return (
    <p className="plot">
      {isExpanded ? fullPlot : shortPlot} 
      {shouldTruncate && (
        <button 
          className="read-more-btn" 
          style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', paddingLeft: '5px' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </p>
  );
}
