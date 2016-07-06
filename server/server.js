var express = require('express');
var app = express();
var twitter = require('./apiKeys.js');
var routes = require('./routes');
var Twit = require('twit');
var sampleKeys = require('./sampleKeys.js');
app.use(express.static('./client'));

var port = process.env.PORT || 3000;


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY || sampleKeys.keys.consumer_key,
  consumer_secret:      process.env.CONSUMER_SECRET || sampleKeys.keys.consumer_secret,
  access_token:         process.env.ACCESS_TOKEN || sampleKeys.keys.access_token,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET || sampleKeys.keys.access_token_secret,
  timeout_ms:           60*1000
})

var googleKey = process.env.GOOGLE_API_KEY || sampleKeys.keys.google_api_key;


var searchTweets = 'search/tweets';
var count = 25;

// geolocation for downtown Los Angeles
var geoLocation = "34.052235,-118.243683,20mi";

app.get('/tweets', function (req, res) {
  var search = req.headers.keyword;
  T.get(searchTweets, {q: search, count: count, geocode: geoLocation}, function(error, data, response){
  })
  .then(function(data) {
        res.send(data);
  });
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});