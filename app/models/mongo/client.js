/**
 * Created by Tristan on 16/8/30.
 */
var mongoose = require('mongoose');
var redis = require('../redis').redisConn


var ClientSchema = new mongoose.Schema({
    clientId: {
        type: String, unique: true, required: true
    },
    clientSecret: {
        type: String, required: true
    },
    clientName: {
        type: String, required: true
    },
    redirectUrl: {
        type: String, required: true
    },
    authType: {
        type: String, required: true
    },
    createTime: {
        type: Date, default: Date.now()
    },
    scope: {
        type: String, required: true
    },
    status: {
        type: Number
    }
});


ClientSchema.static("saveClient", function (clientFeild, callback) {
    var client = new ClientModel(clientFeild);
    client.save(function (err, data) {
        if (err) {
            callback(err)
            return
        }
        redis.select(10, function () {
            var key = 'table:clients:' + data._doc.clientId
            var value = data.toString()
            redis.set(key, value, function (err) {
                callback(err,data)
            })
        })
    })
})


ClientSchema.static('getByClientId', function (clientId, callback) {
    redis.select(10, function () {
        console.log('getByClientId:clientId=' + clientId)
        redis.get('table:clients:' + clientId, function (err, data) {
            if (data == null) {
                console.log('getByClientId:缓存没有命中')
                ClientModel.findOne({clientId: clientId}, callback)
                return
            }
            console.log('getByClientId:缓存命中')
            callback(null, data)
        })
    })
})


var ClientModel = mongoose.model('clients', ClientSchema)

module.exports = ClientModel

module.exports.saveClient = ClientModel.saveClient
module.exports.getByClientId = ClientModel.getByClientId
