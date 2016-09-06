/**
 * Module dependencies.
 */

TopClient = require('./topClient').TopClient;

var client = new TopClient({
                            'appkey':'23317414',
                            'appsecret':'4cf3a1bc2c5174753a8bf28ddf095010',
                            'REST_URL':'https://eco.taobao.com/router/rest'});

client.execute('alibaba.aliqin.fc.sms.num.send',
              {
                  'sms_type':'normal',
                  'sms_free_sign_name':'网站插画分享服务',
                  'sms_param':'{\"code\":\"1234656789\"}',
                  'rec_num':'18018301505',
                  'sms_template_code':'SMS_12961487'
              },
              function (error,response) {
                  if(!error){
                    console.log('send success')
                    console.log(response)
                  }
                  else
                    console.log(error);
              })