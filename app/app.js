// This is the primary application file

var express = require('express');
var app = express();
var dataFile = require('./data/data.json');
var exphbs = require("express-handlebars");
var path = require('path');



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
app.use(require('./routes/category'));
app.use(require('./routes/game'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/register'));
app.use(require('./routes/room'));
app.use(require('./routes/songs'));





var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
