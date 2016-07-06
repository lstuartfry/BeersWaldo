var express = require('express');
var app = express();
var twitter = require('./twitterKeys.js');
var routes = require('./routes');
var Twit = require('twit');
var sampleTwitter = require('./sampleTwitterKeys.js');
app.use(express.static('./client'));

var port = process.env.PORT || 3000;


var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY || sampleTwitter.keys.consumer_key,
  consumer_secret:      process.env.CONSUMER_SECRET || sampleTwitter.keys.consumer_secret,
  access_token:         process.env.ACCESS_TOKEN || sampleTwitter.keys.access_token,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET || sampleTwitter.keys.access_token_secret,
  timeout_ms:           60*1000
})


var userTimeline = 'statuses/user_timeline';
var searchTweets = 'search/tweets';
var count = 25;

app.get('/timeline', function (req, res) {
    var userHandle = req.headers.userhandle;
    T.get(userTimeline, { screen_name: userHandle, count: count}, function(error, data, response){
    })
    .then(function(data) {
    	res.send(data)
    })
});

app.get('/tweets', function (req, res) {
  var search = req.headers.search;
  T.get(searchTweets, {q: search, count: count}, function(error, data, response){
  })
  .then(function(data) {
    res.send(data)
  })
});

app.post('/api/tweets', function(request, response) {
  console.log('request is :', request)
  T.get('search/tweets', { q: request, count: 100 }, function(err, data, response) {
    for(var i = 0; i < data.statuses.length; i++) {
        var locationString = data.statuses[i].user.location;
        if((locationString.indexOf('LA') !== -1 || locationString.indexOf('Los Angeles') !== -1) && locationString.indexOf('NOLA') === -1) {
            response.json(data);
            // response.json(data.statuses[i].text);
        }
      }
    });
  });

app.listen(port, function() {
  console.log('Listening on ' + port);
});