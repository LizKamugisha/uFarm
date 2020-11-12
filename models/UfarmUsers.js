// Connect to MongoDB
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define Schema Model
const userSchema = new mongoose.Schema({
    // Login Schema
    name: {
      type: String,
      unique: true,
      required: 'Please enter first & last name',
    },
    username: {
      type: String,
      unique: true,
      required: 'Please enter username',
    },
    password: {
      type: String,
      required: 'Please enter password',
    },
    selectWard: String,
  });
    
  // Create Model & Export it
  userSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model('UfarmUsers', userSchema);