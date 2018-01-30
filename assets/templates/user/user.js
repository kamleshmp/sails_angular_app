app.controller('userCtrl', function($scope, httpHandler, $auth, AuthUser, $location, $rootScope) {
    $scope.responseMsgVisible = false;
    $scope.checkStatus = false;
    $scope.checkValidation = function() {
        // call api here
    }
    $scope.doIfChecked = function(checkStatus) {
        $scope.checkStatus = !$scope.checkStatus;
    }
    $scope.register = function() {
        var user = {
            phone_no: $scope.registerTel,
            email: $scope.registerEmail,
            name: $scope.registerName,
            password: $scope.registerPassword,
            password_confirmation: $scope.registerCPassword,
        };

        $auth.submitRegistration(user)
            .then(function(resp) {
                // handle success response
                if(resp.data.status == "success"){
                    AuthUser.setUser(resp)
                    $location.path("/dashboard");
                }
            })
            .catch(function(resp) {
                if(resp.data.errors.email[0] == "has already been taken"){
                    // show message in Signup page.
                    console.log('Email has already been taken');
                } else if(resp.data.errorsfull_messages[0] == "Phone no has already been taken"){
                    // show message in Signup page.
                    console.log('Phone no has already been taken');
                }
            });
    };

        $scope.login = function() {
            var user = { email: $scope.loginEmail, password: $scope.loginPassword }
            $auth.submitLogin(user).then(function(resp) {
                AuthUser.setUser(resp)
                console.log(AuthUser.isLoggedIn())
                $location.path("/dashboard");
            }, function(error) {
                console.log("Login Error : " + error);
            });
        };

        $scope.logout = function() {
            $auth.signOut()
                .then(function(resp) {
                    AuthUser.logOut();
                    console.log('uuu', resp)
                    $location.path("/");
                })
                .catch(function(resp) {
                    console.log('444444444444444444444444444', resp)
                });
        }
        $rootScope.$on('auth:logout-error', function(ev, reason) {
            alert('logout failed because ' + reason.errors[0]);
        });

        $scope.resetpassword = function() {
            var email = $scope.resetPasswordEmail;
            console.log("email", email);
            $auth.requestPasswordReset(email)
                .then(function(resp) {
                    console.log("resprespresp",resp);
                    // handle success response
                })
                .catch(function(resp) {
                    console.log("catch catch catch catch",resp);
                    // handle error response
                });
        };
    })
    .directive("compareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                }

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                })
            }
        }
    })
