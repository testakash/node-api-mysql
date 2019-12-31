var express = require('express');
var app = express();
const cors = require('cors');

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
})); 
 
app.use(cors());

var route = require('./route/route');
app.use('/', route);

// set port
app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});
 
module.exports = app;