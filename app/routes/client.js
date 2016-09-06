/**
 * Created by Tristan on 16/8/30.
 */
var express = require('express');
var clientController=require('../controllers/clientController')
var router = express.Router();

router.post('/register',clientController.registerClient)
router.get('/:clientId',clientController.findClient)


module.exports = router;