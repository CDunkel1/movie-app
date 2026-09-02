// src/components/MovieCard.jsx
import { useState } from 'react';

export default function MovieCard({ movie, onAddToWatchlist, isWatchlistPage }) {
  const [details, setDetails] = useState({ runtime: '', genre: '', plot: '' });
  const [fetched, setFetched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // 🟢 Track if text is collapsed or expanded

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

  // 🟢 THE TEXT TRUNCATE ENGINE
  const fullPlot = details.plot || movie.Plot || 'Loading story synopsis...';
  const shouldTruncate = fullPlot.length > 440;
  
  // Truncates at 140 characters and attaches "..." if it's too long and not expanded
  const displayedPlot = (shouldTruncate && !isExpanded) 
    ? fullPlot.substring(0, 440) + "..." 
    : fullPlot;

  return (
    <div 
      className="movie-card-track" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsExpanded(false)} // 🟢 Automatically collapses the text when mouse leaves the card
    >
      <div className="universal-movie-card">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
          alt={movie.Title} 
          className="card-poster-img" 
        />

        <div className="card-hover-overlay">
          <div className="overlay-top-info">
            <h3 className="overlay-title">{movie.Title}</h3>
            <p className="overlay-year-time">{movie.Year} • {details.runtime || movie.Runtime || 'Loading...'}</p>
            <p className="overlay-genres">{details.genre || movie.Genre || 'Fetching categories...'}</p>
            
            {/* 🟢 DYNAMIC PLOT FIELD */}
            <p className="overlay-plot-full">
              {displayedPlot}
              
              {/* Render the toggle link text inline only if the character threshold is breached */}
              {shouldTruncate && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Stops click from triggering lower structural events
                    setIsExpanded(!isExpanded);
                  }}
                  className="read-more-toggle-btn"
                >
                  {isExpanded ? ' Show Less' : ' Read More'}
                </button>
              )}
            </p>
          </div>
          
          <button 
            className={isWatchlistPage ? "remove-from-watchlist" : "add-to-watchlist-btn"}
            onClick={(e) => {
              e.stopPropagation();
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
                <span className="plus-icon">+</span> Add to Watchlist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
