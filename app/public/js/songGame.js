//---------------------   CAPTURING USER CHOICES   ---------------------//
var roomChosen = 0;
var catChosen = 0;
var songChosen = 0;

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
