var express = require('express');
var expressDomain = require('express-domain');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server')
var session=require('express-session')
var RedisStore=require('connect-redis')(session)
var oauthModels = require('./core/models/oauth')

var config=require('./config')

var routes = require('./core/routes');
var errorHandler=require('./errors/errorHandler')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressDomain());
app.use(bodyParser.json());
//会话管理

app.use(session({
    store:new RedisStore(config.sessionRedis),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.oauth = oauthserver({
    model: oauthModels,
    grant: ['password', 'authorization_code', 'refresh_token'],
    debug: true
})


app.use(bodyParser.urlencoded({extended: false}));


app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: false
}));


app.use(express.static(path.join(__dirname, 'public')));


process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)
});




app.use('/oauth/token', app.oauth.grant())

routes(app)


// catch 404 and forward to error handler
app.use(errorHandler.NotFoundErrorHandler)
// error handlers
app.use(errorHandler.ParamErrorHandler)

app.use(function (req,res, next) {
    var d = domain.create();
    //监听domain的错误事件
    d.on('error', function (err) {
        logger.error(err);
        res.statusCode = 500;
        res.json({sucess:false, messag: '服务器异常'});
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);
});



// app.use(app.oauth.errorHandler());


module.exports = app;
