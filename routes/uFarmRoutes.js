const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../roles')

// const passportLocalMongoose = require('passport-local-mongoose');

// Importing model schemas
const User = require('../models/UserReg')
const Shop = require('../models/Shop')

// Multer Middleware Settings
// const path = require('path')
const multer = require('multer');
// const fs = require('fs');
// const imgModel = require('../models/Shop')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
const upload = multer({ storage: storage}).single('image');

// Homepage Routing
router.get('/',(req,res)=>{
    res.render('home',{title:'U Farm'})
});
router.get('/home',(req,res)=>{
    res.render('home',{title:'U Farm'})
});

// Shop page Routing
router.get('/shop', async(req,res)=>{
    try{
        let items = await Shop.find()
        res.render('shop',{title:'Upload Product', shopItems: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

// router.get('/shop', async(req,res)=>{
//     try{
//         const status = await shopItems.find({status:'approved'})
//         res.render ('shop', {items: status})
//     }catch(err){
//         res.status(400).send('Data fetch failed')
//     }
// });

// router.get('/shop', async(req,res)=>{
//     try{
//         let items = await Shop.find()
//         if(shopItems.status  == 'approved'){
//             return res.render('shop',{title:'Upload Product', shopItems: items})
//         } else{
//            console.log('Unable to display approved products in shop');
//         }
//     }catch(err){
//         res.status(400).send('Unable to find items in the database');
//     }  
// });

// Shopping Order page Routing
router.get('/order',(req,res)=>{
    res.render('order',{title:'UFarm Order'})
});

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
            })

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

// AGRI-OFFICER ROUTES

// FO Registration Form
router.get('/foRegForm',(req,res)=>{
    res.render('foRegForm',{title:'F.O Registration'})
});
// Save FO Registration to database
router.post('/registerFO', async (req, res) => { 
    try { const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
            { throw err } res.redirect('/folist') 
            }) } catch (err) { 
                res.status(400).send('Sorry! Something went wrong with F.O Registration.')
                console.log(err)}
            })
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

// FARMER-ONE ROUTES

// UF Registration Form
router.get('/ufRegForm',(req,res)=>{
    res.render('ufRegForm',{title:'U.F Registration'})
});
// Save UF Registration to database
router.post('/registerUF', async (req, res) => { 
    try { const items = new User(req.body);
        await User.register(items, req.body.password , (err) => {
            if (err)
            { throw err } res.redirect('/uflist') 
            }) } catch (err) { 
                res.status(400).send('Sorry! Something went wrong with U.F Registration.')
                console.log(err)}
            })
// Retrieve data from the database & View all registerd UF
router.get('/ufList', async(req,res)=>{
    try{
        let items = await User.find()
        res.render('ufList', { users: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});
// Review product list uploaded by urban farmers
router.get('/foReviewProd', async(req,res)=>{
    try{
        let items = await Shop.find()
        res.render('foReviewProd', { shopItems: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});
// Approve products uploaded by urban farmers
router.get('/approveStock/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const items = await Shop.findOne({ _id:req.params.id })
            res.render('approveStock', { item: items })
        } catch (err) {
            res.status(400).send('Unable to find item details in the database');
        }
    }else {
        console.log('Unable to find session')
        res.redirect('/foReviewProd')
    }
});

router.post('/approveStock', upload, async(req,res)=>{  
    if (req.session.user) {
        try{    
            if(req.file){    
                const img2 = await Shop.findOneAndUpdate({_id:req.query.id}, req.body);
                img2.image = req.file.filename;
                await img2.save()
            } else{      
                await Shop.findOneAndUpdate({_id:req.query.id}, req.body);
            } res.redirect('/foReviewProd');  
        }catch(err){    
            res.status(400).send('Sorry! Data posting failed')  
        }
    }else {
            console.log('Unable to find session')
            res.redirect('/foReviewProd')
        }   
});

// URBAN-FARMER ROUTES

// Get Product Form
router.get('/productForm',(req,res)=>{
    res.render('productForm',{title:'Upload Product'})
});

// Post & Save products to database
router.post('/uploadProduct', upload, async (req, res) => { 
    try { const shopItem = new Shop(req.body);
        shopItem.image = req.file.filename
        await shopItem.save(() => {
            console.log(req.body)
            res.redirect('/stockList') 
            })
        } catch (err) { 
                res.status(400).send('Sorry! Something went wrong with product upload')
                console.log(err)}
            });

// Retrieve data from the database & View all uploaded produce in stock list
router.get('/stockList', async(req,res)=>{
    try{
        let items = await Shop.find()
        res.render('stockList', { shopItems: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

// routes to update stock page
router.get('/updateStock/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const items = await Shop.findOne({ _id:req.params.id })
            res.render('updateStock', { item: items })
        } catch (err) {
            res.status(400).send('Unable to find item details in the database');
        }
    }else {
        console.log('Unable to find session')
        res.redirect('/stockList')
    }
});
// posing updates back to stock list page
// router.post('/updateStock', async (req, res) => {
// if (req.session.user) {
//     try {
//         await Shop.findOneAndUpdate({_id:req.query.id}, req.body)
//         res.redirect('stockList');
//     } catch (err) {
//         res.status(404).send('Unable to update product details in the database');
//     } 
// }else {
//     console.log('Unable to find session')
//     res.redirect('/stockList')
// }   
// });

router.post('/updateStock', upload, async(req,res)=>{  
    if (req.session.user) {
        try{    
            if(req.file){    
                const img2 = await Shop.findOneAndUpdate({_id:req.query.id}, req.body);
                img2.image = req.file.filename;
                await img2.save()
            } else{      
                await Shop.findOneAndUpdate({_id:req.query.id}, req.body);
            } res.redirect('/stockList');  
        }catch(err){    
            res.status(400).send('Sorry! Data posting failed')  
        }
    }else {
            console.log('Unable to find session')
            res.redirect('/stockList')
        }   
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