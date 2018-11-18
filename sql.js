var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


var a = function connect () {
	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "yourusername",
	  password: "yourpassword",
	  database: "mydb"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");

	  var sql = "INSERT INTO Users (user_id, user_name) VALUES (encrypt(@username), @username)";
	  con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	  });
	});
};

module.exports.a = a;


// var sql = require("./sql");
// sql.a();