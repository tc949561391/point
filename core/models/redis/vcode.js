/**
 * Created by j0 on 2016/8/29.
 */
var Vcode=function (method,phone,vcode,date,expire) {
    this.method=method
    this.phone=phone
    this.vcode=vcode
    this.date=date
    this.expire=expire
}

module.exports=Vcode