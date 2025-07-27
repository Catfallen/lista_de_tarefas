const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');

router.post('/login',adminController.loginCliente);


router.post('/register',adminController.postNewCliente);


module.exports = router;