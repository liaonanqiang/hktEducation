 var jwt = require('jsonwebtoken');

 function authToken () {

	 this.getToken = function(username,psw){  

	    var jwtBearerToken = jwt.sign({
	          psw: psw,
	          user: username
	        }, 'hktEducation-fs', { expiresIn: '3h' });

	    return jwtBearerToken;
	  }

	 this.decodeToken = function(token){
	 	 return new Promise(function (resolve, reject) {
	 	token = token.slice(7, token.length);
        jwt.verify(token, 'hktEducation-fs', function(err, decoded) {
			  if (err) {
                  console.log(err);
                  resolve(err);
			  } else {
			  	  resolve(true);
			  }
			  
		});
      })
	 }

 }

 module.exports = authToken;

