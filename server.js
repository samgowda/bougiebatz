var express = require('express');
var path = require('path');
var cors = require('cors');

var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));


var newsRoutes = require('./server/routes/newsRoutes');
// var userRoutes = require('./server/routes/userRoutes');
var articleRoutes = require('./server/routes/articleRoutes')

app.use('/api', newsRoutes);

// app.use('/api', userRoutes);
app.use('/api', articleRoutes)


// webpack loads index.html, looks for script src
app.get('/public/bundle.js', function(req, res){
  res.sendFile(path.join(__dirname, 'client/public/bundle.js'));
});

//loads style sheets
app.get('/styles/style.css', function(req, res){
  res.sendFile(path.join(__dirname, 'client/styles/style.css'));
});

app.get('*', function(req, res){
  console.log('REQ.URL IS: ', req.url);
  res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.listen(process.env.PORT || 9000);
