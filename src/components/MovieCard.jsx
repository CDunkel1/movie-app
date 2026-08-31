// src/components/MovieCard.jsx
import { useState } from 'react';

export default function MovieCard({ movie, onAddToWatchlist }) {
  // 🟢 FIXED: Added 'plot' initialization to state so React can track it instantly
  const [details, setDetails] = useState({ runtime: '', genre: '', plot: '' });
  const [fetched, setFetched] = useState(false);

  const handleMouseEnter = async () => {
    if (fetched) return; // Prevent duplicate API calls
    
    try {
      const BASE_URL = 'https://omdbapi.com'; // Best practice: add trailing slash
      const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
      
      // Fetching with &plot=full to secure the complete storyline paragraph block
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
    /* Outer structural layout track stays locked in place */
    <div className="movie-card-track" onMouseEnter={handleMouseEnter}>
      
      <div className="universal-movie-card">
        {/* Base Poster View */}
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
          alt={movie.Title} 
          className="card-poster-img" 
        />

        {/* 🟢 Expandable Overlaid Glass Container (Controlled strictly by CSS opacity on hover) */}
        <div className="card-hover-overlay">
          <div className="overlay-top-info">
            <h3 className="overlay-title">{movie.Title}</h3>
            
            <p className="overlay-year-time">
              {movie.Year} • {details.runtime || 'Loading...'}
            </p>
            
            <p className="overlay-genres">
              {details.genre || 'Fetching categories...'}
            </p>
            
            {/* 🟢 Uncapped text block for full description length rendering */}
            <p className="overlay-plot-full">
              {details.plot || 'Loading story synopsis...'}
            </p>
          </div>
          
          <button 
            className="add-to-watchlist-btn" 
            onClick={(e) => {
              e.stopPropagation(); // Stops click event bubbling to main layout links
              onAddToWatchlist(movie);
            }}
          >
            + Watchlist
          </button>
        </div>
      </div>

    </div>
  );
}
