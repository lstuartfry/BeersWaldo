var app = angular.module('beerFinder', []);

app.controller('TwitterController', function($scope, $http, Tweets){
  $scope.getTweets = function(keyword) {
    Tweets.getAll(keyword)
    .then(function(data) {
      console.log(data.data.statuses)
      $scope.tweets = data.data.statuses;
    })
  }
});

app.factory('Tweets', function($http) {

  var getAll = function(keyword) {
    return $http({
      url: '/tweets',
      method: 'GET', 
      headers: {
        'keyword': keyword
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