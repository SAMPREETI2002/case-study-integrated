import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
import './styles/PrepaidPlan.css'; // Import the CSS file

const PostpaidPlans = () => {
  const [postpaidPlans, setPostpaidPlans] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostpaidPlans = async () => {
      try {
        const response = await axios.get('http://localhost:9099/postpaidPlans'); // Adjust URL if needed
        setPostpaidPlans(response.data.postpaidPlans);
      } catch (error) {
        setError('Error fetching postpaid plans');
      }
    };

    fetchPostpaidPlans();
  }, []);

  const handleBuyPlan = (planId) => {
    // Navigate to Checkout page with selected planId and planType
    navigate('/checkout', { state: { planId, planType: 'POSTPAID' } });
  };

  return (
    <div className="container">
      <main>
        <h1>Postpaid Plans</h1>
        <p>Select a plan that suits you best.</p>

        <div className="plans-container">
          {error && <p className="error-message">{error}</p>}
          {postpaidPlans.length > 0 ? (
            postpaidPlans.map((plan) => (
              <div className="plan" key={plan.id}>
                <h3 className="plan-name">{plan.planName}</h3>
                <p>{plan.planDescription}</p>
                <p>Billing period: {plan.billingCycle} days</p>

                <div className="buttonplace">
                  <button onClick={() => handleBuyPlan(plan.planId)} className="buy-button">Buy Plan</button>
                </div>
              </div>
            ))
          ) : (
            <p>No postpaid plans available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostpaidPlans;