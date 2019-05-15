
const mysql = require('mysql');
 this.con = mysql.createConnection({
  host: '192.168.56.1',
  port: '3306',
  user: 'hktuser',
  password: 'roota',
});

this.con.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
   // console.log(err);
    return;
  }
  console.log('Connection established');
});



