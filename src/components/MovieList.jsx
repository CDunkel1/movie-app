// src/components/MovieList.jsx

// 👇 1. Add "onAddToWatchlist" to your destructured props
export default function MovieList({ movies, onAddToWatchlist }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-movies">
        <p>No movies found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div id="movieListContainer">
      {movies.map((movie) => (
        <div className="movie" key={movie.imdbID}>
          <img 
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
            alt={movie.Title} 
          />
          
          <div className="movie-info">
            <h3>
              {movie.Title} <span className="year">({movie.Year})</span>
            </h3>
            
            {/* 👇 2. Add the onClick handler to execute the function with this specific movie */}
            <button 
              className="add-to-watchlist-btn" 
              onClick={() => onAddToWatchlist(movie)}
            >
              <span className="plus-icon">+</span> Add to Watchlist
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
