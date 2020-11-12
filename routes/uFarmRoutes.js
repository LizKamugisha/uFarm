const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importing model schema 
const User = require('../models/FarmerOneReg')

// Homepage Routing
router.get('/',(req,res)=>{
    res.render('home',{title:'U Farm'})
});
router.get('/home',(req,res)=>{
    res.render('home',{title:'U Farm'})
});
// router.post('/linkToForm', (req, res) => {
//   console.log(req.body)
//   res.render('form', {title:'Subscribe'})
// });
// Shop page Routing
router.get('/shop',(req,res)=>{
    res.render('shop',{title:'UFarm Shop'})
});
// Shopping Order page Routing
router.get('/order',(req,res)=>{
    res.render('order',{title:'UFarm Order'})
});

// AO Dashboard Routing
router.get('/aoDash',(req,res)=>{
    res.render('aoDash',{title:'A.O Dashboard'})
});
// AO Registration Form Routing
router.get('/foRegForm',(req,res)=>{
    res.render('foRegForm',{title:'F.O Registration'})
});
// Save FO Registration to database
router.post('/registerFO', async(req,res)=>{
    try{
        const foRegistration = new User(req.body);
        await foRegistration.save(() => {
            console.log('save success')
            res.redirect('/folist')
        })
    }
    catch(err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }   
})

// Example code
router.post('/', async (req, res) => {
    try {
        const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
              { 
               throw err
              }
            res.redirect('/login')
        })
    }
    catch (err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err)
    }
})

// AO List Routing & retrieve data from the database 
router.get('/foList', async(req,res)=>{
    try{
        let items = await User.find()
        res.render('foList', { users: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

// Get & Post Methods for Appointing New FO
router.get('/foNew',(req,res)=>{
    res.render('foNew',{title:'Appoint F.O'})
});
// Get & Post Methods for creating FO Login Credentials
router.get('/foEditLogin',(req,res)=>{
    res.render('foEditLogin',{title:'Edit F.O Login'})
});

// //logout
// app.post('/logout', (req, res) => {
//     if (req.session) {
//         req.session.destroy((err)=> {
//             if (err) {
//                 // failed to destroy session
//             } else {
//                 return res.redirect('/login');
//             }
//         })
//     }  
//   })


module.exports = router;