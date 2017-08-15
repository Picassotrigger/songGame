//---------------------   CAPTURING USER CHOICES   ---------------------//
var roomChosen = 0;
var catChosen = 0;
var songChosen = 0;
var sock=io.connect("/my");
function roomChoice() {
  roomChosen = $(this).attr("value");
  console.log("roomChosen: " + roomChosen);
}

function catChoice() {
  catChosen = $(this).attr("value");
  console.log("catChosen: " + catChosen);
}

function songChoice() {
  songChosen = $(this).attr("value");
  console.log("songChosen: " + songChosen);
}





// Choosing room
$("#room1").on('click', roomChoice);
  
$("#room2").on('click', roomChoice);


//Choosing category
$("#cat1").on('click', catChoice);

$("#cat2").on('click', catChoice);

$("#cat3").on('click', catChoice);

$("#cat4").on('click', catChoice);



//Choosing song
$("#song1").on('click', songChoice);

$("#song2").on('click', songChoice);

$("#song3").on('click', songChoice);

$("#song4").on('click', songChoice);




//---------------------   CLOCK OBJECT   ---------------------//
// TODO Need to add the restart logic to the count method.

var intervalId;
var clockRunning = false;

var stopwatch = {

//  time: 30,
  lap: 1,

  reset: function() {
    time = 0;
    $("#game-clock").html("00:00");
  },

  start: function() {
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },

  count: function() {
    if(time > 0) {
       time--;
    }
    else {
    // TODO Need restart logic in here


        time = 30;
    }

    var converted = stopwatch.timeConverter(time);

    $("#game-clock").html(converted);
  },

  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};


////////////HIDE and SHOW\\\\\\\\\\\\\\\\
  //Navbar
$("#loginButton").on("click", function(){
  $("#index").hide(1000);
  $("#register").hide(1000);
  $("#chat").hide(1000);
  $("#category").hide(1000);
  $("#game").hide(1000);
  $("#room").hide(1000);
  $("#login").show(1500);
});

$("#registerButton").on("click", function(){
  $("#index").hide(1000);
  $("#login").hide(1000);
  $("#chat").hide(1000);
  $("#category").hide(1000);
  $("#game").hide(1000);
  $("#room").hide(1000);
  $("#register").show(1500);
});

$("#chatButton").on("click", function(){
  $("#index").hide(1000);
  $("#login").hide(1000);
  $("#register").hide(1000);
  $("#category").hide(1000);
  $("#game").hide(1000);
  $("#room").hide(1000);
  $("#chat").show(1500);
});

//login page
$("#loginSubmit").on("click",function(e){

e.preventDefault();
  var username=$("#username").val().trim();
   console.log(username);
  //var password=$("#password").val().trim();  

  sock.emit("new user",username);
  $("#login").hide(1000);
  $("#room").show(1500);

});


sock.on("addPlayer",function(data){
  console.log("data/Songame.js " + data.username);
  //$("#players").html('<div class="col s2"><i class="medium material-icons">check_box_outline_blank</i>'+data.username+'</div>');
  $("#players").html("<h4>" + data.username+ "</h4>");
  
});

sock.on("user joined",function(data){
console.log('Joining the following game: ' +data.username+" "+data.numUsers);

});
////room page
    //play




$("#play").on("click", function(){
  $("#room").hide(1000);
  $("#game").show(1500);
joinGame();
});

function joinGame(){
sock.emit('joinGame');
};

sock.on('joinone', function (data) {
console.log('Joining the following game: ' + data.name);
  //$("#players").remove();
var p= $("#player1").html("<h4>" + data.name + "</h4>");

$("#players").append(p);
});

sock.on('jointwo', function (data) {
console.log('Joining the following game: ' + data.name);
  //$("#players").remove();
var p= $("#player2").html("<h4>" + data.name + "</h4>");

$("#players").append(p);
});

sock.on('jointhree', function (data) {
console.log('Joining the following game: ' + data.name);
  //$("#players").remove();
var p= $("#player3").html("<h4>" + data.name + "</h4>");

$("#players").append(p);
});

sock.on('joinfour', function (data) {
console.log('Joining the following game: ' + data.name);
  //$("#players").remove();
var p= $("#player4").html("<h4>" + data.name + "</h4>");

$("#players").append(p);
});

sock.on('joinfive', function (data) {
console.log('Joining the following game: ' + data.name);
  //$("#players").remove();
var p= $("#player5").html("<h4>" + data.name + "</h4>");

$("#players").append(p);
});


//Response from Server on existing User found in a game
sock.on('alreadyJoined', function (data) {
console.log('You are already in an Existing Game: ' + data.gameId);
});

sock.on("roomObject", function(data){
  console.log(data);

})

//     //multiplayer
// $("#room2").on("click", function(){
//   $("#room").hide(1000);
//   $("#game").show(1500);
// ///////Need logic code added --if player is first in room, show categories. If game has already started show game.
// })

