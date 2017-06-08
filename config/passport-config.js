const passport          = require('passport');
const flash             = require('connect-flash');
const User              = require('../models/user-model');
const bcrypt            = require('bcrypt');
const LocalStrategy     = require('passport-local').Strategy;


//******************************************************
// passport User serialize middleware here ......
//******************************************************
passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

//******************************************************
// passport User deserialize middleware here ......
//******************************************************
passport.deserializeUser((userId, cb) => {
  // query the database with the user id
  User.findById(userId, (err, theUser) => {
    if (err) {
      cb(err);
      return;
    }
    // sending the user's info to passport
    cb(null, theUser);
  });
});

//******************************************************
// passport LOCAL login strategy
//******************************************************
passport.use( new LocalStrategy (
  // 1st arg -> options to customize LocalStrategy
  {
      // <input type="text" name="loginUsername">
    usernameField: 'loginUsername',
      // <input type="password" name="loginPassword">
    passwordField: 'loginPassword'
  },
  // 2nd arg -> callback for the logic that validates the login
  (loginUsername, loginPassword, next) => {
    User.findOne(
      { username : loginUsername },

      (err, theUser) => {
        // Tell Passport if there was an error (nothing we can do)
        if (err) {
          next(err);
          return;
        }
        // Tell Passport if there is no user with given username
        if (!theUser) {
          next(null, false, { message: 'There was a problem, We cannot find that username' });
          return;  
        }
        // Tell Passport if the passwords don't match
        if (!bcrypt.compareSync(loginPassword, theUser.encryptedPassword)) {
          next(null, false, { message: 'There was a problem, your password is incorrect' });
          return;
        }
        // Give Passport the user's details (SUCCESS!)
        next(null, theUser, {
          // message -> req.flash('success')
          message: `Login successful.`
        });
      }     
    );
  }
));