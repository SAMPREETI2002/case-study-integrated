// src/pages/LoggedInLandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Landingpage.css'; // Import your CSS file
import PlanStatus from './PlanStatus';
function LoggedInLandingPage() {
  return (
    <div className="landing-container">
      <main>
        <h1>Welcome Back!</h1>
        {/* <p>Continue exploring our exclusive offers and plans.</p> */}
        <PlanStatus/>
        <h2>Featured Plans</h2>
        <div className="plans-container">
          <div className="plan">
            <h3>PREPAID</h3>
            <h4>Pay As You Go!</h4>
            <p>Ideal for: Students, light users, and anyone who prefers control over their expenses.</p>
            <div className='buttonplace'>
              {/* Navigating to prepaid plans */}
              <Link to="/prepaid">
                <button>→</button>
              </Link>
            </div>
          </div>
          <div className="plan">
            <h3>POSTPAID</h3>
            <h4>Unlimited Convenience!</h4>
            <p>Ideal for: Professionals, families, and heavy users who want uninterrupted services and bundled benefits.</p>
            <div className="buttonplace">
              {/* Navigating to postpaid plans */}
              <Link to="/postpaid">
                <button>→</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoggedInLandingPage;
