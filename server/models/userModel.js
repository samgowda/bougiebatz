var mongoose = require('mongoose');

//user account schema
module.exports = mongoose.model('User', {
  username: String,
  password: String,
  email: String
});
