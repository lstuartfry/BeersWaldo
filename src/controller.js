var app = angular.module('beersWaldo', ['ngSanitize']);

app.controller('beerController', function($scope, $http, Beers){
  $scope.getResults = function(beer, brewery, location) {
    if(beer === undefined) {
      beer = "";
    }
    if(brewery === undefined) {
      brewery = "";
    }
    if(location === undefined) {
      alert("please select a location");
    }
    Beers.getTweets(beer, brewery, location)
    .then(function(data) {
      if(data.statuses.length === 0) {
        alert('sorry, no tweets found!  Please try another search!');
      }
      $scope.tweets = data.statuses;
    })

    Beers.getInfo(beer, brewery)
    .then(function(data) {

    })
  }
});

app.factory('Beers', function($http) {

  var getTweets = function(beer, brewery, location) {
    var keyword = beer + " " + brewery;
    return $http({
      url: '/tweets',
      method: 'GET', 
      headers: {
        'keyword': keyword,
        'location': location
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getInfo = function(beer, brewery) {
    return $http({
      url: '/info',
      method: 'GET',
      headers: {
        'beer': beer,
        'brewery': brewery
      }
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  return {
    getTweets: getTweets,
    getInfo: getInfo
  }
})