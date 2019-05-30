var express = require('express');
var router = express.Router();
var rabbit = require('../rabbitmq/publish_amqp.js');
var amqp = require('amqplib/callback_api');
var encryption = require('../auth/encryption.js');
var authToken = require('../auth/authToken.js');
var record;
var db = require('../mysql/conn.js');
db = new db();
const querystring = require('querystring');
rabbit  = new rabbit();
authToken  = new authToken();
encryption = new encryption();
var param;
router.post('/', async function (req, res, next) {

    
    var data = req.body || '1';
    var user_login;
    var account_num;
    var obj;
    var privateKey = 'hktEducation-findsolution-secret';
    
    // try {
    //   var decoded = jwt.verify(jwtBearerToken, 'secret');
    // } catch(err) {
    //   // err
    // }
    // const publish_promise = rabbit.publishAmqp('login',data);
    // const subscribe_promise =  rabbit.subscribeAmqp('login');
    // console.log(subscribe_promise)
     // subscribe_promise.then((result) => { 
     
   // return rabbit.subscribeAmqp('login',function(result){
       var  params = data;
        // var params = JSON.parse(data);
        // var params = {"username":"t1234567","password":"1234567811"};
        // var psw = encryption.decrypt(params.password);
        var param = params.username+'|'+params.password;
        console.log(param)
        var psw = encryption.encrypt(param);
        console.log(psw)
        var sql = "SELECT count(*) as c,a.user_id,a.name,a.group_id,b.school_id,a.class,b.name_eng FROM hkt.tbl_user a left join hkt.tbl_school b on a.school_id= b.school_id and a.active=b.active where a.user_id='"+params.username+"' and a.pwd='"+psw+"' and a.active='1';";
        sql += "SELECT count(*) as c FROM hkt.tbl_user where user_id='"+params.username+"' and active='1'";
    // }).then(result => {
    //     console.log('ddddddddd')
    // console.log(result)
      var jwtBearerToken = authToken.getToken(params.username,psw);

        db.con.query(sql, (err, rows) => {
            if (err) throw err;
              record = rows[0];
             if(rows[0][0].c ==1){
                 user_login = true;
                 record = rows[0][0];
             } else {
                 user_login = false;
             }
             if(rows[1][0].c ==1){
                 account_num = true;
                 
             } else {
                 account_num = false;
             }
           if(!account_num) {

           return res.send({
                       message: "User doesn't exit",
                       error: true
                    });
        } else if (!user_login){
            return res.send({
                       message: 'Username or password is incorrect!',
                       error: true
                    });
        }

         else {
             res.json({ "account": account_num,"login_status":user_login,"status":"200","data":record,'access_token':jwtBearerToken});
        }

       })

    // })
   
})

module.exports = router;
