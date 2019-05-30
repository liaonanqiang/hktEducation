var express = require('express');
var router = express.Router();
var rabbit = require('../rabbitmq/publish_amqp.js');
var amqp = require('amqplib/callback_api');
var record;
const querystring = require('querystring');
rabbit  = new rabbit();
var param;
router.get('/', function (req, res, next) {
    var data = req.body || '1';
 
	    db.con.query('SELECT * FROM hkt.tbl_users_group;', (err, rows) => {
		    if (err) throw err;
		    record = JSON.stringify(rows[0]);
		    console.log('Data received from Db:\n');
		    console.log(record);
		    res.json({ "data": record,"status":"200"});
       });

    })


module.exports = router;
