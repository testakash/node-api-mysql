
User = require('../model/UserModel');
let jwt = require('jsonwebtoken');
let config = require('../config/config');
const multer = require('multer');



// File upload settings  
const PATH = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({
  storage: storage
});

exports.fileupload = function (req, res) {
   
  if (!req.body) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
};


exports.login = function (req, res) {

    let user = req.body;  
   console.log(user);
    var username=user.email;  
    if (!user) {
    return res.status(400).send({ error:true, message: 'Please provide details' });
    }

    User.loginModel(user,function (err,results) {
	 if(typeof results !== 'undefined' && results.length > 0) {
            let token = jwt.sign({username: username},
                                  config.secret,
                                  { expiresIn: '24h' // expires in 24 hours
                                  }
                                );
             return res.send({ error: false, data: results, message:'Login successfully.',token:token});
            }
         return res.send({ error: true, data: results, message:'Please enter valid Login details.'});

        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users list.'});
       
    });
};

exports.users = function (req, res) {
	
    User.usersModel(function (err, results) {
        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users list.'});
       
    });
};

exports.user = function (req, res) {

	let id = req.params.id;  
    if (!id) {
        return res.status(400).send({ error: true, message: 'Please provide id' });
    }
    User.userModel(id,function (err, results) {
        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users details.'});
       
    });
};


exports.addUser = function (req, res) {

   let user = req.body;  
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    User.addUserModel(user,function (err, results) {
        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users details inserted successfully.'});
       
    });
};

exports.updateUser = function (req, res) {

   let user = req.body; 
   var user_id = user.id
     if (!user_id || !user) {
         return res.status(400).send({ error: true, message: 'Please provide user and user id' });
    }
    User.updateUserModel(user,function (err, results) {
        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users details updated successfully.'});
       
    });
};

exports.deleteUser = function (req, res) {

     let user_id = req.body.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
    }
    User.deleteUserModel(user_id,function (err, results) {
        if (err) {
            res.json({error:true,message: err});
        }
        res.json({ error: false, data: results, message: 'users details deleted successfully.'});
       
    });
};









