const express     = require('express');
const passport    = require('passport');
const ensure      = require('connect-ensure-login');
const User        = require('../models/user-model.js');
const bcrypt      = require('bcrypt');
const authRouter  = express.Router();

/********************************************************/
// GET && POST signup page. 
/********************************************************/
authRouter.get('/signup', 
  ensure.ensureNotLoggedIn('/'),

  (req, res, next) => {
    res.render('authentication/signup-view.ejs');
  }
);

authRouter.post('/signup', 
  ensure.ensureNotLoggedIn('/'),

  (req, res, next) => { 
    const fullName = req.body.signupFullName;
    const username = req.body.signupUsername;
    const password = req.body.signupPassword;
    console.log('*************** SIGNUP PAGE **********************');
    console.log(`username -> ${fullName}`);
    console.log(`username -> ${username}`);
    console.log(`password -> ${password}`);

    // Don't let users submit blank usernames or passwords
    if (fullName === '' || username === '' || password === '') {
      res.render('authentication/signup-view.ejs', {
        errorMessage: 'Please provide your credentials.'
      });
      return;
    }

    //check if username already exists
    User.findOne(
      { username : username },
      { username : 1 },
      ( err, foundUser ) => {
        if (err) {
          next(err);
          return;
        }

        if (foundUser) {
          res.render('authentication/signup-view.ejs',
            { errorMessage: 'User not Available, Try again' ,
              errorMessageLogin: ''
          });
          return;
        }

        // from here.. we are good to set the user
        const salt          =  bcrypt.genSaltSync(10);
        const hashPassword  =  bcrypt.hashSync(password, salt);

        // new user
        const theUser = new User({
            fullName          : fullName,
            username          : username,
            encryptedPassword : hashPassword
        });
        console.log('*************** SIGNUP PAGE the user  **********************');
        console.log(theUser.fullName);
        console.log(theUser.username);
        console.log(theUser.encryptedPassword);
        
        // save new user
        theUser.save((err) => {
          if (err) {
            next(err);
            return;
          }
          // Store a message in the box to display after the redirect
          req.flash( 'success', 'You have registered successfully!'
          );

          // Redirect to home page if save is successful
          res.redirect('/');
        });
      });
  }
);

/********************************************************/
// GET && POST login page. 
/********************************************************/

authRouter.get("/login", 
  ensure.ensureNotLoggedIn('/'),

  (req, res, next) => {
    res.render("authentication/login-view.ejs", 
      { errorMessage: req.flash('error') }
    );
});

authRouter.post('/login',
  ensure.ensureNotLoggedIn('/'),

  passport.authenticate("local",
    {
      successRedirect : '/',
      successFlash    : true,
      failureRedirect : '/login',
      failureFlash    : true,
    }
  )  
);

/********************************************************/
// Log Out Action. 
/********************************************************/
authRouter.get('/logout', (req, res, next) => {
  // req.logout() method is provided by passport
  req.logout();
  req.flash('success', 'You have logged out successful');
  res.redirect('/');
});




module.exports = authRouter;