const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const UfarmUsers = require('../models/UfarmUsers');

// Get and display the login page
// router.get('/login',(req,res)=>{
//     res.render('login',{title:'UFarm Login'})
// });
router.get('/',(req,res)=>{
    res.render('login',{title:'UFarm Login'})
});
//process the username and password that are submitted in the login page
router.post('/logIntoDash', passport.authenticate('local'), (req,res) =>{
    req.session.user = req.user;
    res.redirect('/aoDash');
})

// Creating System Users & saving thier data to the database
router.post('/createLogin', async (req, res) => {
    try {
        const items = new UfarmUsers(req.body);
        await UfarmUsers.register(items, req.body.password , (err) => {
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


// retrieve data from the database 
// router.get('/foEditLogin', async(req, res)=>{
//     try{
//         let items = await UfarmUsers.find()
//         res.render('foEditLogin', { users: items})
//     }catch(err){
//         res.status(400).send("Unable to find users in the database");
//     }  
// })

// Class Example
// router.post('/', passport.authenticate('local'), (req,res) =>{
//     req.session.user = req.user;
//     res.redirect('/userlist');
// })


// Save Login Info to database using asyncronous method
// router.post('/aoDash', (req,res) =>{
//     const login = new User(req.body);
//     login.save()
//     .then(() => { res.redirect('aoDash'); })
//     .catch((err) => {
//       console.log(err);
//       res.send('Sorry! Something went wrong.');
//     });
// });


module.exports = router;