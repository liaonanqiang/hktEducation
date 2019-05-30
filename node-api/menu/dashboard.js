var express = require('express');
var router = express.Router();
var rabbit = require('../rabbitmq/publish_amqp.js');
var amqp = require('amqplib/callback_api');
var encryption = require('../auth/encryption.js');
var authToken = require('../auth/authToken.js');
var db = require('../mysql/conn.js');
db = new db();
rabbit  = new rabbit();
authToken  = new authToken();
encryption = new encryption();
var param;
router.post('/', async function (req, res, next) {
	if(req.body.school_id){ 
	     var sql ="SELECT count(*) as student_num FROM hkt.tbl_student where school_id='"+req.body.school_id+"';";
	     sql += "SELECT count(*) as level1_num FROM hkt.tbl_student where current_level='1' and school_id='"+req.body.school_id+"';";
	     sql += "SELECT count(*) as level2_num FROM hkt.tbl_student where current_level='2' and school_id='"+req.body.school_id+"';";
	     sql += "SELECT count(*) as teacher_num FROM hkt.tbl_user where group_id='T' and school_id='"+req.body.school_id+"';";
     } else {
     	 var sql ="SELECT count(*) as student_num FROM hkt.tbl_student;";
	     sql += "SELECT count(*) as level1_num FROM hkt.tbl_student where current_level='1';";
	     sql += "SELECT count(*) as level2_num FROM hkt.tbl_student where current_level='2';";
	     sql += "SELECT count(*) as teacher_num FROM hkt.tbl_user where group_id='T';";
     }
     console.log(req.headers)
     if(req.headers.authorization){ 
	     let checkToken = await authToken.decodeToken(req.headers.authorization);
	    
	     if(!checkToken.name){
            
            try{ 
	     	db.con.query(sql, (err, rows) => {
                if (err) throw err;
                var student_num = rows[0][0].student_num;
                var level1_num = rows[1][0].level1_num;
                var level2_num = rows[2][0].level2_num;
                var teacher_num = rows[3][0].teacher_num;
                res.json({"student_num": student_num, "level1_num": level1_num, "level2_num": level2_num, "teacher_num": teacher_num,"error":false});
	     	}) } catch(e){
	     		res.json({"error":true,"status":410, "message": e})
	     	}
	     	
	     } else {
	     	res.json({"error":true,"message":checkToken.message,"status":403})
	     }
     }   else {

     	 res.json({"error":true,"message":"There is no jwt token.","status":400})
     }

})

module.exports = router;
