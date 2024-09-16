import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminpage.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext'; // Import the UserContext

function AdminDashboard() {
  const { isAdmin, isAuthenticated } = useContext(UserContext); // Access admin status and authentication status
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is an admin, redirect or display an error if not
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/error'); // Redirect to an error page if the user is not an admin
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="container">
      <main>
        <h1>Admin Dashboard</h1>
        {isAdmin ? (
          <>
            <p>Welcome, Admin!</p>
            <div className="admin-actions">
              <button className="admin-button">
                <Link to="/addplans">Add Plans</Link>
              </button>
              <button className="admin-button">
                <Link to="/addcustomer">Add Customer</Link>
              </button>
            </div>
          </>
        ) : (
          <p>Access Denied. You do not have the required permissions.</p>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
