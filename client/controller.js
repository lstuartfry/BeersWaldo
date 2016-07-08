var app = angular.module('beerFinder', ['ngSanitize']);

app.controller('TwitterController', function($scope, $http, Tweets){
  $scope.getTweets = function(keyword, location) {
    Tweets.getAll(keyword, location)
    .then(function(data) {
      if(data.data.statuses.length === 0) {
        alert('sorry, no tweets found!  Please try another search!');
      }
      console.log('data.data is :', data.data);
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