const express = require('express');
const { getAllMenuItems, getMenuItemsByCategory, searchMenuItems } = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();


// Get all menu items
router.get('/',protect, getAllMenuItems);

// Get menu items by category
router.get('/category/:category',protect, getMenuItemsByCategory);

// Search for menu items by name
router.get('/search',protect, searchMenuItems);

module.exports = router;
