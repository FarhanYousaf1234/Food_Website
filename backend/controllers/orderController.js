const Stripe = require('stripe');
const Order = require('../models/Order');
const Menu = require('../models/MenuItem');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const stripe = Stripe('sk_test_51PxzTZEGDfya9xMXH5pn1yudaWD4E8PukYkOKYEvVmatajDi9kNybMqjbReA8FoGoHIo7NEr4dePHKEdRt1mcfmz00DKrqe1vJ');

// Place an order
exports.placeOrder = async (req, res) => {
  const { items, paymentMethodId } = req.body;
  const customerId = req.user._id;

  try {
      // Validate cart items and calculate the total price
      let totalPrice = 0;
      const orderItems = [];

      for (let item of items) {
          const menuItem = await Menu.findById(item.menuItem);
          if (!menuItem) {
              return res.status(404).json({ message: `Menu item not found: ${item.menuItem}` });
          }

          orderItems.push({
              menuItem: menuItem._id,
              quantity: item.quantity,
          });

          totalPrice += menuItem.price * item.quantity;
      }

      // Create a new Stripe Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalPrice * 100),
        currency: 'usd',
        payment_method_data: {
          type: 'card',
          card: {
            token: paymentMethodId, // The token passed from the frontend
          },
        },
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never', // Disable redirects
        },
      });
      

      if (paymentIntent.status !== 'succeeded') {
          return res.status(400).json({ message: 'Payment failed' });
      }

      // Generate unique orderId explicitly
      const uniqueOrderId = new mongoose.Types.ObjectId();

      // Check if an order with the same ID already exists
      const existingOrder = await Order.findOne({ orderID: uniqueOrderId });
      if (existingOrder) {
          return res.status(400).json({ message: 'Order ID already exists' });
      }

      // Create the order in the database
      const newOrder = new Order({
          customerId,
          items: orderItems,
          totalPrice,
          paymentStatus: 'Completed',
          paymentMethod: 'Stripe',
          orderStatus: 'Placed',
          orderID: uniqueOrderId,  // Assign generated orderId
      });

      const savedOrder = await newOrder.save();

      // Send order confirmation response
      res.status(201).json({
          message: 'Order placed successfully',
          orderId: savedOrder.orderID,
          paymentIntentId: paymentIntent.id,
      });
  } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

// Get all orders placed by a customer
exports.getCustomerOrders = async (req, res) => {
  const customerId = req.user._id;

  try {
      const orders = await Order.find({ customerId }).populate('items.menuItem');
      res.status(200).json({ orders });
  } catch (error) {
      console.error('Error fetching customer orders:', error);
      res.status(500).json({ message: 'Error fetching customer orders', error: error.message });
  }
};


// Get the current status of an order
exports.getOrderStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Fetch the order by ID
    const order = await Order.findById(orderId).select('orderStatus estimatedDeliveryTime');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Respond with the current order status and estimated delivery time
    res.status(200).json({
      orderId,
      status: order.orderStatus,
      estimatedDeliveryTime: order.estimatedDeliveryTime,
    });
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

