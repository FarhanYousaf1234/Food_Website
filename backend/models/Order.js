const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
  },
  items: [{
      menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true,
      },
      quantity: {
          type: Number,
          required: true,
      },
  }],
  totalPrice: {
      type: Number,
      required: true,
  },
  paymentStatus: {
      type: String,
      required: true,
  },
  paymentMethod: {
      type: String,
      required: true,
  },
  orderStatus: {
      type: String,
      enum: ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'],
      default: 'Placed',
  },
  orderID: {
      type: String,
      unique: true,
      required: true,
      default: () => new mongoose.Types.ObjectId().toString(),  
  },
  estimatedDeliveryTime: {
    type: Date,  
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
