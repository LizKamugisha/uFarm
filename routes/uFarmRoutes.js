const express = require('express');
const router = express.Router();
const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');

// Importing model schema 
const User = require('../models/UserReg')

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

// Sign Up Route
router.get('/aoSignUp',(req,res)=>{
    res.render('aoSignUp',{title:'UFarm SignUp'})
});
// Save the sign up details to the database and redirect to login
// router.post('/signup', passport.authenticate('local'), (req,res) =>{
//     req.session.user = req.user;
//     res.redirect('/login');
// })

// router.post('/signup', async(req,res)=>{
//     try{
//         const userReg= new User(req.body);
//         await userReg.save(() => {
//             console.log('save success')
//             res.redirect('/login')
//         })
//     }
//     catch(err) {
//         res.status(400).send('Sorry! Something went wrong.')
//         console.log(err)
//     }   
// })

router.post('/signup', async (req, res) => { 
    try { const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
            { throw err } res.redirect('/logIntoDash') 
            }) } catch (err) { 
                res.status(400).send('Sorry! Something went wrong.')
                console.log(err)}
            })

router.get('/logIntoDash',(req,res)=>{
    res.render('login',{title:'UFarm Login'})
});

//process the username and password that are submitted in the login page
router.post('/logIntoDash', passport.authenticate('local'), (req,res) =>{
    req.session.user = req.user;
    res.redirect('/aoDash');
})

// AO Dashboard Routing
router.get('/aoDash',(req,res)=>{
    res.render('aoDash',{title:'A.O Dashboard'})
});
// AO Registration Form Routing
router.get('/foRegForm',(req,res)=>{
    res.render('foRegForm',{title:'F.O Registration'})
});
// Save FO Registration to database
// router.post('/registerFO', async(req,res)=>{
//     try{
//         const items = new User(req.body);
//         await items.save(() => {
//             console.log('save success')
//             res.redirect('/folist')
//         })
//     }
//     catch(err) {
//         res.status(400).send('Sorry! Something went wrong.')
//         console.log(err)
//     }   
// })

router.post('/registerFO', async (req, res) => { 
    try { const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
            { throw err } res.redirect('/folist') 
            }) } catch (err) { 
                res.status(400).send('Sorry! Something went wrong with F.O Registration.')
                console.log(err)}
            })

// Example code
// router.post('/', async (req, res) => {
//     try {
//         const items = new User(req.body);
//         await User.register(items, req.body.password , (err) => {
//             if (err)
//               { 
//                throw err
//               }
//             res.redirect('/login')
//         })
//     }
//     catch (err) {
//         res.status(400).send('Sorry! Something went wrong.')
//         console.log(err)
//     }
// })

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