const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Unable to fetch menu items.' });
  }
};

// Get menu items by category
exports.getMenuItemsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const items = await MenuItem.find({ category });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Unable to fetch menu items by category.' });
  }
};

// Search for menu items by name
exports.searchMenuItems = async (req, res) => {
  const { query } = req.query;
  try {
    const items = await MenuItem.find({ name: { $regex: query, $options: 'i' } });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Unable to search menu items.' });
  }
};
