var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

require('dotenv').config();

// var db_details = process.env.OI_DB_DETAILS;
var db_details = process.env.OI_DB_DEV_DETAILS;

var mongoose = require('mongoose');

console.log(db_details);
var options = { 
  useMongoClient: true,
  socketTimeoutMS: 50000,
  keepAlive: true,
  reconnectTries: 30
};    

mongoose.connect(db_details, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

db.once('open', function() {                        
});

var index = require('./routes/index');
var users = require('./routes/users');
var casebook = require('./routes/casebook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/casebook', casebook);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
