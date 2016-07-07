var app = angular.module('beerFinder', []);

app.controller('TwitterController', function($scope, $http, Tweets){
  $scope.getTweets = function(keyword, location) {
    Tweets.getAll(keyword, location)
    .then(function(data) {
      $scope.tweets = data.data.statuses;
    })
  }
});

app.factory('Tweets', function($http) {

  var getAll = function(keyword, location) {
    return $http({
      url: '/results',
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

  return {
    getAll: getAll
  }
})