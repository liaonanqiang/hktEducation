var express = require('express');
var router = express.Router();
var db = require('../mysql/conn.js');
var rabbit = require('../rabbitmq/publish_amqp.js');
var amqp = require('amqplib/callback_api');
var record;
const querystring = require('querystring');
rabbit  = new rabbit();
db = new db(); 
var param;
router.post('/', function (req, res, next) {
    var data = req.body || '1';
    const publish_promise = rabbit.publishAmqp('search_name',data);
    const subscribe_promise = rabbit.subscribeAmqp('search_name');

     subscribe_promise.then((result) => { 
	    db.con.query('SELECT * FROM hkt.tbl_users_group;', (err, rows) => {
		    if (err) throw err;
		    record = JSON.stringify(rows[0]);
		    console.log('Data received from Db:\n');
		    console.log(record);
		    res.json({ "data": record,"status":"200"});
       });

    }).catch(err => {
    // cancelled
    });

   
});

module.exports = router;
