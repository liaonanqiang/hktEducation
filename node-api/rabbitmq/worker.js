var amqp = require('amqplib/callback_api');


function  worker(){  
this.publishAmqp = function(name,obj) {


 var queue = name;
           var data = JSON.stringify(obj);
      return amqp.connect('amqp://10.0.2.15', function(error0, connection) {
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

}

module.exports = worker;