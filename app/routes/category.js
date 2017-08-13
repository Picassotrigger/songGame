var express = require('express');
var router = express.Router();


router.get('/category', function(req, res) {

  res.render('category', {
    pageTitle: 'Category',
    pageId: 'category'
  });

});


module.exports = router;
