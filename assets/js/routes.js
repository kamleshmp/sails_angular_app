app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/dashboard/index.html",
    })
    .when("/login", {
        templateUrl : "./templates/user/login.html"
    })
    .when("/dashboard", {
        templateUrl : "templates/dashboard/index.html",
    })
    .when("/register", {
        templateUrl : "./templates/user/register.html"
    })
    .when("/logout", {
        templateUrl : "./templates/dashboard.html"
    });
});

var checkRouting = function (Auth) {
    if (!Auth.isLoggedIn()) {

    }else{

    }
};