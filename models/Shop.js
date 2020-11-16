// Connect to MongoDB
const mongoose = require('mongoose');

// Define Schema Model
const shopSchema = new mongoose.Schema({
    // Product Schema
    productName: {
      type: String,
    },
    productType: String,
    unitPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    productDate: Date,
    payment: String,
    delivery: String,
    address:{
      type: String,
    },
    selectWard: String,
  });
    
  // Create Model & Export it
  module.exports = mongoose.model('Shop', shopSchema);