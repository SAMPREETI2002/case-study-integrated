import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles/Landingpage.css'; // Import your CSS file
import About from './About';
import ImageSlider from './ImageSlider';
function LandingPage() {
  return (
    <div className="landing-container">
      <ImageSlider/>
      <main>
        <h1>Connecting Lives at Your Fingertips.</h1>
        <p>Get exclusive offers on the purchase of any plans</p>

        <h2>Featured Plans</h2>
        <div className="plans-container">
          <div className="plan">
            <h3>PREPAID</h3>
            <h4>Pay As You Go!</h4>
            <p>Ideal for: Students, light users, and anyone who prefers control over their expenses.</p>
            <div className="buttonplace">
              <Link to="/prepaid">
                <button className="plan-button">→</button>
              </Link>
            </div>
          </div>
          <div className="plan">
            <h3>POSTPAID</h3>
            <h4>Unlimited Convenience!</h4>
            <p>Ideal for: Professionals, families with uninterrupted services and bundled benefits.</p>
            <div className="buttonplace">
              <Link to="/postpaid">
                <button className="plan-button">→</button>
              </Link>
            </div>
          </div>
        </div>
        <About/>
      </main>
    </div>
  );
}

export default LandingPage;
