// src/services/movieApi.js

// 👇 ADD THIS LINE HERE TO DEFINE THE KEY
const API_KEY = import.meta.env.VITE_MOVIE_API_KEY; 

const BASE_URL = 'https://omdbapi.com'; 

// 1. Used by SearchBar / MovieList to find matching films 
export async function fetchMoviesBySearch(query) { 
  try { 
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`); 
    if (!response.ok) { 
      throw new Error('Network response was not ok'); 
    } 
    const data = await response.json(); 
    return data.Search || []; 
  } catch (error) { 
    console.error("Failed to fetch movies:", error); 
    return []; 
  } 
} 

// 2. Used by Watchlist.jsx to look up saved IDs
export async function fetchMovieById(id) { 
  try { 
    const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`); 
    if (!res.ok) { 
      throw new Error('Network response was not ok'); 
    } 
    return await res.json(); 
  } catch (error) { 
    console.error("Failed to fetch movie details:", error); 
    return null; 
  } 
}
