var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const modelProf = require('./models/prof');
const input = require('./models/helper');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const prof = require('./routes/professional');
const cust = require('./routes/customer');

var app = express();

mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;
//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('db connected')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/prof', prof);
app.use('/cust', cust);
//app.use('/login', login);

//use sessions for tracking logins
app.use(session({
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
  secret: 'look for a better name',
  resave: true,
  saveUninitialized: false,
  /*
  store: new MongoStore({
    mongooseConnection: db
  })
  */
}));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/ind.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/customer',function(req,res){
  res.sendFile(path.join(__dirname+'/html/cust.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/cust',function(req,res){
  res.render('cust');
  //__dirname : It will resolve to your project folder.
});



app.get('/customer/:category',function(req,res){
  let cat = req.params.category
  res.sendFile(path.join(__dirname+'/html/categories/' + cat + '.html'));
  //__dirname : It will resolve to your project folder.
});



app.get('/html/:file',function(req,res){
  let file = req.params.file;
  res.sendFile(path.join(__dirname+'/html/' + file + '.html'));
  //__dirname : It will resolve to your project folder.
});
/*

app.get('/prof',function(req,res){
  res.redirect('/register1');
  //__dirname : It will resolve to your project folder.
});
*/


/*
app.get('/login',function(req,res){
  res.sendFile(path.join(__dirname+'/html/register/login.html'));
  //__dirname : It will resolve to your project folder.
});
*/

app.get('/reg_success', function (req, res) {

  res.sendFile(path.join(__dirname+'/html/register/reg_success.html'));
})
app.get('/:regfile', function (req, res) {

  res.sendFile(path.join(__dirname+'/html/register/' + req.params.regfile + '.html'));
})


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

/*
mongod --dbpath data/db

*/