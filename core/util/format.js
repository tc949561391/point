/**
 * Created by Tristan on 16/8/28.
 */
exports.isMobile = function (phone) {
    var mobileP = /^1\d{10}$/
    if (mobileP.test(phone))
        return true
    else
        return false
}

exports.isPassword = function (password) {
    var passwordP = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/
    if (passwordP.test(password))
        return true
    else
        return false
}

exports.isEmail=function (email) {
    var emailP=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (emailP.test(email))
        return true
    else
        return false
}

exports.isHttpUrl=function (url) {
    var urlP=/^http:///([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$/
    if (urlP.test(url))
        return true
    else
        return false

}

exports.isIDCardNum=function (IDCardNum) {
    var cardNumP=/^\d{15}|\d{18}$/
    if (cardNumP.test(IDCardNum))
        return true
    else
        return false
}

exports.isIPStr=function (ip) {
    IPStrP=/(\d+)\.(\d+)\.(\d+)\.(\d+)/g
    if (IPStrP.test(ip))
        return true
    else
        return false
}

