const express = require('express');
const router = express.Router();

// Importing model schemas
const Shop = require('../models/Shop')
const Order = require('../models/ShopOrder')

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

// Shop Orders Routes
router.post('/shopOrder', async (req, res) => { 
    try { const shopOrder = new Order(req.body);
        await shopOrder.save() 
            console.log(req.body)
            res.redirect('/shop')
        } catch (err) { 
                res.status(400).send('Sorry! Something went wrong with posting your shop order')
                console.log(err)}
            });

module.exports = router;