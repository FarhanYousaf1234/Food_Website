const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const {getOrderStatus}= require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware'); // Protect routes for logged-in users


const router = express.Router();

// Place a new order (only logged-in customers)
router.post('/', protect, placeOrder);

// Get all orders of a customer

router.get('/status/:orderId',protect, getOrderStatus);



module.exports = router;
