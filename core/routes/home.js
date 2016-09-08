/**
 * Created by Tristan on 16/8/22.
 */
var express=require('express')
var router = express.Router();
var homeController=require('../controllers/homeController')
/* GET users listing. */
router.get('/', homeController.index);
router.get('/index.html', homeController.index);
router.get('/index.v', homeController.index);
router.get('/index', homeController.index);
router.get('/index.jsp', homeController.index);
router.get('/login.v', homeController.pagelogin);
router.post('/login',homeController.login)
module.exports = router;
