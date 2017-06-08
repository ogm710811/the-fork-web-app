const express    = require('express');
const router     = express.Router();
const bcrypt     = require('bcrypt');
const passport   = require('passport');
const User       = require("../models/user-model.js");
const ensure     = require('connect-ensure-login');

/* GET home page. */
router.get('/', 
  (req, res, next) => {
    console.log('\n');
    console.log('USER HOME PAGE ************************************');

    console.log('\n');
    console.log('SESSION (from express-session middleware)*****');
    console.log(req.session);

    console.log('\n');
    console.log('USER (from Passport middleware)***************');
    console.log(req.user); 
    console.log('\n');
    
    if (req.user) {
      //redirects to '/login' if you are NOT logged in
      ensure.ensureLoggedIn('/login');
      res.render('users/logged-in-home.ejs',
       { successMessage: req.flash('success') }
      );

    } else {
      res.render('index');
    }
  }
);

module.exports = router;
