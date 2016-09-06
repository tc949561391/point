/**
 * Created by j0 on 2016/8/31.
 */
var uuid = require('uuid')
var ClientModel = require('../models/mongo/client')
var Errors=require('../../errors')

exports.registerClient = function (clientName, callback) {
    var clientId = uuid.v1()
    var clientSecret = uuid.v1()
    ClientModel.saveClient({
        clientId: clientId,
        clientSecret: clientSecret,
        clientName: clientName,
        redirectUrl: 'http://localhost/rd',
        authType: 'password',
        scope: 'read',
        status: 1
    }, callback)
}

exports.getOneClient=function (clientId,callback) {
    ClientModel.getByClientId(clientId,function (err,data) {
        if (err||data==null){
            throw  new Errors.BusinessError(404,'findClient','没有对应客户端')
        }
        callback(null,data)
    })
}