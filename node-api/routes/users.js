var express = require('express');
var router = express.Router();
var db = require('../mysql/conn.js');
var amqp = require('amqplib/callback_api');
var record;
const querystring = require('querystring');

db = new db(); 
router.post('/', function (req, res, next) {

     amqp.connect('amqp://10.0.2.15', function(error0, connection) {
	  if (error0) {
	    throw error0;
	  }
	  connection.createChannel(function(error1, channel) {
	    if (error1) {
	      throw error1;
	    }
	    var queue = 'testQueue';
	      var data = req.body.length != undefined ?  req.body : '1';
	    //let data = querystring.parse(query);
	    console.log('query param...............')
	    console.log(req.body)
	    console.log(data)
	  
	    channel.assertQueue(queue, {durable: true});

	    channel.sendToQueue(queue, Buffer.from(data));
	    console.log(" [x] Sent %s", record);
	  });
	});



  db.con.query('SELECT * FROM hkt.tbl_users_group;', (err, rows) => {
    if (err) throw err;
    console.log(rows)
    record = JSON.stringify(rows[0]);
    console.log('Data received from Db:\n');
    console.log(record);



	  amqp.connect('amqp://10.0.2.15', function (err, conn) {
	  conn.createChannel(function (err, ch) {
	    var q = 'testQueue';
	    //receiver
	    ch.assertQueue(q, { durable: true });
	    //receiver
	    ch.consume(q, function (msg) {
	      console.log(" [x] %s", msg.content.toString());
	    }, { noAck: true });
	  });
	});


    res.json({ "data": record});


  });


	

  
});

module.exports = router;
