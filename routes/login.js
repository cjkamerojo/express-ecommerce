const express = require('express');
const router = express.Router();
const { User } = require('../models');

//Redirect the user if already logged in:
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
}

router.get('/', requireLogin, function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && user.validatePassword(password)) {
      // Password is valid, proceed with login logic
      req.session.userId = user.id;
      res.redirect('/home');
    } else {
      // Password is invalid, send an error response
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/logout', function(req, res, next) {
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
