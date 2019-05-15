var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var app = express();

var config = require('./.env');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let reporter = function (type, ...rest) {
  // remote reporter logic goes here
};

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  console.error(err.stack);

  reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

  process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise) {
  console.error('unhandled rejection:', reason.message || reason);

  reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})

app.use('/api', users);

console.log('port', config.SERVER_PORT)

//app.listen(3000, () => {
//   console.log('connected')
//})

module.exports = app;
