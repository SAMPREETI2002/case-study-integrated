import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Hook for navigation
// import { UserContext } from '../UserContext'; // Fetch email from context
import './styles/PrepaidPlan.css'; // Import the CSS file

const PostpaidPlans = () => {
  const [postpaidPlans, setPostpaidPlans] = useState([]);
  const [error, setError] = useState(null);
  // const { userEmail } = useContext(UserContext); // Fetch the email from context
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

  const handleBuyPlan = (planDetails) => {
    // Navigate to Invoice page with selected plan details
    navigate('/invoice', { state: { planDetails } });
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
                <h4 className="plan-description">{plan.planDescription}</h4>
                <p>Billing period: { plan.billingCycle}</p>
                <div className="buttonplace">
                  <button onClick={() => handleBuyPlan(plan)} className="buy-button">Buy Plan</button>
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
