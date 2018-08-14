var express = require('express');
var router = express.Router();
var UserProf = require('../models/prof');
const path = require("path");
const session = require('express-session');

const methodOverride = require('method-override')
// override with POST having ?_method=PUT
router.use(methodOverride('_method'))

console.log('prof register js ');

//use sessions for tracking logins
router.use(session({
  cookie: {
    path: '/',
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000
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
// GET route for reading data
router.get('/1', function(req, res, next) {
  //return res.redirect('/register1')
  return res.sendFile(path.join('/home/cabox/workspace/uc/rb/html/professional_firstpage.html'));
  //return res.sendFile(path.join(res.sendFile('index.html', { root: __dirname })));
});

router.get('/login', function(req, res) {
  res.sendFile('/home/cabox/workspace/uc/rb/html/register/login.html');
  //__dirname : It will resolve to your project folder.
});

router.get('/reg', function(req, res, next) {
  return res.redirect('/reg_singlepage')
});

//POST route for updating data
router.post('/', function(req, res, next) {

  if (req.body.fname &&
    req.body.lname) {

    var userData = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,

      n_fname: req.body.n_fname,
      n_lname: req.body.n_lname,
      n_email: req.body.n_email,
      n_phone: req.body.n_phone,
      n_address: req.body.n_address,

      bd: req.body.bd,
      bm: req.body.bm,
      by: req.body.by,

      uname: req.body.uname,
      password: req.body.password,
    }

    console.log(userData);
    console.log(userData.lname);

    //use schema.create to insert data into the db
    UserProf.create(userData, function(err, user) {
      console.log('1');
      if (err) {
        console.log('2');
        return next(err)
      } else {
        console.log('3');
        req.session.userId = user._id;
        return res.redirect('/reg_success');
      }
    });

    console.log('4');

  } else if (req.body.logemail && req.body.logpassword) {
    console.log(req.body.logemail);
    UserProf.authenticate(req.body.logemail, req.body.logpassword, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        console.log(req.session)
        console.log(req.session.userId)

        return res.redirect('/prof/profile');
      }
    });
  } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }

});

// GET route after registering
router.get('/profile', function(req, res, next) {
  UserProf.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //return res.send('<h1>Name: </h1>' + user.uname + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/prof/logout">Logout</a>')
          res.render('profile/prof', {user: user});
        }
      }
    });
});

router.get('/profile/edit', function(req, res, next) {
  UserProf.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          //return res.send('<h1>Name: </h1>' + user.uname + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/prof/logout">Logout</a>')
          res.render('profile/prof_edit', {user: user});
        }
      }
    });
});

router.get('/logn', function(req, res) {
  UserProf.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        res.render('login', {user: user});
        console.log("sewhw");
      }
    });

});
router.get('/', function(req, res) {
  UserProf.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        res.render('proff', {user: user});
        console.log("proff");
      }
    });

});

// GET for logout logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// POST route after registering
router.post('/profile', function(req, res, next) {
  return res.send('POST profile');
});

router.put('/profile/edit', function(req, res, next) {
  //return res.send('PUT profile');
  
   UserProf.findByIdAndUpdate(req.session.userId, req.body, function(err, user){
      if (err) {
        return next(err);
      } else {
         return res.redirect('/prof/profile');
       }
   });
});


module.exports = router;