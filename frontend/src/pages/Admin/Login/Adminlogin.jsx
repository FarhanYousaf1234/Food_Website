import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminlogin.css'; // Import CSS for styling
import AdminNavbar from '../../../components/Adminnavbar/AdminNavbar';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:2000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Save token to sessionStorage instead of localStorage
        sessionStorage.setItem('Admintoken', data.token);
        // Redirect to the Admin Dashboard
        navigate('/admin/dashboard');
      } else {
        // Display error message
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Server error. Please try again later.');
    }
  };
  

  return (
    <>
      <AdminNavbar />
    <div className="admin-login-page">
      <div className="admin-login-container fade-in">
        <h2 className="admin-login-title">Admin Panel Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          {errorMessage && <p className="admin-error-message">{errorMessage}</p>}
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your admin email"
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    </div>
    <AdminFooter />
    </>
  );
};

export default AdminLogin;
