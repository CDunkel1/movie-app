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
  /* 🟢 THE UNIQUE ROOT WRAPPER: Avoid using .homepage-rows here! */
  <div className="search-view-layout-page">
    
    

    {/* 2. COMPLETELY ISOLATED INDEPENDENT SIBLING GRID LIST CONTAINER */}
    <div id="movieListContainer" className="search-results-grid">
      {movies.map((movie) => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onAddToWatchlist={onAddToWatchlist} 
        />
      ))}
    </div>

  </div>
);
}