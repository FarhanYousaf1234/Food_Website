import React, { useEffect, useState } from 'react';
import './BrowseMenu.css'; // CSS for styling
import { FaSearch } from 'react-icons/fa'; // Import a search icon for the search bar
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const BrowseMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Fetch all menu items when component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await fetch('http://localhost:2000/api/menu', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            
          },
        });

        if (!response.ok) {
            console.log(response.data);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMenuItems(data);
        setFilteredItems(data); // Initially set filtered items to all items
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2000/api/menu/search?query=${searchQuery}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFilteredItems(data); // Set filtered items to the search result
    } catch (error) {
      console.error('Error searching menu items:', error);
    }
  };

  // Render each menu item with category and availability
  const renderMenuItems = () => {
    if (filteredItems.length === 0) {
      return <p>No menu items found.</p>; // Show this if no items are found
    }

    return filteredItems.map((item) => (
      <div key={item._id} className="menu-item">
        <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
        <div className="menu-item-details">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Category: {item.category}</p>
          <p>Price: ${item.price.toFixed(2)}</p>
          <p>Availability: {item.availability ? "In Stock" : "Out of Stock"}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
    <Navbar />

    <div className="browse-menu">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a menu item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit"><FaSearch /></button>
        </form>
      </div>

      <div className="menu-items-container">
        {renderMenuItems()}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default BrowseMenu;
