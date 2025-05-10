import React from "react";
import "./Hero.css"; // We'll create this CSS file next
import heroImage from "../../../assets/34.jpg"; // Adjust path as needed

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Authentic South Indian Catering</h1>
          <h2>Bringing Traditional Flavors to Your Special Occasions</h2>

          <div className="hero-buttons">
            <button className="primary-btn">View Our Menu</button>
            <button className="secondary-btn">Book Consultation</button>
          </div>

          <div className="selling-points">
            <div className="point">
              <span className="point-icon">🍛</span>
              <p>100+ Authentic Dishes</p>
            </div>
            <div className="point">
              <span className="point-icon">🏆</span>
              <p>Award-Winning Chefs</p>
            </div>
            <div className="point">
              <span className="point-icon">🚚</span>
              <p>Pan-City Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
