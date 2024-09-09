import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './UserContext';  // Import UserContext
import ViewHistory from './components/ViewHistory'
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import PostpaidPlan from './components/postpaidPlan';
import PrepaidPlan from './components/PrepaidPlan';
import AdminDashboard from './components/AdminDashboard';
import AddPlans from './components/AddPlans';
import AddCustomer from './components/AddCustomer';
import Invoice from './components/Invoice';
import PaymentGateway from './components/Paymentgateway';
import LoggedInLoginPage from './components/LoggedInLoginpage';
import LoggedOutPage from './components/LoggedOut';

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useContext(UserContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/loggedinloginpage" />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/loggedinloginpage" />} />

      {/* Routes accessible to logged-in users */}
      <Route path="/postpaid" element={isAuthenticated ? <PostpaidPlan /> : <Navigate to="/login" />} />
      <Route path="/prepaid" element={isAuthenticated ? <PrepaidPlan /> : <Navigate to="/login" />} />
      <Route path="/invoice" element={isAuthenticated ? <Invoice /> : <Navigate to="/login" />} />
      <Route path="/payment-gateway" element={isAuthenticated ? <PaymentGateway /> : <Navigate to="/login" />} />
      <Route path="/loggedinloginpage" element={isAuthenticated ? <LoggedInLoginPage /> : <Navigate to="/login" />} />
      <Route path="/ViewHistory" element={isAuthenticated ? <ViewHistory /> : <Navigate to="/ViewHistory" />} />
      {/* Admin Routes */}
      <Route path="/admindashboard" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to={isAuthenticated ? "/loggedinloginpage" : "/login"} />} />
      <Route path="/addplans" element={isAuthenticated && isAdmin ? <AddPlans /> : <Navigate to={isAuthenticated ? "/loggedinloginpage" : "/login"} />} />
      <Route path="/addcustomer" element={isAuthenticated && isAdmin ? <AddCustomer /> : <Navigate to={isAuthenticated ? "/loggedinloginpage" : "/login"} />} />

      {/* Logout Route */}
      <Route path="/logout" element={<LoggedOutPage />} />
    </Routes>
  );
};

export default AppRoutes;
