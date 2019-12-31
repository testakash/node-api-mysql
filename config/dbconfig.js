var mysql = require('mysql'); 

// connection configurations
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice'
});
  
// connect to database
db.connect();

//Exported the database connection to be imported at the server
module.exports = db;