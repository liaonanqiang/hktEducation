var express = require('express');
var router = express.Router();
var db = require('../mysql/conn.js');
var rabbit = require('../rabbitmq/publish_amqp.js');
var amqp = require('amqplib/callback_api');
var encryption = require('../auth/encryption.js');
var record;
const querystring = require('querystring');
rabbit  = new rabbit();
encryption = new encryption();
db = new db(); 
var param;
router.post('/', function (req, res, next) {
    var data = req.body || '1';
    var user_login;
    var account_num;
    const publish_promise = rabbit.publishAmqp('login',data);
    const subscribe_promise = rabbit.subscribeAmqp('login');

     subscribe_promise.then((result) => { 

     	var params = JSON.parse(result);
     	// var psw = encryption.decrypt(params.password);
     	var psw = encryption.encrypt(params.password);
     	var sql = "SELECT count(*) as c FROM hkt.tbl_user where name='"+params.username+"' and pwd='"+psw+"' and active='1';";
     	sql += "SELECT count(*) as c FROM hkt.tbl_user where name='"+params.username+"' and active='1'";
       console.log(sql)
	    db.con.query(sql, (err, rows) => {
		    if (err) throw err;
		     // record = JSON.stringify(rows[0]);
		      record = rows[0];
             if(rows[0][0].c ==1){
                 user_login = true;
	         } else {
	         	 user_login = false;
	         }
		     if(rows[1][0].c ==1){
                 account_num = true;
	         } else {
	         	 account_num = false;
	         }
        res.json({ "account": account_num,"login_status":user_login,"status":"200"});
		   
       })

    }).catch(err => {
    // cancelled
    res.json({ "error": err});
    });

   
});

module.exports = router;
