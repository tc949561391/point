var config = require('../../../config/index');
var mongoose = require('mongoose');
mongoose.connect(config.db, {});
console.log('mogo connect success')

module.exports.oauth = require('./../oauth');
module.exports.User = require('./user');
module.exports.Client = require('./client')
// module.exports.OAuthClientsModel = require('./../oauth_client');
// module.exports.mongoose = mongoose;

