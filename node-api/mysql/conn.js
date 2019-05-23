
const mysql = require('mysql');


var db_config = {
  host: '192.168.56.1',
  port: '3307',
  user: 'hktuser',
  password: 'roota',
  multipleStatements: true
};
//  this.con = mysql.createConnection({
//   host: '192.168.56.1',
//   port: '3307',
//   user: 'hktuser',
//   password: 'roota',
// });

// this.con.connect((err) => {
//   if (err) {
//     console.log('Error connecting to Db');
//     console.log(err)
//     return;
//   }
//   console.log('Connection established');
// });

// function connect(){ 
// function handleDisconnect() {
//   var con;
//   con = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   con.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     } 
//     console.log('Connection established');                             // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   con.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//       throw err;                                  // server variable configures this)
//     }
//   });
// }

// handleDisconnect();

// }
// module.exports = connect;

function db() { 
      this.con;
    this.handleDisconnect = function() { 
            this.con = mysql.createConnection(db_config); // Recreate the connection, since
                                                      // the old one cannot be reused.

       this.con.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        } 
        console.log('Connection established');                             // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
       this.con.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    }; 
    this.handleDisconnect();
    
}; 
module.exports = db;