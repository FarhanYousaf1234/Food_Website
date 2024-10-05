const MenuItem = require('../models/MenuItem');

// Get all items
exports.getAllItems = async () => {
  return await MenuItem.find();
};

// Get items by category
exports.getItemsByCategory = async (category) => {
  return await MenuItem.find({ category });
};

// Search items by name
exports.searchItems = async (query) => {
  return await MenuItem.find({ name: { $regex: query, $options: 'i' } });
};
