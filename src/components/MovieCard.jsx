// src/components/MovieCard.jsx
import { useState } from 'react';

export default function MovieCard({ movie, onAddToWatchlist, isWatchlistPage }) {
  // 🟢 Declare 'plot' inside initial state channel so React tracks it instantly
  const [details, setDetails] = useState({ runtime: '', genre: '', plot: '' });
  const [fetched, setFetched] = useState(false);

  const handleMouseEnter = async () => {
    if (fetched) return; 
    try {
      const BASE_URL = 'https://omdbapi.com';
      const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`);
      const data = await response.json();
      
      if (data && data.Response !== "False") {
        setDetails({
          runtime: data.Runtime && data.Runtime !== 'N/A' ? data.Runtime : 'N/A',
          genre: data.Genre && data.Genre !== 'N/A' ? data.Genre : 'General',
          plot: data.Plot && data.Plot !== 'N/A' ? data.Plot : 'No description available.'
        });
        setFetched(true);
      }
    } catch (error) {
      console.error("Error fetching card details:", error);
    }
  };

  return (
    <div className="movie-card-track" onMouseEnter={handleMouseEnter}>
      <div className="universal-movie-card">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
          alt={movie.Title} 
          className="card-poster-img" 
        />

        <div className="card-hover-overlay">
          <div className="overlay-top-info">
            <h3 className="overlay-title">{movie.Title}</h3>
            <p className="overlay-year-time">{movie.Year} • {details.runtime || 'Loading...'}</p>
            <p className="overlay-genres">{details.genre || 'Fetching categories...'}</p>
            <p className="overlay-plot-full">{details.plot || 'Loading story synopsis...'}</p>
          </div>
          
          <button 
            className={isWatchlistPage ? "remove-from-watchlist" : "add-to-watchlist-btn"}
            onClick={(e) => {
              e.stopPropagation();
              
              // 🟢 THE FIX: If it is the Watchlist page, pass just the string ID.
              // If it is the home search grid, pass the whole movie object!
              if (isWatchlistPage) {
                onAddToWatchlist(movie.imdbID);
              } else {
                onAddToWatchlist(movie);
              }
            }}
          >
            {isWatchlistPage ? (
              <>
                <span className="minus-icon">-</span> Watchlist
              </>
            ) : (
              <>
                <span className="plus-icon">+</span> Watchlist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
