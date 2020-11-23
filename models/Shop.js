// Connect to MongoDB
const mongoose = require('mongoose');

// Define Schema Model
const shopSchema = new mongoose.Schema({
    // Product Schema
    productName: {
      type: String,
    },
    image: {
      type: String,
    },
    productType: String,
    unitPrice: {
      type: Number,
    },
    quantity: {
      type: String,
    },
    productDate: Date,
    payment: String,
    delivery: String,
    address:{
      type: String,
    },
    selectWard: String,
    status: String,
  });
    
  // Create & Export a Model called Shop which has a schema shopSchema
  module.exports = mongoose.model('Shop', shopSchema);