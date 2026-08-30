// src/components/Hero.jsx
import headerBg from '../assets/header.jpg'; // 👈 Make sure this file name is exactly 'header.png'

export default function Hero() {
  return (
    /* 🟢 Crucial: Sets the --bg-img variable that your CSS file is looking for */
    <div id="hero-section" style={{ '--bg-img': `url(${headerBg})` }}>
      <div className="hero-card">
        <h1>Find Your Film</h1>
        <p className="hero-subtitle">Discover your next favorite cinematic masterpiece.</p>
      </div>
    </div>
  );
}
