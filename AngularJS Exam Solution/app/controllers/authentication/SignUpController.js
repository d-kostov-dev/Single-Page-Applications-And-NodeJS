'use strict';

appMain.controller('SignUpController', function ($scope, $location, $timeout, AccountService) {
    $scope.successfulRegistration = false;
    $scope.formMessage = "";
    $scope.showCarInput = false;

    $scope.registration = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    if(AccountService.userData.isAuth === true){
        AccountService.logOutUser();
    }

    $scope.signUp = function signUpFunction() {

        if ($scope.registration.email === ""){
            $scope.formMessage = "Please enter valid Email address!";
            return;
        }

        if ($scope.registration.password.length < 6){
            $scope.formMessage = "Your Password must be at least 6 symbols";
            return;
        }

        if ($scope.registration.confirmPassword.length < 6 || $scope.registration.confirmPassword !== $scope.registration.password){
            $scope.formMessage = "Password confirmation does not match!";
            return;
        }

        AccountService.registerUser($scope.registration)
            .then(function () {
                $scope.successfulRegistration = true;
                $scope.formMessage = "Registered successfully, redirecting to home page...";
                startTimer();
            }, function (error) {
//                var errors = [];
//
//                for (var key in response.ModelState) {
//                    for (var i = 0; i < response.ModelState[key].length; i++) {
//                        errors.push(response.ModelState[key][i]);
//                    }
//                }
//
//                $scope.formMessage = "Registration Failed: " + errors.join(', ');
                $scope.formMessage = error.message;
            });
    };

    function startTimer() {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/');
        }, 2000);
    };
});