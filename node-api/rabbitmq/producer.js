
var amqp = require("amqp");
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
var conn = amqp.createConnection(connOptions); //connect torabbitmq


conn.on("ready",function(){

    console.log("ready");
    connection.queue('testQueue', { durable: true, autoDelete: false }, function (queue) {
			connection.publish('testQueue', 'this is message is testing ......'); 
			res.send('send');
		}); 

}); 

