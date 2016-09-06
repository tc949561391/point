/**
 * Created by j0 on 2016/8/29.
 */
var paterm = require('../util/format')
var userService = require('../service/userService')
var Errors = require('../../errors')

//发送验证码
exports.sendVCode = function (req, res, nex) {
    var phone = req.body.mobile_phone
    if (!paterm.isMobile(phone)) {
        throw  new Errors.ParamError(101, 'register', '手机号格式不合法')
    }
    userService.sendVcode(phone, 'register', function (err, vcode) {
        if (err) {
            throw  err
        }
        res.json(new Errors.Success('sendvcode', '验证码发送成功'))
    })
}


exports.register = function (req, res, nex) {
    var phone = req.body.mobile_phone
    var vcode = req.body.vcode
    var password = req.body.password
    if (!paterm.isMobile(phone)) {
        throw  new Errors.ParamError(101, 'register', '手机号格式不合法')
    }
    if (!paterm.isPassword(password)) {
        throw new Errors.ParamError(102, 'register', '密码不合法')
    }
    if (typeof(vcode) == 'undefined' || vcode.length != 6) {
        throw  new Errors.ParamError(103, 'register', '验证码错误')
    }
    userService.register(phone, vcode, password, function (error) {
        if (error) throw  error
        res.json(new Errors.Success('register', '注册成功'))
    })

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
        res.json(user)
    })
}