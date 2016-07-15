var express = require('express');
var app = express();
var apiKeys = require('./apiKeys.js');
var routes = require('./routes');
var Twit = require('twit');
var sampleKeys = require('./sampleKeys.js');
var axios = require('axios');
app.use(express.static('./src'));

var port = process.env.PORT || 3000;


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY || sampleKeys.keys.consumer_key,
  consumer_secret:      process.env.CONSUMER_SECRET || sampleKeys.keys.consumer_secret,
  access_token:         process.env.ACCESS_TOKEN || sampleKeys.keys.access_token,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET || sampleKeys.keys.access_token_secret,
  timeout_ms:           60*1000
})

var googleKey = process.env.GOOGLE_API_KEY || sampleKeys.keys.google_api_key;
var breweryDbKey = process.env.BREWERY_DB_API_KEY || sampleKeys.keys.breweryDb_api_key;

var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var googleUrlKey = '&key=' + googleKey;

var breweryDbUrl = 'http://api.brewerydb.com/v2/search?withBreweries=y&q=';
var breweryDatabaseKey = '&key=' + breweryDbKey;

var searchTweets = 'search/tweets';
var count = 25;
var search, location, lat, long, geocode, beer, brewery;

app.get('/tweets', function (req, res) {
  search = req.headers.keyword;
  location = req.headers.location.split(' ').join('+');
  
  axios.get(googleUrl + location + googleUrlKey)
  .then(function(response) {
    lat = response.data.results[0].geometry.location.lat;
    lng = response.data.results[0].geometry.location.lng;
    geocode = lat + ',' + lng + ',10mi';
    
    T.get(searchTweets, {q: search, count: count, geocode: geocode}, function(error, data, response){
    })
    .then(function(data) {
          res.send(data.data);
    });
  })
});

app.get('/info', function(req, res) {
  beer = req.headers.beer.split(' ').join('+');
  brewery = req.headers.brewery.split(' ').join('+');

  axios.get(breweryDbUrl + beer + brewery + breweryDatabaseKey)
  .then(function(data) {
    res.send(data.data)
  })
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});