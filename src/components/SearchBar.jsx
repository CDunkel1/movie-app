// src/components/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState('');

  const handleSearchClick = () => {
    if (text.trim() !== '') {
      onSearch(text); // 👈 Passes the text up to App.jsx
    }
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search for a movie..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} // 👈 Tracks what you type
      />
      {/* 👇 Fires the function when clicked */}
      <button id="search-btn" onClick={handleSearchClick}>Search</button>
    </div>
  );
}
