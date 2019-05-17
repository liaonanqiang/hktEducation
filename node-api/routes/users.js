var express = require('express');
var router = express.Router();
var db = require('../mysql/conn.js');
/* GET users listing. */
var record;
router.get('/', function (req, res, next) {

  db.con.query('SELECT * FROM hkt.tbl_users_group;', (err, rows) => {
    if (err) throw err;
    record = JSON.stringify(rows[0]);
    console.log('Data received from Db:\n');
    console.log(record);

  });

    res.json({ "data": record});

  
});

module.exports = router;
