var amqp = require('amqplib/callback_api');
//var Q = require('q');
//var deferred = Q.defer();
function rabbit () {
	
	this.publishAmqp = function(name,obj) {
		 return new Promise(function (resolve, reject) {
			 setTimeout(resolve,500);
			 var queue = name;
	         var data = JSON.stringify(obj);
			 amqp.connect('amqp://10.0.2.15', function(error0, connection) {
				  if (error0) {
				    throw error0;
				  }
				  connection.createChannel(function(error1, channel) {
				    if (error1) {
				      throw error1;
				    }
				    channel.assertQueue(queue, {durable: true});
				    channel.sendToQueue(queue, Buffer.from(data));
				    console.log(" [x] Sent %s", data);
				  });
				});
	              resolve(JSON.parse(data));
		})

	}

	this.subscribeAmqp = function(name){
      return new Promise(function (resolve, reject) {
      	 setTimeout(resolve,500);
         var q = name;
         var data;
         amqp.connect('amqp://10.0.2.15', function (err, conn) {
		    conn.createChannel(function (error, ch) {		    
		    //receiver
		      ch.assertQueue(q, { durable: true });
		      ch.consume(q, function (msg) {
		      data = msg.content.toString();
		      console.log(" [x] %s", msg.content.toString());
            if (error) {
                reject(error);
            } else {
                // resolve(JSON.parse(msg.content.toString()));
                resolve(msg.content.toString());
            }

		    }, { noAck: true });

		  });
		});

 })

	}

}

module.exports = rabbit;