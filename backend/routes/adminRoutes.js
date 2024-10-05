const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const {
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAllMenuItems,
    getCustomerOrders
  } = require('../controllers/adminController');

  const { protectAdmin } = require('../middleware/AdminauthMiddleware');


const router = express.Router();

// Admin Registration Route
router.post('/register', registerAdmin);

// Admin Login Route
router.post('/login', loginAdmin);

// Admin routes for managing menu items
router.post('/', protectAdmin, addMenuItem); // Add a new menu item
router.put('/:id', protectAdmin, updateMenuItem); // Update an existing menu item
router.delete('/:id', protectAdmin, deleteMenuItem); // Remove a menu item
router.get('/', protectAdmin, getAllMenuItems); // View all menu items

// Admin route to view all customer orders
router.get('/orders', protectAdmin, getCustomerOrders);

module.exports = router;
