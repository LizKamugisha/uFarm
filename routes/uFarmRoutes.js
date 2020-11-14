const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../roles')
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

// Login Route
router.get('/logIntoDash',(req,res)=>{
    res.render('login',{title:'UFarm Login'})
});

//process the username, password & rol that are submitted in the login page
router.post('/logIntoDash', passport.authenticate('local'), (req,res) =>{
    req.session.user = req.user;
    const userRole = roles[req.user.role]
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
})
// router.post('/', passport.authenticate('local', {failureRedirect: '/login'}), (req,res) =>{
//     req.session.user = req.user;
//     const userRole = roles[req.user.role]
    
//     if(userRole == 'admin')
//         {
//          res.redirect('/userlist');
//         }
//     else(userRole == 'farmer')
//         {
//         res.redirect('/farmerdash');
//     }
// })

// Redirect to user Dashboard depending on user role (A.O, F.O, U.F)
// router.get('/aoDash',(req,res)=>{
//     res.render('aoDash',{title:'A.O Dashboard'})
// });

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
    })

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
    })

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
    })

// AO Dashboard Routing
// router.get('/aoDash',(req,res)=>{
//     res.render('aoDash',{title:'A.O Dashboard'})
// });

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
// });

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

// Retrieve data from the database & View all registerd FO
router.get('/foList', async(req,res)=>{
    try{
        let items = await User.find()
        res.render('foList', { users: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});
// Edit & Update FO Details
router.get('/update/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const updateUser = await User.findOne({ _id:req.params.id })
            res.render('updateFo', { user: updateUser })
        } catch (err) {
            res.status(400).send('Unable to find user details in the database');
        }
    }else {
        console.log('Unable to find session')
        res.redirect('/foList')
    }
})

router.post('/update', async (req, res) => {
if (req.session.user) {
    try {
        await User.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect('foList');
    } catch (err) {
        res.status(404).send('Unable to update user details in the database');
    } 
}else {
    console.log('Unable to find session')
    res.redirect('/foList')
}   
})

// Get & Post Methods for Appointing New FO
// router.get('/foNew',(req,res)=>{
//     res.render('foNew',{title:'Appoint F.O'})
// });
// Get & Post Methods for creating FO Login Credentials
// router.get('/foEditLogin',(req,res)=>{
//     res.render('foEditLogin',{title:'Edit F.O Login'})
// });

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