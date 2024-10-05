const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: { type: [String], required: true },
  availability: { type: Boolean, default: true },
  imageUrl: { type: String }, // Image for the item (optional)
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
