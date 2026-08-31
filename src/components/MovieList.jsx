// src/components/MovieList.jsx
import MovieCard from './MovieCard'; // 🟢 Import the new shared card layout

export default function MovieList({ movies, onAddToWatchlist }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-movies">
        <p>No movies found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    /* Keep your existing ID wrapper for overall page structure alignment */
    <div id="movieListContainer" className="search-results-grid"> 
      {movies.map((movie) => (
        /* 🟢 Swap out the old div layout with the universal card */
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onAddToWatchlist={onAddToWatchlist} 
        />
      ))}
    </div>
  );
}

