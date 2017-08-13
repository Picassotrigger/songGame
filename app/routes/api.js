var express = require('express');
var router = express.Router();
var songData = require('../data/songFile.json');


router.get('/api', function(req, res) {
  res.json(songData);
});

router.get('/api/:songId', function(req, res) {
  var chosen = req.params.songId;

  res.json(songData.songs[chosen]);
});


module.exports = router;
