var express = require('express');
var router = express.Router();


router.get('/room', function(req, res) {
  res.render('room');
});


module.exports = router;
