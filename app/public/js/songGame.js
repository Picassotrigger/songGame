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
