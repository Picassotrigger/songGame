var express = require('express');
var router = express.Router();


router.get('/register', function(req, res) {
  res.render('register', {
    pageTitle: 'Register',
    pageId: 'register'
  });
});


module.exports = router;
