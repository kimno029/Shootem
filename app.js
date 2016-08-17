var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var port = 8001;
// Extensions
// 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// MIDDLEWARE
app.use(bodyParser()); // parse requests
app.use('/js/',express.static(path.join(__dirname, 'js')));
app.use('/css/',express.static(path.join(__dirname, 'css')));
app.use('/img/',express.static(path.join(__dirname, 'img')));
app.use('/bower_components/',express.static(path.join(__dirname, 'bower_components')));
// ROUTING
var index_router = require('./index_router');
app.use(index_router);


app.listen(port, function (){
	console.log("Ready on port: " + port);
});