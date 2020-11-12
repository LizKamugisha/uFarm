// To test if the node is working:
// console.log('Hello, World! Node is working...');

// Require dependencies into project using require keyword
const path = require('path')
const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');

// instantiate & assign/import routes
const pageRoutes = require('./routes/uFarmRoutes');
const loginRoutes = require('./routes/uFarmLogin');

// Importing model schema 
const FarmerOneReg = require('./models/FarmerOneReg');
const UfarmUsers = require('./models/UfarmUsers');
// Create an express application
const app = express()

// Connect to MongoDB datatbase using Mongoose
mongoose.connect(process.env.uFarmDatabase, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    });

// Test if the mongoose connection is open or not
    mongoose.connection
    .on("open", () => {
      console.log("Mongoose connection open");
    })
    .on("error", err => {
    console.log(`Connection error: ${err.message}`);
    });

// Link path & connect to views directory
app.set('view engine','pug')
app.set('views', path.join(__dirname, 'views'))

//Simple request time logger for a specific route
// app.use((req, res, next) => {
//   console.log('A new request received at ' + Date.now());
//   next();
// });

// Body Parser Middleware settings
app.use(bodyParser.urlencoded({extended: true}))

// Express-Session & Passport Config Settings
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Connecting Passport to Schema
passport.use(UfarmUsers.createStrategy());
passport.serializeUser(UfarmUsers.serializeUser());
passport.deserializeUser(UfarmUsers.deserializeUser());

// Connect to public folder
app.use(express.static(path.join(__dirname,'public')))

// Connect to main Routing where all Get & Post Methods are
app.use('/', pageRoutes);
app.use('/login', loginRoutes );

//logout
app.post('/logout', (req, res) => {
  if (req.session) {
      req.session.destroy((err)=> {
          if (err) {
              // failed to destroy session
          } else {
              return res.redirect('/login');
          }
      })
  }  
})

// Incase of Error
app.get('*',(req,res)=>{
    res.send('error page')
  })

// Create a server that listens on port 3000 for requests
app.listen(3000, ()=> console.log('listening on port 3000'));