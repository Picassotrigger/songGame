// ----------------   THIS IS THE PRIMARY APPLICATION FILE   ----------------
// ----------------   Dependencies   ----------------
//var express = require('express');
//var app = express();
var server = require('http').Server(app);
var dataFile = require('./app/data/songFile.json');
var exphbs = require("express-handlebars");
var moment = require('moment');
//var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');



var app = require('express')();
var express = require("express");
var http = require('http').Server(app);
var io = require('socket.io')(http);



// Requiring our models for syncing
var db = require("./app/models");



// ----------------   Setup Handlebars   ----------------
app.engine("handlebars", exphbs({
    defaultLayout: 'main',
    layoutsDir: 'app/views/layouts/',
    partialsDir: 'app/views/partials/'
}));
app.set("view engine", "handlebars");


// ----------------   Setup port   ----------------
//app.set('port', process.env.PORT || 3000);
var PORT = process.env.PORT || 3000;

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
// app.use(require('./app/routes/songAPI'));


// ----------------   Setup bodyParser   ----------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));




// ----------------   EXPRESS HTTP SERVER   ----------------
/*var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});*/


http.listen(PORT, function() {
    console.log('listening on *:3000');
});



// // Syncing our sequelize models and then starting our Express app
// // =============================================================
// db.sequelize.sync({ force: false}).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });




// --------- Function to collect the game details and player details ----------


var gameCollection = new function() {

    this.totalGameCount = 0,
        this.gameList = []

};

var numUsers = 0;

// ----------------   SOCKET.IO SERVER   ----------------

//io.attach(server);

var nsp = io.of('/my');
nsp.on('connection', function(socket) {

    //io.on('connection', function(socket){
    console.log(socket.id);

    var addedUser = false;
    socket.on("new user", function(username) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;

        ++numUsers;
        addedUser = true;

        // echo globally (all clients) that a person has connected
        nsp.emit('user joined', {
            username: socket.username,
            numUsers: numUsers
        });
    });




    socket.on('joinGame', function() {

        console.log(socket.username + " wants to join a game");

        var alreadyInGame = false;

        for (var i = 0; i < gameCollection.totalGameCount; i++) {
            var plyr1Tmp = gameCollection.gameList[i]['gameObject']['playerOne'];
            var plyr2Tmp = gameCollection.gameList[i]['gameObject']['playerTwo'];
            var plyr3Tmp = gameCollection.gameList[i]['gameObject']['playerThree'];
            var plyr4Tmp = gameCollection.gameList[i]['gameObject']['playerFour'];
            var plyr5Tmp = gameCollection.gameList[i]['gameObject']['playerFive'];
            if (plyr1Tmp == socket.username || plyr2Tmp == socket.username || plyr3Tmp == socket.username || plyr4Tmp == socket.username || plyr5Tmp == socket.username) {
                alreadyInGame = true;

                console.log(socket.username + " already has a Game!");
                //Stay in that page
                socket.emit('alreadyJoined', {
                    gameId: gameCollection.gameList[i]['gameObject']['id']
                });

            }
        }
        if (alreadyInGame == false) {
            gameSeeker(socket);

        }
    });
    socket.on('disconnect', function() {
        console.log('User Disconnected');
    });
});


function buildGame(socket) {


    var gameObject = {};
    gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
    gameObject.playerOne = socket.username;
    gameObject.socketID = socket.id;
    //gameObject.playerTwo = null;
    gameCollection.totalGameCount++;
    gameCollection.gameList.push({
        gameObject
    });

    console.log("Game Created by " + socket.username + " w/ " + gameObject.id);
    //navigate to category page
    nsp.emit('gameCreated', {
        username: socket.username,
        gameId: gameObject.id
    });


};




function gameSeeker(socket) {
    //++loopLimit;
    if (gameCollection.totalGameCount == 0) {
        buildGame(socket);
        console.log(gameCollection.gameList);
        nsp.emit('joinone', {
            name: gameCollection.gameList[0]['gameObject']['playerOne']
        });
        //  loopLimit = 0;

    } else if (gameCollection.gameList[gameCollection.totalGameCount - 1]['gameObject']['playerFive'] == null) {
        //var i = Math.floor(Math.random() * gameCollection.totalGameCount);
        for (var i = 0; i < gameCollection.totalGameCount; i++) {
            if (gameCollection.gameList[i]['gameObject']['playerTwo'] == null) {
                gameCollection.gameList[i]['gameObject']['playerTwo'] = socket.username;

                console.log(gameCollection.gameList);
                nsp.emit('joinone', {
                    name: gameCollection.gameList[i]['gameObject']['playerOne']
                });
                nsp.emit('jointwo', {
                    name: gameCollection.gameList[i]['gameObject']['playerTwo']
                });

                console.log(socket.username + " has been added to: " + gameCollection.gameList[i]['gameObject']['id']);
                //navigate to game page
                break;
            } else if (gameCollection.gameList[i]['gameObject']['playerThree'] == null) {
                gameCollection.gameList[i]['gameObject']['playerThree'] = socket.username;

                console.log(gameCollection.gameList);
                nsp.emit('joinone', {
                    name: gameCollection.gameList[i]['gameObject']['playerOne']
                });
                nsp.emit('jointwo', {
                    name: gameCollection.gameList[i]['gameObject']['playerTwo']
                });
                nsp.emit('jointhree', {
                    name: gameCollection.gameList[i]['gameObject']['playerThree']
                });
                //navigate to game page
                console.log(socket.username + " has been added to: " + gameCollection.gameList[i]['gameObject']['id']);
                break;
            } else if (gameCollection.gameList[i]['gameObject']['playerFour'] == null) {
                gameCollection.gameList[i]['gameObject']['playerFour'] = socket.username;
                console.log(gameCollection.gameList);
                nsp.emit('joinone', {
                    name: gameCollection.gameList[i]['gameObject']['playerOne']
                });
                nsp.emit('jointwo', {
                    name: gameCollection.gameList[i]['gameObject']['playerTwo']
                });
                nsp.emit('jointhree', {
                    name: gameCollection.gameList[i]['gameObject']['playerThree']
                });
                nsp.emit('joinfour', {
                    name: gameCollection.gameList[i]['gameObject']['playerFour']
                });
                //navigate to game page

                console.log(socket.username + " has been added to: " + gameCollection.gameList[i]['gameObject']['id']);
                break;
            } else if (gameCollection.gameList[i]['gameObject']['playerFive'] == null) {
                gameCollection.gameList[i]['gameObject']['playerFive'] = socket.username;

                console.log(gameCollection.gameList);
                nsp.emit('joinone', {
                    name: gameCollection.gameList[i]['gameObject']['playerOne']
                });
                nsp.emit('jointwo', {
                    name: gameCollection.gameList[i]['gameObject']['playerTwo']
                });
                nsp.emit('jointhree', {
                    name: gameCollection.gameList[i]['gameObject']['playerThree']
                });
                nsp.emit('joinfour', {
                    name: gameCollection.gameList[i]['gameObject']['playerFour']
                });
                nsp.emit('joinfive', {
                    name: gameCollection.gameList[i]['gameObject']['playerFive']
                });
                //navigate to game page
                console.log(socket.username + " has been added to: " + gameCollection.gameList[i]['gameObject']['id']);
                break;
            }
        }
    } else {
        buildGame(socket);
        console.log(gameCollection.gameList);
        nsp.emit('joinone', {
            name: gameCollection.gameList[gameCollection.totalGameCount - 1]['gameObject']['playerOne']
        });
        //  loopLimit = 0;

    }
}
