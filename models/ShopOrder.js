// Connect to MongoDB
const mongoose = require('mongoose');

// Define Schema Model
const orderSchema = new mongoose.Schema({
    // Product Schema
    productName: {
      type: String,
    },
    productType: String,
    unitPrice: {
      type: Number,
    },
    quantity: {
      type: String,
    },
    payment: String,
    delivery: String,
    clientEmail: String,
    clientPhone: {
        type: Number,
      },
    orderNote:{
      type: String,
    },
  });
    
  // Create & Export a Model called Shop which has a schema shopSchema
  module.exports = mongoose.model('ShopOrder', orderSchema);