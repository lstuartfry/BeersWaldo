var app = angular.module('beersWaldo', ['ngSanitize']);

app.controller('beerController', function($scope, $http, Beers){
  $scope.getResults = function(beer, brewery, location) {
    Beers.getAll(beer, brewery, location)
    .then(function(data) {
      if(data.data.statuses.length === 0) {
        alert('sorry, no tweets found!  Please try another search!');
      }
      console.log('data.data is :', data.data)
      $scope.tweets = data.data.statuses;
    })
  }
});

app.factory('Beers', function($http) {

  var getAll = function(beer, brewery, location) {
    var keyword = beer + " " + brewery;
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