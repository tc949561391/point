/**
 * Created by j0 on 2016/8/29.
 */
var sendMsgService = require('./sendMsgService')
var crypto = require('crypto');
var Vcode = require('../models/redis/vcode')
var redis = require('../models/redis')
var util = require('util')
var UserModel = require('../models/mongo').User
var Errors = require('../../errors')

exports.sendVcode = function (mobile, method, callback) {
    var code = getRandomCode()
    redis.getVCode('register', mobile, function (err, data) {
        if (err) throw  err
        if (data && Date.now() - data.date < Number(data.expire)) throw  new Errors.BusinessError(201, 'register', "发送过于频繁")
        sendMsgService.send(mobile, code, function (err) {
            if (err) {
                throw new Errors.BusinessError(201, 'register', "短信发送失败")
            }
            var vcode = new Vcode(method, mobile, code, Date.now(), 60000)
            redis.saveVCode(vcode, callback)
        });
    })
}


exports.register = function (phone, vcode, password, callback) {
    UserModel.findOne({mobile: phone}, function (err, data) {
        if (err) throw  err
        if (data) {
            console.log(data)
            throw  new Errors.BusinessError(202, 'register', '该手机号已经被注册')
        }
        redis.getVCode('register', phone, function (err, data) {
            if (err || !data || data.vcode != vcode) throw  new Errors.ParamError(103, 'register', '验证码错误')
            redis.deleteVCode('register', phone, function (error) {
                if (error) console.log('delete error')
            })


            var shasum = crypto.createHash('sha1');
            shasum.update(phone + password);
            var auth = shasum.digest('hex');

            UserModel.saveOne({
                mobile: phone,
                auth: auth
            },callback)
        })
    })
}


function getRandomCode() {
    var Num = ""
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10)
    }
    return Num
}