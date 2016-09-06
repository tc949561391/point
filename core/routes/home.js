/**
 * Created by Tristan on 16/8/22.
 */
var express=require('express')
var router = express.Router();
var homeController=require('../controllers/homeController')
/* GET users listing. */
router.get('/', homeController.index);
router.get('/login', homeController.pagelogin);
router.post('/login',homeController.login)
module.exports = router;
