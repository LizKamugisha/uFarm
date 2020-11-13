// Connect to MongoDB
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define Schema Model
// const foRegistration = new mongoose.Schema({
const userReg = new mongoose.Schema({
    
 // SignUp / Login Schema
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


// FO Registration Schema
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
    foActivities: [{type:String}],
    residence: String,
    homeStay: String,
    address:{
      type: String,
      unique: true,
    },
  });
  
  // Create Model & Export it
  userReg.plugin(passportLocalMongoose);
  // module.exports = mongoose.model('FarmerOneReg', foRegistration);
  module.exports = mongoose.model('UserReg', userReg);
 