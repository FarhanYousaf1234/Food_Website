import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // CSS for styling and animations
import AdminNavbar from '../../../components/Adminnavbar/AdminNavbar';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Fetch menu items
    const fetchMenuItems = async () => {
        const token = sessionStorage.getItem('Admintoken');
        const response = await fetch('http://localhost:2000/api/menu', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log(data);  // Check what the API response looks like
        setMenuItems(data);
    };

    // Fetch registered users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        setUsers(response.data);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchMenuItems();
    fetchUsers();
  }, []);

  return (
    <>
        <AdminNavbar />

    <div className="admin-dashboard">
      {/* Dashboard Overview */}
      <div className="dashboard-overview">
        <div className="overview-item">
          <h3>Total Menu Items</h3>
          <p> {setMenuItems}</p>
        </div>
        <div className="overview-item">
          <h3>Total Registered Users</h3>
          <p>{totalUsers}</p>
        </div>
      </div>

      {/* Menu Items Section */}
      <div className="menu-section">
        <h2>Menu Items</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.availability ? 'Available' : 'Out of Stock'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Registered Users Section */}
      <div className="users-section">
        <h2>Registered Users</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <AdminFooter />
    </>
  );
};

export default AdminDashboard;
