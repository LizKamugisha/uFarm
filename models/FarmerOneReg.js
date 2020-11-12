// Connect to MongoDB
const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// Define Schema Model
const foRegistration = new mongoose.Schema({
    
    // FO Registration Schema
    foName: {
      type: String,
      unique: true,
    },
    selectWard: String,
    foNum: {
      type: String,
      unique: true,
    },
    regDate: Date,
    gender: String,
    birthday: Date,
    nin: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    foActivities: String,
    residence: String,
    homeStay: String,
    address:{
      type: String,
      unique: true,
    },
  });
  
  // Create Model & Export it
  // foRegistration.plugin(passportLocalMongoose);
  module.exports = mongoose.model('FarmerOneReg', foRegistration);
 