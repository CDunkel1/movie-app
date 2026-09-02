// src/components/MovieModal.jsx
import { useEffect } from 'react';

export default function MovieModal({ movie, details, onClose }) {
  // Prevent background scrolling while the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="premium-movie-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button Button */}
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-grid-layout">
          {/* Left Side: High-res Poster Backdrop */}
          <div className="modal-left-poster">
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
              alt={movie.Title} 
            />
          </div>
          
          {/* Right Side: Uncapped Clean Typography Area */}
          <div className="modal-right-content">
            <h2 className="modal-movie-title">{movie.Title}</h2>
            <div className="modal-metadata-row">
              <span className="modal-year-pill">{movie.Year}</span>
              <span className="modal-runtime-pill">{details.runtime || movie.Runtime || 'N/A'}</span>
            </div>
            
            <p className="modal-genres-text"><strong>Genre:</strong> {details.genre || movie.Genre || 'N/A'}</p>
            
            <div className="modal-plot-scroll-box">
              <h3>Synopsis</h3>
              <p>{details.plot || movie.Plot || 'No synopsis available.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
