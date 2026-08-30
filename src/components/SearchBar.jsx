// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');

  const handleSearchSubmit = () => {
    if (text.trim() !== '') {
      onSearch(text); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        
        <input 
          id="search-bar" 
          type="text" 
          placeholder="Search for movies, genres, actors..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          onKeyDown={handleKeyDown} 
        />

        {/* 🌟 NESTED BUTTON RESTORED ON THE RIGHT */}
        <button id="search-btn" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}
