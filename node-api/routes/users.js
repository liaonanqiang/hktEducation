var express = require('express');
var router = express.Router();
var db = require('../mysql/conn.js');

// var amqp = require("amqp");
var amqp = require('amqplib/callback_api');
var connOptions = {
    host: "10.0.2.15"
    , port: 15672
    , login: "root"
    , password: "roota"
    , authMechanism: "AMQPLAIN"
    , vhost: "/"
    , ssl: {
    enabled : false
    }
}
// var conn = amqp.createConnection(connOptions); //connect torabbitmq

/* GET users listing. */
var record;
router.get('/', function (req, res, next) {

  db.con.query('SELECT * FROM hkt.tbl_users_group;', (err, rows) => {
    if (err) throw err;
    console.log(rows)
    record = JSON.stringify(rows[0]);
    console.log('Data received from Db:\n');
    console.log(record);

	  amqp.connect('amqp://10.0.2.15', function(error0, connection) {
	  if (error0) {
	    throw error0;
	  }
	  connection.createChannel(function(error1, channel) {
	    if (error1) {
	      throw error1;
	    }
	    var queue = 'testQueue';
	    channel.assertQueue(queue, {durable: true});

	    channel.sendToQueue(queue, Buffer.from(record));
	    console.log(" [x] Sent %s", record);
	  });
	});

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
