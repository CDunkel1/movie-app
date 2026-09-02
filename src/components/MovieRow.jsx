// src/components/MovieRow.jsx
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // 🟢 Fully utilized now!

export default function MovieRow({ title, fetchQuery, onAddToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRowMovies = async () => {
      try {
        const BASE_URL = 'https://omdbapi.com';
        const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${fetchQuery}&type=movie`);
        const data = await response.json();
        
        if (data.Search) {
          // 🟢 Keeps exactly 5 cards visible across the screen layout natively
          setMovies(data.Search.slice(0, 8)); 
        }
      } catch (error) {
        console.error(`Failed rows for ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchRowMovies();
  }, [fetchQuery, title]);

  if (loading) return <div className="row-loading">Loading...</div>;

  return (
    <div className="movie-row-container">
      <h2 className="row-title">{title}</h2>
      
      {/* 🟢 The horizontal scrolling runner lane */}
      <div className="movie-row-scrollbar">
        {movies.map((movie) => (
          /* 🟢 Render the universal shared component file cleanly */
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            onAddToWatchlist={onAddToWatchlist} 
            isWatchlistPage={false} /* Tells the card it is on the landing page row views */
          />
        ))}
      </div>
    </div>
  );
}
