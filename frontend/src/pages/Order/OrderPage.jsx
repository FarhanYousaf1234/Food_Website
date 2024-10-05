import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderPage.css'; // Add high-quality animations and styling
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon for UI
import StripeCheckout from 'react-stripe-checkout'; // React Stripe Checkout for payment
import { toast, ToastContainer } from 'react-toastify'; // Notification for success/failure feedback
import 'react-toastify/dist/ReactToastify.css'; // Styles for toast
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const OrderPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch menu items when component mounts
    useEffect(() => {
        const fetchMenuItems = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('http://localhost:2000/api/menu', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const data = await response.json();
                console.log(data); 
                setMenuItems(data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
                toast.error('Failed to load menu items', { position: 'top-center' });
            }
        };

        fetchMenuItems();
    }, []);

    // Handle adding items to cart
    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.menuItem._id === item._id);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.menuItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, { menuItem: item, quantity: 1 }]);
        }
        setTotalPrice(totalPrice + item.price);
        toast.success(`${item.name} added to cart!`, { position: 'bottom-right' });
    };

    // Handle removing items from cart
    const removeFromCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.menuItem._id === item._id);
        if (existingItem && existingItem.quantity > 1) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.menuItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ));
        } else {
            setCartItems(cartItems.filter(cartItem => cartItem.menuItem._id !== item._id));
        }
        setTotalPrice(totalPrice - item.price);
        toast.info(`${item.name} removed from cart!`, { position: 'bottom-right' });
    };

    // Handle Stripe payment
    // Handle Stripe payment
    const handlePayment = async (token) => {
        try {
            const response = await axios.post('http://localhost:2000/api/orders', {
                items: cartItems.map(item => ({
                    menuItem: item.menuItem._id,
                    quantity: item.quantity,
                })),
                paymentMethodId: token.id,  // Token received from Stripe
                payment_method_data: {
                    type: 'card',
                    card: {
                        token: token.id, // Use the token here
                    },
                },
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.message === 'Order placed successfully') {
                toast.success('Payment successful! Order placed.', { position: 'top-center' });
                setCartItems([]); // Empty cart after successful order
                setTotalPrice(0);
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Payment failed! Please try again.', { position: 'top-center' });
        }
    };


    // Render menu items
    const renderMenuItems = () => (
        <div className="menu-grid">
            {menuItems.map(item => (
                <div key={item._id} className="menu-item">
                    <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button className="add-to-cart-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );

    // Render cart
    const renderCart = () => (
        <div className="cart">
            <h2><FaShoppingCart /> Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map(cartItem => (
                        <div key={cartItem.menuItem._id} className="cart-item">
                            <p>{cartItem.menuItem.name} (x{cartItem.quantity})</p>
                            <button onClick={() => removeFromCart(cartItem.menuItem)}>Remove</button>
                        </div>
                    ))}
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                </div>
            )}
        </div>
    );

    return (
        <>
            <Navbar />
            <div className="order-page">
                <ToastContainer /> {/* This is needed to display the notifications */}
                <h1>Place Your Order</h1>
                <div className="order-container">
                    {renderMenuItems()}
                    {renderCart()}
                </div>

                {cartItems.length > 0 && (
                    <div className="checkout">
                        <StripeCheckout
                            stripeKey="pk_test_51PxzTZEGDfya9xMXcs6YhYwMX3raQepLe5pBR0F9ObW0FePXYtj6Kwy2rggjsQkNzl1x4XFZGn3kbZkkulUxJBiv00qNLRyL3u" // Use your public Stripe key here
                            token={handlePayment}
                            amount={Math.round(totalPrice * 100)}
                            name="Food Order"
                            billingAddress
                            shippingAddress
                        >
                            <button className="checkout-btn">Checkout - ${totalPrice.toFixed(2)}</button>
                        </StripeCheckout>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrderPage;
