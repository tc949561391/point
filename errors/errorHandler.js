/**
 * Created by j0 on 2016/8/31.
 */
var Errors = require('./index')
module.exports.ParamErrorHandler = function (err, req, res, next) {
    if (err instanceof Errors.ParamError) {
        doforParamError(err, req, res)
        return
    }

    if (err instanceof Errors.BusinessError) {
        doforParamError(err, req, res)
        return
    }

    last(err, req, res)
}


//404
module.exports.NotFoundErrorHandler = function (req, res, nex) {
    res.status(404)

    if (typeof(req.header('Content-type')) != 'undefined' && req.header('Content-type').indexOf('application/json') >= 0) {
        nex(new Error('找不到对应资源'))
        return
    }
    res.render('errors/404', {
        title: '404'
    })
}


function doforParamError(err, req, res) {
    res.status(200)
    var resMsg = {
        error_code: err.error_code,
        method: err.method,
        type: err.type,
        path: req.originalUrl,
        message: err.message,
        time: Date.now()
    }
    res.json(resMsg)
}


//系统中未知的异常
function last(err, req, res) {
    res.status(res.statusCode || 500)
    console.log(err)
    if (typeof(req.header('Content-type')) != 'undefined' && req.header('Content-type').indexOf('application/json') >= 0) {
        var error = {
            error_code: res.statusCode,
            method: 'unKnow',
            message: err.message,
            path: req.originalUrl,
            time: Date.now()
        }
        res.json(error)
        return
    }
    res.render('errors/500',{
        title:'500'
    })
}
