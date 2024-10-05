import React from 'react';
import './AdminFooter.css'; // Import the CSS file for styling

const AdminFooter = () => {
  return (
    <footer className="admin-footer fade-in">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/admin/dashboard">Dashboard</a></li>
          <li><a href="/admin/manage-menu">Manage Menu</a></li>
          <li><a href="/admin/help">Help</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default AdminFooter;
