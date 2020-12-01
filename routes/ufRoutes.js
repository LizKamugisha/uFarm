// URBAN-FARMER ROUTES

const express = require('express');
const router = express.Router();

// Importing model schemas
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

// Retrieving shop orders from database
router.get('/viewOrders2', async(req,res)=>{
    try{
        let items = await Order.find()
        res.render('ufOrderReview', { shopItems: items})
    }catch(err){
        res.status(400).send('Unable to find items in the database');
    }  
});

module.exports = router;