var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

console.log('dfghdyfry');
var UserProfSchema = new mongoose.Schema({
  fname: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },
  lname: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },  
  email: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },
  phone: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },  
  address: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },  
  
  
  n_fname: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },
  n_lname: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },  
  n_email: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },
  n_phone: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },  
  n_address: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },

  
  
  bd: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },  
  bm: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },
  by: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },  
  
  uname: {
    type: String,
    //unique: true, 
    required: true,
    trim: true
  },
  password: {
    type: String,
    //unique: true, 
    required: true,
  },

});

//authenticate input against database
UserProfSchema.statics.authenticate = function (email, password, callback) {
  UserProf.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserProfSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var UserProf = mongoose.model('UserProf', UserProfSchema);
module.exports = UserProf;
var tesnum = 10;
console.log(tesnum);