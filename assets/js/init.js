var app = 
  angular
    .module('classifiedApp',[
      'ng-token-auth',
      'ngStorage',
      'angular-loading-bar',
      'ngAnimate',
      'ngRoute'
    ]).constant('baseUrl','https://rock-star-rails.herokuapp.com/api/auth')
  .config(function($authProvider) {
    $authProvider.configure({
    apiUrl:                  'https://rock-star-rails.herokuapp.com/api',
    storage:                 'cookies'
  });
  }).factory('httpHandler', function ($http,baseUrl, $q) {
    return {
      getData: function (apiRoute) {
        var deferred = $q.defer();
          $http({method: 'GET', url: baseUrl+apiRoute, headers: {
            'Access-Control-Allow-Origin': '*'}
          })
          .then(function(result) {
            response = result.data;
            deferred.resolve(response);
          }, function(error) {
            response = error;
            deferred.reject(error);
          });
        response = deferred.promise;
      return $q.when(response);
  },
  
    postData: function (apiRoute, postContent) {
      var defer=$q.defer();
      $http({
          url: baseUrl+apiRoute,
          data: postContent,
          method:'POST'
      }).then(function(res){
          if (res.status === 200) {
            defer.resolve(res);
          }
          else {
            defer.reject({error: 'Status not true'});
          }
      }, function(err) {
        defer.reject(err);
      })
    return defer.promise;
    },
    deleteData: function (apiRoute, postContent) {
      var defer=$q.defer();
      $http({
          url: baseUrl+apiRoute,
          data: postContent,
          method:'DELETE'
      }).then(function(res){
          if (res.status === 200) {
            defer.resolve(res);
          }
          else {
            defer.reject({error: 'Status not true'});
          }
      }, function(err) {
        defer.reject(err);
      })
    return defer.promise;
    }
  };
}).service('AuthUser', function ($rootScope,$sessionStorage,$localStorage) {
  
  this.setUser = function(aUser){
    $sessionStorage.user=aUser;
    $rootScope.currentUser = aUser;
  };

  this.isLoggedIn = function() {
    if($sessionStorage.user) {
      $sessionStorage.currentUserSession = $sessionStorage.user;
      $rootScope.currentUser = $sessionStorage.user;
    } else {
      $sessionStorage.currentUserSession={};
    }
    return ($sessionStorage.user) ? $sessionStorage.user : false;
  };

  this.logOut = function(){
    $sessionStorage.user = false;
    $sessionStorage.currentUserSession = false;
    $rootScope.currentUser = false;
    }
  }).run(function(AuthUser) {
    AuthUser.isLoggedIn();
  });
