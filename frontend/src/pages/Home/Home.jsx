// src/pages/Home.js
import React from 'react';
import './Home.css';
import { FaPizzaSlice, FaHamburger, FaIceCream, FaLeaf } from 'react-icons/fa';
import { FaMobileAlt, FaUtensils, FaTruck, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'; // Adjust the import path if necessary
import Footer from '../../components/Footer/Footer'; // Adjust the import path if necessary


const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Delicious Food Delivered Fast</h1>
          <p>Browse your favorite meals and get them delivered right to your doorstep!</p>
          <button className="cta-button" onClick={() => navigate('/orders')}>
            Order Now
          </button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="popular-categories">
        <h2>Popular Categories</h2>
        <div className="category-list">
          <div className="category-item">
            <FaPizzaSlice className="category-icon" />
            <p>Pizza</p>
          </div>
          <div className="category-item">
            <FaHamburger className="category-icon" />
            <p>Burgers</p>
          </div>
          <div className="category-item">
            <FaIceCream className="category-icon" />
            <p>Desserts</p>
          </div>
          <div className="category-item">
            <FaLeaf className="category-icon" />
            <p>Vegetarian</p>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured-restaurants">
        <h2>Featured Restaurants</h2>
        <div className="restaurant-list">
          <div className="restaurant-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/006/395/400/small/italian-food-or-italian-restaurant-logo-template-with-italian-flag-shape-and-tableware-free-vector.jpg" alt="Restaurant 1" />
            <h3>Italiano's Delight</h3>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
          <div className="restaurant-card">
            <img src="https://www.shutterstock.com/image-vector/burger-logo-design-fast-food-600nw-1205552680.jpg" alt="Restaurant 2" />
            <h3>Burger Town</h3>
            <p>⭐⭐⭐⭐</p>
          </div>
          <div className="restaurant-card">
            <img src="https://www.shutterstock.com/image-vector/sushi-world-logo-design-template-260nw-2509547747.jpg" alt="Restaurant 3" />
            <h3>Sushi World</h3>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="promotions">
        <h2>Latest Offers</h2>
        <div className="promotions-list">
          <div className="promotion-item">
            <img src="/Images/promo1.jpg" alt="Promo 1" style={{width:"300px"}} />
            <p>20% off on your first order!</p>
          </div>
          <div className="promotion-item">
            <img src="/Images/promo2.jpg" alt="Promo 2" style={{width:"300px"}} />
            <p>Free delivery for orders above $30!</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-list">
          <div className="step-item">
            <FaUtensils className="step-icon" />
            <p>1. Browse Menu</p>
          </div>
          <div className="step-item">
            <FaTruck className="step-icon" />
            <p>2. Place an Order</p>
          </div>
          <div className="step-item">
            <FaMobileAlt className="step-icon" />
            <p>3. Track Your Delivery</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <FaHeart className="testimonial-icon" />
            <p>"Amazing food and quick delivery! Highly recommended!"</p>
            <p>- John Doe</p>
          </div>
          <div className="testimonial-item">
            <FaHeart className="testimonial-icon" />
            <p>"I love the variety of options available. Always fresh and tasty!"</p>
            <p>- Sarah Lee</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default Home;
