const express = require('express');
const router = express.Router();
const path = require('path');
//const { route } = require('./admin.routes');

router.get('/pedidos',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','/public','pedidos.html'));
});

module.exports = router