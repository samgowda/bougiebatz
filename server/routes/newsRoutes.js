var express = require('express');
var request = require('request');

// creates an instance of the router
var router = express.Router();

// get request to nytimes api that retrieves article info based on request params suing express request module
router.get('/Large', (req, res) => {
  // console.log('GOT++++++', req.query.source)
  var reqUrl = 'http://api.nytimes.com/svc/news/v3/content/'
    + req.query.source + '/'
    + req.query.section + '/'
    + req.query.time + '.json'
    + '?limit=' + req.query.limit
    + '&offset=' + req.query.offset;

  var options = { method: 'GET',
    url: reqUrl
  };
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});




//for url in request:
// first all: all, nyt or iht
// second all: section
// then ? after json: limit= one through 20
//do source || all,    category || all, .... in react copmponents, timeFrame || 24, limit || 20
//example: 'http://api.nytimes.com/svc/news/v3/content/nyt/business/72.json?limit=15'

//router is exported
module.exports = router;
