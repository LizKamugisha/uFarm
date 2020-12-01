const express = require('express');
const router = express.Router();
const passport = require('passport');

// Importing model schemas
const User = require('../models/UserReg')

// Sign Up Route
router.get('/aoSignUp',(req,res)=>{
    res.render('aoSignUp',{title:'UFarm SignUp'})
});

// Save the sign up details to the database and redirect to login
router.post('/signup', async (req, res) => { 
    try { const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
            { throw err } res.redirect('/logIntoDash') 
            }) } catch (err) { 
                res.status(400).send('Sorry! Something went wrong.')
                console.log(err)}
            });

// Login Route
router.get('/logIntoDash',(req,res)=>{
    res.render('login',{title:'UFarm Login'})
});

// Authenticate login details and redirect to dashboard depending on user role (A.O, F.O, U.F)
router.post('/logIntoDash', passport.authenticate('local'), (req,res) =>{
    req.session.user = req.user;
    const userRole = req.user.role
    if(userRole == 'admin'){
         return res.redirect('/aoDash');
    } else if(userRole == 'farmerOne')
        {
        return res.redirect('/foDash');
    } else if(userRole == 'urbanFarmer')
        {
        return res.redirect('/ufDash');
    } else{
        console.log('something went wrong with role authentication');
    }
});

// Redirect to user Dashboard depending on user role (A.O, F.O, U.F)
router.get('/aoDash', async (req, res) => {
    if (req.session.user) {
        try {
            res.render('aoDash', {title: 'A.O Dashboard', currentUser:req.session.user,currentRole:req.session.role})
        } catch (err) {
        } 
    }else {
        console.log("Can't find A.O session")
        res.redirect('/logIntoDash')
    }   
    });

router.get('/foDash', async (req, res) => {
    if (req.session.user) {
        try {
            res.render('foDash', {title: 'F.O Dashboard', currentUser:req.session.user,currentRole:req.session.role})
        } catch (err) {
        } 
    }else {
        console.log("Can't find F.O session")
        res.redirect('/logIntoDash')
    }   
    });

router.get('/ufDash', async (req, res) => {
    if (req.session.user) {
        try {
            res.render('ufDash', {title: 'U.F Dashboard', currentUser:req.session.user,currentRole:req.session.role})
        } catch (err) {
        } 
    }else {
        console.log("Can't find U.F session")
        res.redirect('/logIntoDash')
    }   
    });

module.exports = router;