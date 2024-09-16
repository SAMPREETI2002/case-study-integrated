import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceDisplay.css'; // Import the CSS file

function InvoiceDisplay() {
  const [invoice, setInvoice] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    const fetchInvoiceAndPlan = async () => {
      try {
        const response = await axios.post('http://localhost:9099/generateInvoice', { customerMail: 'banthi@gmail.com' });
        const { invoice } = response.data;
        
        const planResponse = await axios.post('http://localhost:9099/viewPlan', { planId: invoice.planId });
        setInvoice(invoice);
        setPlanDetails(planResponse.data.plan);
      } catch (error) {
        console.error('Error fetching invoice or plan details:', error);
      }
    };

    fetchInvoiceAndPlan();
  }, []);

  return (
    <div className="invoice-container">
      {invoice && planDetails ? (
        <div className="invoice-box">
          <div className="customer-details">
            <h2 className="heading">Customer Details</h2>
            <p style={{ color: '#fff', margin: 0 }}>
              <strong>Name:</strong> {invoice.customerName}
            </p>
            <p style={{ color: '#fff', margin: 0 }}>
              <strong>ID:</strong> {invoice.customerId}
            </p>
          </div>
          <h2 className="heading">Invoice Details</h2>
          <div className="detail-container">
            <div className="detail-label">Invoice ID:</div>
            <div className="detail-value">{invoice.invoiceId}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Plan ID:</div>
            <div className="detail-value">{invoice.planId}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Units:</div>
            <div className="detail-value">{invoice.units}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Date:</div>
            <div className="detail-value">{new Date(invoice.date).toLocaleDateString()}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Amount:</div>
            <div className="detail-value">${invoice.amount.toFixed(2)}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Plan Type:</div>
            <div className="detail-value">{invoice.planType}</div>
          </div>
          <h3 className="heading">Plan Details</h3>
          <div className="detail-container">
            <div className="detail-label">Plan Name:</div>
            <div className="detail-value">{planDetails.planName}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Description:</div>
            <div className="detail-value">{planDetails.description}</div>
          </div>
          <div className="detail-container">
            <div className="detail-label">Rate Per Unit:</div>
            <div className="detail-value">{planDetails.ratePerUnit}</div>
          </div>
        </div>
      ) : (
        <p>Loading invoice and plan details...</p>
      )}
    </div>
  );
}

export default InvoiceDisplay;
