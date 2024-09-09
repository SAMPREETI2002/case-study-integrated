import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';  // Import the routing component
import { UserProvider, UserContext } from './UserContext'; // Import the context provider
import Navbar from './components/Navbar'; // Unauthenticated Navbar
import Navbar1 from './components/Navbar1'; // Authenticated Navbar

const App = () => {
  return (
    <UserProvider> {/* Wrap the app with UserProvider */}
      <Router>
        <MainApp /> {/* Separate main app component to use context */}
      </Router>
    </UserProvider>
  );
};

const MainApp = () => {
  const { isAuthenticated } = useContext(UserContext); // Get authentication status from UserContext

  return (
    <>
      {isAuthenticated ? <Navbar1 /> : <Navbar />} {/* Conditionally render Navbar based on authentication */}
      <AppRoutes /> {/* The rest of your application routes */}
    </>
  );
};

export default App;
