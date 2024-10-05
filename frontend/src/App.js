// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import BrowseMenuPage from './pages/BrowseMenu/BrowseMenu';
import OrderPage from './pages/Order/OrderPage';
// import OrderTracking from './pages/OrderTracking/OrderTracking';

import AdminLogin from './pages/Admin/Login/Adminlogin';
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard';
import Adminmanagemenu from './pages/Admin/managemenu/ManageMenu';

function App() {
  return (
    <Router>
      

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<BrowseMenuPage />} />
        <Route path="/orders" element={<OrderPage />} />
        {/* <Route path="/order-tracking" element={<OrderTracking />} /> */}

        {/* Admin Routes */}


        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/manage-menu' element={<Adminmanagemenu />} />

       
      </Routes>
      
      
    </Router>



  );
}

export default App;
