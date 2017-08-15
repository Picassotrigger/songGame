// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the songs
  app.get("/api/songs", function(req, res) {

    db.songs.findAll({}).then(function(dbSongs) {

      res.json(dbSongs);
    });
  });
};
