var db = require('../db');

//schema for db that stores image urls

var ArticleSchema = new db.Schema({
  'articleImageUrl': String
  // ,
  // 'numberLikes': String
});

module.exports = db.model('Article', ArticleSchema);
