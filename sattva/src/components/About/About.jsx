import React from 'react';
import './About.css';
import aboutImage from '../../../assets/about-team.jpg'; // Use a high-quality team/food image
// import signature from '../../../assets/arun.jpg'; // Optional signature image

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">Our Culinary Journey</h2>
          <div className="about-grid">
            <div className="about-text">
              <h3>Welcome to <span>Sattva</span> Food Catering</h3>
              <p className="lead-text">
                Established in 2010, we bring over a decade of expertise in authentic South Indian cuisine to the heart of your special events.
              </p>
              <p>
                Our culinary team, led by award-winning Chef Arvind Kumar, meticulously prepares each dish using time-honored recipes passed down through generations, combined with the freshest locally-sourced ingredients.
              </p>
              <div className="mission-statement">
                <h4>Our Mission</h4>
                <p>
                  "To transform traditional South Indian flavors into memorable dining experiences that celebrate both heritage and innovation."
                </p> <br />
                <p>
                  "To transform traditional South Indian flavors into memorable dining experiences that celebrate both heritage and innovation."
                </p> <br />
                <p>
                  "To transform traditional South Indian flavors into memorable dining experiences that celebrate both heritage and innovation."
                </p>
              
              </div>
            </div>
            <div className="about-image">
              <img src={aboutImage} alt="Sattva Culinary Team" />
              <div className="experience-badge">
                <span>15+</span>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>
          
          <div className="service-highlights">
            <div className="highlight-card">
              <h4>Wedding Catering</h4>
              <p>Customized menus for 50-5000 guests with traditional banana leaf service option</p>
            </div>
            <div className="highlight-card">
              <h4>Corporate Events</h4>
              <p>Hygienic buffet setups with live counters and branded service</p>
            </div>
            <div className="highlight-card">
              <h4>Private Dining</h4>
              <p>Intimate gatherings with personalized chef-attended experiences</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;