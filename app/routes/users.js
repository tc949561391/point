var express = require('express');
var userController=require('../controllers/userController')
var router = express.Router();

router.post('/sendvcode',userController.sendVCode)
router.post('/register',userController.register)
router.post('/login',userController.login)


module.exports = router;
