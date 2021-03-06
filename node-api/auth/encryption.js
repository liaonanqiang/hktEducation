// Part of https://github.com/chris-rock/node-crypto-examples

// Nodejs encryption with CTR
const crypto = require('crypto');
var key = 'hktEducation-findsolution-secret';
// var plaintext = 'Text to be encrypted'
var cipher = crypto.createCipher('aes-256-cbc', key, "");
var decipher = crypto.createDecipher('aes-256-cbc', key, "");

function encryption() {
   // var algorithm = 'aes-256-ctr';
   // var authKey = 'hkt-findsolution',

this.encrypt=function(password){
  var encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
}
 
this.decrypt = function(password){

  try{  
  decipher.setAutoPadding(false);
  var decryptedPassword = decipher.update(password, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;

  } catch(error) {
  return error;
  }
}

 
 }

 module.exports = encryption;