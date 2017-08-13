var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var songData = require('../data/songFile.json');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));



router.get('/api', function(req, res) {
  res.json(songData);
});



router.get('/api/:songId', function(req, res) {
  var chosen = req.params.songId;

  res.json(songData.songs[chosen]);
});



module.exports = router;
