var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', {
    title: 'This is a title'
  });
});


module.exports = router;
