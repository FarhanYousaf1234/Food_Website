// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { FaHome, FaUtensils, FaConciergeBell, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [name, setname] = useState(null);
  const navigate= useNavigate();

  useEffect(() => {
    // Check if the user is logged in by looking for the name in localStorage
    const storedname = localStorage.getItem('name');
    if (storedname) {
      setname(storedname);
      
    }
  }, []);


  const handleLogout = () => {
    // Remove the name from localStorage to log out the user
    localStorage.removeItem('name');
    localStorage.removeItem('token');

    setname(null);
    navigate('/login');

  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Foodie</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to={'/'}>
            <FaHome className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to={'/menu'}>
            <FaUtensils className="icon" /> Menu
          </Link>
        </li>
        <li>
          <Link to={'/orders'}>
            <FaConciergeBell className="icon" /> Orders
          </Link>
        </li>

        {/* Conditionally render the login or name */}
        {name ? (
          <>
            <li className="navbar-name">
              Hello, {name}
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt className="icon" /> Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to={'/login'}>
              <FaSignInAlt className="icon" /> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
