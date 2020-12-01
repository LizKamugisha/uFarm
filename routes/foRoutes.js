// FARMER-ONE ROUTES

const express = require('express');
const router = express.Router();

// Importing model schemas
const User = require('../models/UserReg')
const Shop = require('../models/Shop')
const Order = require('../models/ShopOrder')

// Multer Middleware Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
const upload = multer({ storage: storage}).single('image');

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
            });

// Retrieve data from the database & View all registerd UF
router.get('/ufList', async(req,res)=>{
    try{
        let items = await User.find()
        res.render('ufList', { users: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

// Edit & Update UF Details
router.get('/updateUF/:id', async (req, res) => {
    if (req.session.user) {
        try {
            const updateUser = await User.findOne({ _id:req.params.id }, req.body)
            res.render('updateUF', { user: updateUser })
        } catch (err) {
            res.status(400).send('Unable to find user details in the database');
        }
    }else {
        console.log('Unable to find session')
        res.redirect('/ufList')
    }
});

router.post('/updateUF', async (req, res) => {
if (req.session.user) {
    try {
        await User.findOneAndUpdate({_id:req.query.id}, req.body)
        res.redirect('ufList');
    } catch (err) {
        res.status(404).send('Unable to update user details in the database');
    } 
}else {
    console.log('Unable to find session')
    res.redirect('/ufList')
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

// Retrieving shop orders from database
router.get('/viewOrders', async(req,res)=>{
    try{
        let items = await Order.find()
        res.render('shopOrderReview', { shopItems: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

module.exports = router;