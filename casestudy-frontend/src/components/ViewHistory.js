import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './view-history.css'; // Import the CSS file

function ViewHistory() {
  const [customerEmail, setCustomerEmail] = useState('banthi@gmail.com'); // Replace with actual email or state
  const [plansList, setPlansList] = useState([]);
  const [planDetails, setPlanDetails] = useState([]);

  useEffect(() => {
    const fetchCustomerHistory = async () => {
      try {
        const response = await axios.post('http://localhost:9099/viewHistory', { customerMail: customerEmail });
        const { plansList } = response.data;
        console.log(plansList);
        setPlansList(plansList);

        // Fetch details for each plan
        const detailsPromises = plansList.map(plan => 
          axios.post('http://localhost:9099/viewPlan', { planId: plan.planId })
        );

        const detailsResponses = await Promise.all(detailsPromises);
        setPlanDetails(detailsResponses.map(res => res.data.plan));
      } catch (error) {
        console.error('Error fetching customer history or plan details:', error);
      }
    };

    fetchCustomerHistory();
  }, [customerEmail]);

  return (
    <div className="plan-container">
      <h2>Plan Details</h2>
      {planDetails.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No plans found.</p>
      ) : (
        <div className="plan-list">
          {planDetails.map(plan => (
            <div key={plan.planId} className="plan-item">
              <h3 className="plan-title">{plan.planName}</h3>
              <p className="plan-description">Description: {plan.description}</p>
              <p className="plan-description">Rate Per Unit: {plan.ratePerUnit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewHistory;
