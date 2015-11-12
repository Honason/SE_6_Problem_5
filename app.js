var app = angular.module("examApp", ["ngRoute"]);

// Routes
app.config(['$routeProvider', function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/pages/list.html',
        controller: 'listController as listCtrl'
    }).when('/user/:id', {
        templateUrl: '/pages/person.html',
        controller: 'personController as personCtrl'
    });
}]);

var users = [];

app.controller("mainController", function ($http, $routeParams) {
  var self = this;
  if (users.length === 0) {
    $http.get("data/data.json").success(function (data) { users = data.users;
      self.users = users;
    });
  }
  else{ //We used the cache property on the http request instead self.users = users;

  }
  if (users !== null) {
    console.log("Adding user: "+$routeParams.id);
    self.user = users[$routeParams.id];
  }
});

app.controller("listController", function () {
  this.users = users;
});

app.controller("personController", ['$routeParams', function($routeParams) {
  var self = this;

  this.getPerson = function(){
    users.forEach(function(person) {
      if (person.first+person.last === $routeParams.id) {
        self.person = person;
      }
    });
  };

  this.getPerson();

}]);
