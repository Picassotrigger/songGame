var express = require('express');
var router = express.Router();


router.get('/songs', function(req, res) {

  var info = '';
  var dataFile = req.app.get('appData');
  dataFile.songs.forEach(function(item) {
    info += `
    <li>
      <h2>${item.title}</h2>
      <p>${item.artist}</p>
    </li>
    `;
  });
  res.send(`
    <h1>Song List</h1>
    ${info}
    `);
});


router.get('/songs/:songid', function(req, res) {

  var dataFile = req.app.get('appData');
  var song = dataFile.songs[req.params.songid];

  res.send(`
    <h1>${song.title}</h1>
    <h2>${song.artist}</h2>
    `);
});


module.exports = router;
