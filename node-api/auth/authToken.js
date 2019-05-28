 var jwt = require('jsonwebtoken');

 function authToken () {

 this.getToken = function(username,psw){  

 var jwtBearerToken = jwt.sign({
          psw: psw,
          user: username
        }, 'secret', { expiresIn: '1h' });

    return jwtBearerToken;
    }

 }

 module.exports = authToken;