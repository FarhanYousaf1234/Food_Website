const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Menu = require('../models/MenuItem');


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({ name, email, password });

    // Return token and admin info
    res.status(201).json({
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Admin registration failed' });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Return token and admin info
    res.status(200).json({
      token: generateToken(admin._id),
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error: Admin login failed' });
  }
};

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    const { name, description, price, category, availability, imageUrl } = req.body;
  
    try {
      // Create a new menu item
      const newMenuItem = new Menu({
        name,
        description,
        price,
        category,
        availability,
        imageUrl,
      });
  
      // Save the menu item to the database
      const savedMenuItem = await newMenuItem.save();
      res.status(201).json(savedMenuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error adding menu item', error: error.message });
    }
  };
  
  // Update an existing menu item
  exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, availability, imageUrl } = req.body;
  
    try {
      // Find and update the menu item
      const updatedMenuItem = await Menu.findByIdAndUpdate(
        id,
        { name, description, price, category, availability, imageUrl },
        { new: true } // Return the updated document
      );
  
      if (!updatedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.status(200).json(updatedMenuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating menu item', error: error.message });
    }
  };
  
  // Remove a menu item
  exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the menu item
      const deletedMenuItem = await Menu.findByIdAndDelete(id);
  
      if (!deletedMenuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting menu item', error: error.message });
    }
  };
  
  // View all menu items (for managing purposes)
  exports.getAllMenuItems = async (req, res) => {
    try {
      const menuItems = await Menu.find();
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving menu items', error: error.message });
    }
  };

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


