const express = require('express');
const router = express.Router();

// Get & Post Methods for Homepage
router.get('/home',(req,res)=>{
    res.render('home',{title:'U Farm'})
});
// router.post('/linkToForm', (req, res) => {
//   console.log(req.body)
//   res.render('form', {title:'Subscribe'})
// });

// Get & Post Methods for Shop page
router.get('/shop',(req,res)=>{
    res.render('shop',{title:'UFarm Shop'})
});
// Get & Post Methods for Order page
router.get('/order',(req,res)=>{
    res.render('order',{title:'UFarm Order'})
});
// Get & Post Methods for Login page
router.get('/login',(req,res)=>{
    res.render('login',{title:'UFarm Login'})
});

// Get & Post Methods for AO Dashboard
router.get('/aoDash',(req,res)=>{
    res.render('aoDash',{title:'A.O Dashboard'})
});
// Get & Post Methods for AO Registration Form
router.get('/foRegForm',(req,res)=>{
    res.render('foRegForm',{title:'F.O Registration'})
});
// Get & Post Methods for AO List
router.get('/foList',(req,res)=>{
    res.render('foList',{title:'F.O List'})
});
// Get & Post Methods for Appointing New FO
router.get('/foNew',(req,res)=>{
    res.render('foNew',{title:'Appoint F.O'})
});
// Get & Post Methods for creating FO Login Credentials
router.get('/foEditLogin',(req,res)=>{
    res.render('foEditLogin',{title:'Edit F.O Login'})
});



module.exports = router;