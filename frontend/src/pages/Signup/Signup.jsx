// src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the import path if necessary
import Footer from '../../components/Footer/Footer'; // Adjust the import path if necessary


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:2000/api/auth/signup', { name, email, password });
      if(res) {

        console.log(res.data);
        navigate('/login');
        }
    } catch (err) {
      setError('Error signing up. Try again.');
    }
  };

  return (
    <>
    <Navbar />
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to={'/login'}>Login </Link>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Signup;
