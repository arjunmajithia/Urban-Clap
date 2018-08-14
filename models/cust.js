var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

console.log('cusdyfry');
var UserCustSchema = new mongoose.Schema({
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
  
  bd: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },  
  bm: {
    type: String,
    //unique: true, 
    //required: true,
    trim: true
  },
  by: {
    type: String,
    //unique: true, 
    //required: true,
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
UserCustSchema.statics.authenticate = function (email, password, callback) {
  UserCust.findOne({ email: email })
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
UserCustSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


var UserCust = mongoose.model('UserCust', UserCustSchema);
module.exports = UserCust;
var tesnum = 11;
console.log(tesnum);