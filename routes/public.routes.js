const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/dashboard',(req,res)=>{
    res.sendFile(path.join(__dirname,"..",'/public','dashboard.html'));
});

router.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public','login.html'));
});


router.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public','register.html'));
})
//router.get('/login')

module.exports = router;