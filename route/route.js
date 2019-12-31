var express = require('express');
var router = express.Router();
let middleware = require('../jwt/middleware');
var UserContoller = require('../controller/UserContoller');

// default route
router.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});

router.route('/login').post(UserContoller.login);
router.route('/users').post(middleware.checkToken,UserContoller.users);
router.route('/user/:id').post(middleware.checkToken,UserContoller.user);
router.route('/addUser').post(middleware.checkToken,UserContoller.addUser);
router.route('/updateUser').post(middleware.checkToken,UserContoller.updateUser);
router.route('/deleteUser').post(middleware.checkToken,UserContoller.deleteUser);
router.route('/fileupload').post(middleware.checkToken,UserContoller.fileupload);
//router.route('/user/:id').post(middleware.checkToken,UserContoller.user);

//export this router to use in our index.js
module.exports = router;