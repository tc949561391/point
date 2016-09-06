// var bcrypt = require('bcrypt');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var redis = require('../redis').redisConn


var UserSchema = new Schema({
    mobile: {type: String, unique: true, required: true},
    auth: {type: String, required: true},
    createDate: {type: Date, default: Date.now()},
    firstname: String,
    lastname: String
});

// function hashPassword(password) {
//   var salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// }
//
// OAuthUsersSchema.static('saveUser', function (userFeild, cb) {
//     var user;
//
//     userFeild.hashed_password = hashPassword(userFeild.password);
//     delete userFeild.password;
//
//     user = new OAuthUsersModel(userFeild);
//     user.save(cb);
// });
//
// OAuthUsersSchema.static('getUser', function(email, password, cb) {
//   OAuthUsersModel.authenticate(email, password, function(err, user) {
//     if (err || !user) return cb(err);
//     cb(null, user.email);
//   });
// });
//
// OAuthUsersSchema.static('authenticate', function(email, password, cb) {
//   this.findOne({ email: email }, function(err, user) {
//     if (err || !user) return cb(err);
//     cb(null, bcrypt.compareSync(password, user.hashed_password) ? user : null);
//   });
// });
UserSchema.static('findOneByMobile', function (mobile, callback) {
    redis.select(10, function () {
        redis.get('table:users:' + mobile, function (err, data) {
            if (err || data == null) {
                UserModel.findOne({mobile: mobile}, callback)
                return;
            }
            callback(null, data)
        })
    })
})


UserSchema.static('saveOne', function (userFiled, callback) {
    var user = new UserModel(userFiled)
    user.save(function (err, data) {
        if (err) {
            callback(err)
            return
        }
        redis.select(10, function () {
            redis.set('table:users' + userFiled.mobile, data.toString(), callback)
        })
    })
})


UserSchema.static('buildAuth', function (mobile, password) {
    var shasum = crypto.createHash('sha1');
    shasum.update(mobile + password);
    var auth = shasum.digest('hex');
    return auth
})


var UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;

module.exports.findOneByMobile = UserModel.findOneByMobile
module.exports.buildAuth = UserModel.buildAuth
