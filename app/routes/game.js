var express = require('express');
var router = express.Router();



router.get('/game', function(req, res) {

  var dataFile = req.app.get('appData');

  function randomSong() {
    var result = Math.floor(Math.random() * 8) + 1;
    return result;
  }


  var song1 = randomSong();
  var song2 = randomSong();
  var song3 = randomSong();
  var song4 = randomSong();


  res.render('game', {
    pageTitle: 'Game',
    pageId: 'game',
    song1: dataFile.songs[song1].title + "    by    " + dataFile.songs[song1].artist,
    song2: dataFile.songs[song2].title + "    by    " + dataFile.songs[song2].artist,
    song3: dataFile.songs[song3].title + "    by    " + dataFile.songs[song3].artist,
    song4: dataFile.songs[song4].title + "    by    " + dataFile.songs[song4].artist
  });


});


module.exports = router;
