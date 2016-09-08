/**
 * Created by Tristan on 16/8/22.
 */
var paterm = require('../util/format')
var Errors = require('../../errors')
module.exports.index=function (req,res,next) {
    var model={
        title:'Home',
    }
    if (req.session.user){
        model.user=req.session.user
    }
    res.render('home/index',model)
}

module.exports.pagelogin=function (req,res,next) {
    delete req.session.user
    var model={
        title:'Login'
    }
    res.render('home/login',model)
}


exports.login = function (req, res, nex) {
    var phone = req.body.mobile_phone
    var password = req.body.password
    if (!paterm.isMobile(phone)) {
        throw  new Errors.ParamError(101, 'login', '手机号格式不合法')
    }

    if (typeof(password)=='undefined'){
        throw new Errors.ParamError(102, 'login', '密码不能为空')
    }
    var userModel = require('../models/oauth')
    userModel.getUser(phone, password, function (err, user) {
        if (err) throw  err

        req.session.user=user
        res.json(req.session.user)

    })
}








