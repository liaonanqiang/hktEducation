var amqp = require('amqplib/callback_api');
var eventEmitter = require('events');
class MyEmitter extends eventEmitter {}
const myEmitter = new MyEmitter();
function  receiver(){  
this.subscribeAmqp = function(name) {

   var q = name;
         var data;
         amqp.connect('amqp://10.0.2.15', function (err, conn) {
        conn.createChannel(function (error, ch) {       
        //receiver
          ch.assertQueue(q, { durable: true });
          ch.consume(q, function (msg,callback) {
          data = msg.content.toString();
          console.log(" [x] %s", msg.content.toString());
            callback(data);
            return callback();
         // myEmitter.emit('name', msg.content.toString())
          // return data;
            // if (error) {
            //     reject(error);
            // } else {
            //     // resolve(JSON.parse(msg.content.toString()));
            //     resolve(msg.content.toString());
            //     setTimeout(resolve,500);
            // }

        }, { noAck: true });

    });

     })


}

}

module.exports = receiver;