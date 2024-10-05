// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the import path if necessary
import Footer from '../../components/Footer/Footer'; // Adjust the import path if necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:2000/api/auth/login', { email, password });
      const { name } = res.data;  // Assuming backend sends the name
      // Store name in localStorage
      localStorage.setItem('name', name);
      const token = res.data.token; // Assuming your backend sends the token
    localStorage.setItem('token', token); // Store the token in localStorage
      // Redirect to the home page or any other page
      navigate('/');
      window.location.reload();


    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <>
    <Navbar />


    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? < Link to ={'/signup'}>Sign Up</Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Login;
