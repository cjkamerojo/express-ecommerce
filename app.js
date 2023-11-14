var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Adding Sessions for authenticated users:
const session = require('express-session');
require('dotenv').config();


// Defining Route Variables
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout')
//Database Crud Routes
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cartroute');
//var productsRouter = require('./routes/productsroute');
//Adding multer (image storage)
const newproductRouter = require('./routes/newproduct')
// DB //
const { User, Cart, Product } = require('./models/index');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Implementing User Authentication:
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400000 // 1 day in milliseconds
  }
}));


//Creating a function to check User Id:
app.use(async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      res.locals.user = user;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});


// routes
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/newproduct', newproductRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
