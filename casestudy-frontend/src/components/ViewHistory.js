import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/view-history.css'; // Import the CSS file

function ViewHistory() {
  const [customerEmail, setCustomerEmail] = useState('banthi@gmail.com'); // Replace with actual email or state
  const [plansList, setPlansList] = useState([]);
  const [planDetails, setPlanDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      try {
        const response = await axios.post('http://localhost:9099/viewHistory', { customerMail: customerEmail });
        const { plansList } = response.data;
        console.log('Plans List:', plansList); // Debug log for plansList
        setPlansList(plansList);

        if (plansList.length > 0) {
          // Fetch details for each plan
          const detailsPromises = plansList.map(plan =>
            axios.post('http://localhost:9099/viewPlan', { planId: plan.planId })
          );

          const detailsResponses = await Promise.all(detailsPromises);
          const plansData = detailsResponses.map(res => res.data.plan);
          console.log('Plan Details:', plansData); // Debug log for planDetails
          setPlanDetails(plansData);
        }

        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching customer history or plan details:', error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchCustomerHistory();
  }, [customerEmail]);

  console.log('Rendering planDetails:', planDetails); // Final check to see if planDetails is set correctly

  return (
    <div className="plan-container">
      <h2>Plan Details</h2>
      {loading ? (
        <p>Loading plans...</p>
      ) : planDetails.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No plans found.</p>
      ) : (
        <div className="plan-list">
          {planDetails.map((plan, index) => (
            <div key={index} className="plan-item">
              <h3 className="plan-title">{plan.planName}</h3>
              <p className="planDescription">{plan.description}</p>
              <br/>
              <p className="planDescription">Rate Per Unit: {plan.ratePerUnit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewHistory;
