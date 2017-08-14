// ----------------   THIS IS THE PRIMARY APPLICATION FILE   ----------------

// ----------------   Dependencies   ----------------
var express = require('express');
var app = express();
var server = require('http').Server(app);
var dataFile = require('./app/data/songFile.json');
var exphbs = require("express-handlebars");
var moment = require('moment');
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');


// ----------------   Setup Handlebars   ----------------
app.engine("handlebars", exphbs({
  defaultLayout  : 'main',
  layoutsDir     : 'app/views/layouts/',
  partialsDir    : 'app/views/partials/'
}));
app.set("view engine", "handlebars");


// ----------------   Setup port   ----------------
app.set('port', process.env.PORT || 3000);


// ----------------   Setup song file at app/data/songFile   ----------------
app.set('appData', dataFile);


// ----------------   Setup default views folder   ----------------
app.set('views', 'app/views');


// ----------------   Setup public folder   ----------------
app.use(express.static('app/public'));


// ----------------   Setup routes   ----------------
app.use(require('./app/routes/api'));
app.use(require('./app/routes/category'));
app.use(require('./app/routes/chat'));
app.use(require('./app/routes/game'));
app.use(require('./app/routes/index'));
app.use(require('./app/routes/login'));
app.use(require('./app/routes/register'));
app.use(require('./app/routes/room'));


// ----------------   Setup bodyParser   ----------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




// ----------------   EXPRESS HTTP SERVER   ----------------
var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});



// ----------------   SOCKET.IO SERVER   ----------------
io.attach(server);

io.on('connection', function(socket) {
  console.log('User Connected' + "......" + socket.id);

  // ----------------   Listens for messages that have been posted and resends them to all users  ----------------
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });

  socket.on('disconnect', function() {
    console.log('User Disconnected');
  });
});
