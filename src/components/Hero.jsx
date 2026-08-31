// src/components/Hero.jsx
import headerBg from '../assets/header.jpg'; 
import heroCard from '../assets/heroCard.png';

export default function Hero() {
  return (
    /* The main wrapper that uses your background line texture */
    <div id="hero-section" style={{ '--bg-img': `url(${headerBg})` }}>
      
      {/* The Glassmorphism Content Card */}
      <div className="hero-content-card">
        
        {/* Left Side: Text Content */}
        <div className="hero-text-side">
          <h1>Find Your Film</h1>
          <p className="hero-subtitle">Discover your next favorite cinematic masterpiece.</p>
        </div>
        
        {/* Right Side: Featured Image */}
        <div className="hero-image-side">
          <img src={heroCard} alt="Featured Movie" className="hero-featured-img" />
        </div>

      </div>

    </div>
  );
}

