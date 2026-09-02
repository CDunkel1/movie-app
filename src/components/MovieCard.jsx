// src/components/MovieCard.jsx
import { useState } from 'react';
import MovieModal from './MovieModal'; // 🟢 Import your premium new modal

export default function MovieCard({ movie, onAddToWatchlist, isWatchlistPage }) {
  const [details, setDetails] = useState({ runtime: '', genre: '', plot: '' });
  const [fetched, setFetched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 🟢 Track modal trigger state

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

  const fullPlot = details.plot || movie.Plot || 'Loading story synopsis...';
  const shouldTruncate = fullPlot.length > 340;
  
  // 🟢 HOVER CARD ALWAYS STAYS SHORT: Strict layout cap formatting
  const displayedPlot = shouldTruncate ? fullPlot.substring(0, 340) + "..." : fullPlot;

  return (
    <>
      <div 
        className="movie-card-track" 
        onMouseEnter={handleMouseEnter}
        /* 🟢 Open the cinematic full screen modal on whole track element clicks */
        onClick={() => setIsModalOpen(true)} 
        style={{ cursor: 'pointer' }}
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
              <p className="overlay-genres">{details.genre || movie.Genre || 'Loading categories...'}</p>
              
              <p className="overlay-plot-full">
                {displayedPlot}
                {shouldTruncate && <span className="modal-more-hint-link"> More Details</span>}
              </p>
            </div>
            
            <button 
              className={isWatchlistPage ? "remove-from-watchlist" : "add-to-watchlist-btn"}
              onClick={(e) => {
                e.stopPropagation(); // 🟢 Stops button click from accidentally popping open the modal!
                if (isWatchlistPage) {
                  onAddToWatchlist(movie.imdbID);
                } else {
                  onAddToWatchlist(movie);
                }
              }}
            >
              {isWatchlistPage ? <><span className="minus-icon">-</span> Watchlist</> : <><span className="plus-icon">+</span> Add to Watchlist</>}
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 MOUNT CINEMATIC POPUP OVERLAY */}
      {isModalOpen && (
        <MovieModal 
          movie={movie} 
          details={details} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}
