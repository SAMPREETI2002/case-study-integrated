import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvoiceDisplay() {
  const [invoice, setInvoice] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const fetchInvoiceAndPlan = async () => {
      try {
        // Replace with the correct customer email
        const response = await axios.post('http://localhost:9099/generateInvoice', { customerMail: 'banthi@gmail.com' });
        const { invoice } = response.data;
        
        // Fetch plan details using the planId from the invoice
        const planResponse = await axios.post('http://localhost:9099/viewPlan', { planId: invoice.planId });
        setInvoice(invoice);
        setPlanDetails(planResponse.data.plan);
      } catch (error) {
        console.error('Error fetching invoice or plan details:', error);
      }
    };

    fetchInvoiceAndPlan();
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const invoiceBoxStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    width: '400px',
    margin: '10px',
    textAlign: 'center'
  };

  const headingStyle = {
    marginTop: 0,
    marginBottom: '10px',
    fontSize: '1.5em',
    color: '#333'
  };

  const detailStyle = {
    margin: '5px 0',
    color: '#555'
  };

  return (
    <div style={containerStyle}>
      {invoice && planDetails ? (
        <div style={invoiceBoxStyle}>
          <h2 style={headingStyle}>Invoice Details</h2>
          <p style={detailStyle}><strong>Invoice ID:</strong> {invoice.invoiceId}</p>
          <p style={detailStyle}><strong>Customer Name:</strong> {invoice.customerName}</p>
          <p style={detailStyle}><strong>Customer ID:</strong> {invoice.customerId}</p>
          <p style={detailStyle}><strong>Plan ID:</strong> {invoice.planId}</p>
          <p style={detailStyle}><strong>Units:</strong> {invoice.units}</p>
          <p style={detailStyle}><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
          <p style={detailStyle}><strong>Amount:</strong> ${invoice.amount.toFixed(2)}</p>
          <p style={detailStyle}><strong>Plan Type:</strong> {invoice.planType}</p>
          <h3 style={headingStyle}>Plan Details</h3>
          <p style={detailStyle}><strong>Plan Name:</strong> {planDetails.planName}</p>
          <p style={detailStyle}><strong>Description:</strong> {planDetails.description}</p>
          <p style={detailStyle}><strong>Rate Per Unit:</strong> {planDetails.ratePerUnit}</p>
          {/* Add more plan details as needed */}
        </div>
      ) : (
        <p>Loading invoice and plan details...</p>
      )}
    </div>
  );
}

export default InvoiceDisplay;
