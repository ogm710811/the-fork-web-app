const express           = require('express');
const path              = require('path');
const favicon           = require('serve-favicon');
const logger            = require('morgan');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const layouts           = require('express-ejs-layouts');
const mongoose          = require('mongoose');
const session           = require('express-session');
const passport          = require('passport');
const flash             = require('connect-flash');
const User              = require('./models/user-model');
const bcrypt            = require('bcrypt');
const LocalStrategy     = require('passport-local').Strategy;

require("jquery/package.json"); // jquery is a peer dependency. 
require("bootstrap/package.json"); // bootstrap is a peer dependency.
require('dotenv').config();

//******************************************************
// require the code contained in passport-config
//******************************************************
require('./config/passport-config.js');

//******************************************************
// set DB connection string to use the value we have 
// in the environment variable:
//******************************************************
// mongoose.connect('mongodb://localhost/dev_recipe');
mongoose.connect(process.env.MONGODB_URI);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

//******************************************************
// session middleware here ......
//******************************************************

app.use( session({
  secret            :  'my fork app',
  resave            :  true,
  saveUninitialized :  true
}) );

//******************************************************
// flash message middleware here ......
//******************************************************
app.use(flash());


//*****   The passport-config.js file inside config folder *****
//*****   will go here if it wasn't move there             *****
//*****   always before the passport.initialize()          *****
//**************************************************************


//******************************************************
// passport initialize here ......
//******************************************************
app.use(passport.initialize());
app.use(passport.session());

//******************************************************
// custom middleware here ......
//******************************************************
// make the user info available globally
app.use((req, res, next) => {
  if(req.user){
    res.locals.user = req.user;
  }
  next();
});


//******************************************************
// Routes here .....
//******************************************************
const index             = require('./routes/index.js');
const authRouter        = require('./routes/authentication-routes.js');
const recipesRouter     = require('./routes/recipes-routes.js');
const userRouter        = require('./routes/user-routes.js');

app.use('/', index);
app.use('/', authRouter);
app.use('/recipes', recipesRouter);
app.use('/user', userRouter);

//******************************************************

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
