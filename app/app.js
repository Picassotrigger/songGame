// This is the primary application file

var express = require('express');
var app = express();
var dataFile = require('./data/songFile.json');
var exphbs = require("express-handlebars");
var path = require('path');
var moment = require('moment');
var io = require('socket.io')();
var bodyParser = require('body-parser');
var fs = require('fs');




app.engine("handlebars", exphbs({
  defaultLayout  : 'main',
  layoutsDir     : 'app/views/layouts/',
  partialsDir    : 'app/views/partials/'
}));
app.set("view engine", "handlebars");


app.set('port', process.env.PORT || 3000);
app.set('appData', dataFile);
app.set('views', 'app/views');


app.use(express.static('app/public'));
app.use(require('./routes/api'));
app.use(require('./routes/category'));
app.use(require('./routes/game'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/room'));
app.use(require('./routes/songs'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));





var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});


io.attach(server);

io.on('connection', function(socket) {
  console.log('User Connected');

  socket.on('disconnected', function() {
    console.log('User Disconnected');
  });
});
