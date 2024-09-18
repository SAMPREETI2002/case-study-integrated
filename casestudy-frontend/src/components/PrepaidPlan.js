import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
// import { UserContext } from '../UserContext'; // Fetch email from context
import './styles/PrepaidPlan.css'; // Import the CSS file

const PrepaidPlans = () => {
  const [prepaidPlans, setPrepaidPlans] = useState([]);
  const [error, setError] = useState(null);
  // const { userEmail } = useContext(UserContext); // Fetch the email from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrepaidPlans = async () => {
      try {
        const response = await axios.get('http://localhost:9099/prepaidPlans'); // Adjust URL if needed
        setPrepaidPlans(response.data.prepaidPlans);
      } catch (error) {
        setError('Error fetching prepaid plans');
      }
    };

    fetchPrepaidPlans();
  }, []);

  const handleBuyPlan = (planId) => {
    // Navigate to Payment page with the selected plan ID
    navigate('/payment-gateway', { state: { planId } });
  };

  return (
    <div className ="main-content">
    <div className="container">
      <main>
        <h1>Prepaid Plans</h1>
        <p>Select a plan that suits you best.</p>

        <div className="plans-container">
          {error && <p className="error-message">{error}</p>}
          {prepaidPlans.length > 0 ? (
            prepaidPlans.map((plan) => (
              <div className="plan" key={plan.id}>
                <h3 className="plan-name">{plan.planName}</h3>
                <h4 className="plan-description">{plan.planDescription}</h4>
                <p>Price: ${plan.prepaidBalance}</p>
                <div className="buttonplace">
                  <button 
                    onClick={() => handleBuyPlan(plan.id)} 
                    className="buy-button"
                  >
                    Buy Plan
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No prepaid plans available.</p>
          )}
        </div>
      </main>
    </div>
    </div>
  );
};

export default PrepaidPlans;
