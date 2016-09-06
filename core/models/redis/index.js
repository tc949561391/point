/**
 * Created by j0 on 2016/8/30.
 */
var redis = require('redis')
var config = require('../../../config')
var redisConn = redis.createClient(config.redis.port, config.redis.host, {})
redisConn.on('error', function () {
    console.error('redis connnected error')
})

redisConn.on('connect', function () {
        console.log('redis connected success')
    }
)


exports.saveVCode = function (vcode, callback) {

    redisConn.select(10, function (error) {
        if (error) {
            throw  error
        }
        redisConn.hmset('vcode:' + vcode.method + ':' + vcode.phone, vcode, function (err) {
            if (err) throw  err
            redisConn.expire('vcode:' + vcode.method + ':' + vcode.phone, 10 * vcode.expire / 1000, callback)
        })
    })
}


exports.getVCode = function (method, phone, callback) {
    redisConn.select(10, function (err) {
        if (err) {
            throw  err
        }
        redisConn.hgetall('vcode:' + method + ':' + phone, callback)
    })
}

exports.deleteVCode = function (method, phone, callback) {
    redisConn.del('vcode:' + method + ':' + phone, callback)
}

module.exports.redisConn=redisConn
