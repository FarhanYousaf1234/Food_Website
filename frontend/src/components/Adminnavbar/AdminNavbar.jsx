import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS file for styling
import { FaSignOutAlt } from 'react-icons/fa'; // Import some icons for better visuals

const AdminNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Function to check login status and retrieve admin name
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem('Admintoken'); // Retrieve token from session storage
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
    
  };

  // Check login status on mount and on every re-render
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('Admintoken'); // Remove token from session storage on logout
    setIsLoggedIn(false);
    navigate('/admin/login'); // Redirect to login page
  };

  return (
    <nav className="admin-navbar slide-in">
      <div className="navbar-logo">
        <h1>Admin Panel</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/manage-menu">Manage Menu</Link>
        </li>
        <li>
          <Link to="/admin/manage-users">Manage Users</Link>
        </li>
        <li>
          <Link to="/admin/settings">Settings</Link>
        </li>
      </ul>

      <div className="navbar-auth">
        {/* Conditionally render Login or Welcome Admin based on login status */}
        {isLoggedIn ? (
          <div className="navbar-logout">
            <span>Welcome, Admin</span> {/* Display admin name */}
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </div>
        ) : (
          <div className="navbar-login">
            <Link to="/admin/login" className="login-btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
