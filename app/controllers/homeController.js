/**
 * Created by Tristan on 16/8/22.
 */
module.exports.index=function (req,res,next) {
    var model={
        title:'Home'
    }
    res.render('home/index',model)
}

module.exports.login=function (req,res,next) {
    var model={
        title:'Login'
    }

    res.render('home/login',model)

}








