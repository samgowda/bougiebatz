var express = require('express');

// creates and instance of the router
var router = express.Router();

var Article = require('../models/articleModel');

// post request that inserts user's saved links into db
router.post('/article', function(req, res){
  console.log("++++++++++ RECIEVED REQUEST POST to /article ++++++++++++++");
  new Article ({
    'articleImageUrl': req.body.articleImageUrl
    // ,
    // 'numberLikes': req.body.numberLikes
  })
  .save(function(err, article){
    res.status(201).send(article);
  });
});

// get reuqest that fetches user's saved links from db
router.get('/article', function(req, res){
  console.log("++++++++++ RECIEVED GET TO/article +++++++++++++");
  //get all links from the db
  Article.find({}, function(err, urls) {
    //urls is an array of objects with properties of articleImageUrl
    res.send(urls.map(function(url) {
      return url.articleImageUrl;
    }));
  });
});

// export router
module.exports = router;
