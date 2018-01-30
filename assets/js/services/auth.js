angular.module('classifiedApp.user', ['ngStorage'])
.service('AuthUser', function ($rootScope,$sessionStorage,$localStorage) {
  
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
});