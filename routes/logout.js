const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.get('/', function(req, res, next) {
    if (req.session) {
      // Clear the session data
      req.session.destroy(function(err) {
        if(err) {
          console.error(err);
        } else {
          // Redirect the user to the login page
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  });

  module.exports = router;