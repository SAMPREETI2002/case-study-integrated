import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { UserContext } from '../UserContext'; // Import UserContext
import './styles/Navbar1.css'; // Import the CSS file
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { userEmail, setUserEmail, setIsAuthenticated, setIsAdmin } = useContext(UserContext); // Access context setters
  const navigate = useNavigate(); // useNavigate for redirection

  const handleLogout = () => {
    // Clear the user context values
    setUserEmail('');
    setIsAuthenticated(false);
    setIsAdmin(false);

    // Redirect to the landing page
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Telstar Logo */}
        <div className="navbar-brand">Telstar</div>

        {/* Navbar Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/loggedinloginpage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoice">View Invoice</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ViewHistory">My Plans</Link>
            </li>
          </ul>

          {/* Profile and Logout */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle btn btn-link" type="button" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Profile</button>

              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><span className="dropdown-item">{userEmail}</span></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
