var util = require('util');

function ParamError(errCode, method, message) {
    this.error_code = errCode
    this.method = method
    this.message = message
    this.time = Date.now()
    this.type = 'param'
    Error.call(this)
}

util.inherits(ParamError, Error)

module.exports.ParamError = ParamError


function BusinessError(errCode, method, message) {
    this.error_code = errCode
    this.method = method
    this.message = message
    this.time = Date.now()
    this.type = 'business'
    Error.call(this)
}
util.inherits(BusinessError, Error)

module.exports.BusinessError = BusinessError


function Success(method, message) {
    var successModel = {
        error_code: 0,
        method:method,
        message:message||'success',
        time:Date.now(),
        type:'OK'
    }
    return successModel
}
module.exports.Success=Success








