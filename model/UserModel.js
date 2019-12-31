let db = require('../config/dbconfig');
var crypto = require('crypto');
var User = function(user){
    // this.id = user.id;
    // this.name = user.name;    
};

User.loginModel = function (user,result) {  

    var password = crypto.createHash('md5').update(user.password).digest('hex');

     var query =   db.query("SELECT * FROM users WHERE email='"+user.email+"' AND password='"+password+"' limit 1", function (err, res) {
            //console.log(query.sql);
             if(err) {
                    console.log("error: ", err);
                    result(err,res);
                }
                else{
                  console.log(res); 
                  result(err, res);
                }
        });
};

User.usersModel = function (result) {
        db.query("Select * from users", function (err, res) {

                if(err) {
                    result(err,res);
                }
                else{
                  result(err, res);
                }
            });   
};

User.userModel = function (id,result) {
        db.query("SELECT * FROM users where id="+id, function (err, res) {
                if(err) {
                    result(err,res);
                }
                else{
                 result(err, res);                   
                }
            });   
};

User.addUserModel = function (user,result) {
    var password = crypto.createHash('md5').update(user.password).digest('hex'); 
    db.query("INSERT INTO users(name,email,password) VALUES('"+user.name+"','"+user.email+"','"+password+"')", function (err, res) {
         if(err) {

                    result(err,res);
                }
                else{
                  
                  result(err, res);
                }
    });  
};


User.updateUserModel = function (user,result) {

    db.query("UPDATE users SET name = '"+user.name+"',email= '"+user.email+"' WHERE id ="+user.id, function (err, res) {
            if(err) {

                    result(err,res);
                }
                else{
                  
                  result(err, res);
                }
    });  
};

User.deleteUserModel = function (user_id,result) {

    db.query("DELETE FROM users WHERE id ="+user_id, function (err, res) {
            if(err) {

                    result(err,res);
                }
                else{
                  
                  result(err, res);
                }
    });  
};



module.exports= User;