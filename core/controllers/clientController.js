/**
 * Created by Tristan on 16/8/30.
 */
var clientService=require('../service/clientService')
exports.registerClient=function (req,res,nex) {
    var clientName=req.body.client_name
    var redirectUrl=req.body.redirect_url
    clientService.registerClient(clientName,redirectUrl,function (err,client) {
        if (err) throw err
        res.json(client)
    })
}

exports.findClient=function (req,res,nex) {
    var clientId=req.params.clientId
    clientService.getOneClient(clientId,function (err,data) {
        res.json(data)
    })
}