// src/components/Navbar.jsx

export default function Navbar({ onToggleView, showWatchlist }) {
  return (
    <nav className="global-navbar">
      {/* 1. Left Section: Neon Branding Logo */}
      <div className="nav-logo" onClick={() => showWatchlist && onToggleView()}>
        <span className="logo-icon">🎬</span>
        {/* 🟢 CHANGED: Changed class name to match lime theme naming */}
        <span className="logo-text">Reel<span className="lime-text">Rush</span></span>
      </div>

      {/* 2. Center Section: Navigation Page Selectors */}
      <ul className="nav-links">
        <li className={!showWatchlist ? "active-link" : ""} onClick={() => showWatchlist && onToggleView()}>
          Home
        </li>
        <li onClick={() => alert("Movies library coming soon!")}>Movies</li>
        <li onClick={() => alert("Genres portal coming soon!")}>Genres</li>
        <li className={showWatchlist ? "active-link" : ""} onClick={() => !showWatchlist && onToggleView()}>
          Watchlist
        </li>
      </ul>

      {/* 3. Right Section: Premium Account Profile Avatar Circle */}
      <div className="nav-profile" onClick={() => alert("Account options coming soon!")}>
        <div className="avatar-circle">
          <span className="user-icon">👤</span>
        </div>
        <span className="chevron-icon">⌃</span>
      </div>
    </nav>
  );
}



