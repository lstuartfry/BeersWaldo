var app = angular.module('beerFinder', []);

app.controller('TwitterCtrl', function($scope, $http){
  $scope.data = {};
	$scope.getSearch = function() {
    $http.post('/api/tweets', $scope.data)
    .success(function(data) {
      $scope.data = {};
      $scope.tweets = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
});

app.controller('TwitterController', function($scope, $http, Tweets){
  $scope.getUserTweets = function(userHandle) {
    Tweets.getTimeline(userHandle)
    .then(function (data) {
      if(data.data.errors) {
        alert('Sorry, that user does not exist');
      }
        $scope.tweets = data.data;
    })
  }
  $scope.getAllTweets = function(search) {
    Tweets.getAll(search)
    .then(function(data) {
      console.log(data.data.statuses)
      $scope.allTweets = data.data.statuses;
    })
  }
});

app.factory('Tweets', function($http) {
  var getTimeline = function (userHandle) {
    return $http({
      url: '/timeline',
      method: 'GET',
      headers: {
        'userHandle' : userHandle
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getAll = function(search) {
    return $http({
      url: '/tweets',
      method: 'GET', 
      headers: {
        'search': search
      }
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getTimeline: getTimeline,
    getAll: getAll
  }
})