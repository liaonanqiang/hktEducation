var amqp = require('amqplib/callback_api');
//var Q = require('q');
//var deferred = Q.defer();
function rabbit () {
	
	this.publishAmqp = function(name,obj) {

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

	}   
	this.subscribeAmqp = function(name){
      	 
         var q = name;
         var data;
         do {


         amqp.connect('amqp://10.0.2.15', function (err, conn) {
		    conn.createChannel(function (error, ch) {		    
		    //receiver
		      ch.assertQueue(q, { durable: true });
		      ch.consume(q, function (msg) {
		      data = msg.content.toString();
		      console.log(" [x] %s", msg.content.toString());

		    }, { noAck: true });

		  });
		});
         
         if(data) {
         	return data;
         }
         } while (data);

           
	}


 //    this.subscribeAmqp = async function(name,callback){

      	 
 //         var q = name;
 //         var data;
 //         amqp.connect('amqp://10.0.2.15', function (err, conn) {
	// 	    conn.createChannel(function (error, ch) {		    
	// 	    //receiver
	// 	      ch.assertQueue(q, { durable: true });
	// 	      ch.consume(q, function (msg) {
	// 	      data = msg.content.toString();
	// 	      console.log(" [x] %s", msg.content.toString());
	// 	      if(callback)
 //              return callback(data);

	// 	    }, { noAck: true });
 //                  // if(callback)   

	// 	  });

 // })      
	// }


	// this.subscribeAmqp = function(name){
 //      return new Promise(function (resolve, reject) {
      	 
 //         var q = name;
 //         var data;
 //         amqp.connect('amqp://10.0.2.15', function (err, conn) {
	// 	    conn.createChannel(function (error, ch) {		    
	// 	    //receiver
	// 	      ch.assertQueue(q, { durable: true });
	// 	      ch.consume(q, function (msg) {
	// 	      data = msg.content.toString();
	// 	      console.log(" [x] %s", msg.content.toString());

 //            if (error) {
 //                reject(error);
 //            } else {
 //                resolve(msg.content.toString());

 //            }

	// 	    }, { noAck: true });

	// 	  });
	// 	});
 //         setTimeout(resolve,1000);



 // })
           
	// }


}

module.exports = rabbit;