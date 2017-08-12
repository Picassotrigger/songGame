var express = require('express');
var router = express.Router();


router.get('/category', function(req, res) {
  res.render('category');
});


module.exports = router;
