/**
 * Created by Tristan on 16/8/27.
 */
var ClientModel=require('./models/mongo/client')

ClientModel.getByClientId('24ef4430-6f61-11e6-9926-8f8d7ed0baca',function (err,data) {
    console.log(data)
})

