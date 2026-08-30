// src/components/Navbar.jsx
import headerBg from '../assets/header.jpg'; // 👈 1. Let Vite process the asset file name

export default function Navbar({ onToggleView, showWatchlist }) {
  return (
    /* Pass the image path as a custom CSS variable (--bg-img) */
    <div id="header" style={{ '--bg-img': `url(${headerBg})` }}>
        <div className="header-card"><h1>Find Your Film</h1>
        <button id="watchlist-btn" onClick={onToggleView}>
          {showWatchlist ? "Search Movies" : "My Watchlist"}
        </button>
      </div>
    </div>
  );
}


