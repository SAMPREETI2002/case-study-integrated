import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  };

  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    flex: '1 1 calc(33% - 20px)', // Responsive design
    boxSizing: 'border-box'
  };

  const headingStyle = {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '1.25em',
    color: '#333'
  };

  const paragraphStyle = {
    margin: '5px 0',
    color: '#555'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Plan Details</h2>
      {planDetails.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No plans found.</p>
      ) : (
        <ul style={listStyle}>
          {planDetails.map(plan => (
            <li key={plan.planId} style={listItemStyle}>
              <h3 style={headingStyle}>{plan.planName}</h3>
              <p style={paragraphStyle}>Description: {plan.description}</p>
              <p style={paragraphStyle}>Rate Per Unit: {plan.ratePerUnit}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewHistory;
