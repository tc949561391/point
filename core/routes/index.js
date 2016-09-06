var home=require('./home')
var users=require('./users')
var client=require('./client')

var router=function (app) {
  app.use('/',home);
  app.use('/users', users);
  app.use('/clients', client);
}

module.exports = router;
