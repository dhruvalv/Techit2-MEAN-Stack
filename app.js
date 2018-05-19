require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var exphbs  = require('express-handlebars');
mongoose.connect(process.env.DBURL);


var indexController = require('./controllers/index');
var usersController = require('./controllers/users');
var ticketController = require('./controllers/tickets');
var unitController = require('./controllers/units');
var loginService = require('./services/login');

var app = express();
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexController);
//app.use('/users', usersController);

app.use('/api/login', loginService);

const passport = require('./passport');

app.use(passport.initialize());
app.use('/api/', passport.authenticate('jwt', {
  session: false,
  failWithError: true
}));

app.use('/api/users', usersController);
app.use('/api/units', unitController);
app.use('/api/tickets', ticketController);

app.all('*', function(req, res, next) {
  if (req.originalUrl.startsWith('/api/')) {
    res.status(404).end();
  } else {
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'));
  }
});
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  async function shutdown(callback) {
    await mongoose.disconnect();
    if (callback) callback();
    else
      process.exit(0);
  }
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.once('SIGUSR2', () => {
    shutdown(() => process.kill(process.pid, 'SIGUSR2'));
  });

module.exports = app;
