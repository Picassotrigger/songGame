var express = require('express');
var router = express.Router();


router.get('/room', function(req, res) {
  res.render('room', {
    pageTitle: 'Room',
    pageId: 'room'
  });
});


module.exports = router;
