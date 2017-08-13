var express = require('express');
var router = express.Router();
var songData = require('../data/songFile.json');


router.get('/api', function(req, res) {
  res.json(songData);
});


module.exports = router;
