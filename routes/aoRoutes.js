// AGRI-OFFICER ROUTES

const express = require('express');
const router = express.Router();

// Importing model schemas
const User = require('../models/UserReg')

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
            });

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
            const updateUser = await User.findOne({ _id:req.params.id }, req.body)
            res.render('updateFo', { user: updateUser })
        } catch (err) {
            res.status(400).send('Unable to find user details in the database');
        }
    }else {
        console.log('Unable to find session')
        res.redirect('/foList')
    }
});

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
});

module.exports = router;