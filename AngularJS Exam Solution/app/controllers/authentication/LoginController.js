'use strict';

appMain.controller('LoginController', function ($scope, $location, AccountService) {
    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    if(AccountService.userData.isAuth === true){
        AccountService.logOutUser();
    }

    $scope.login = function loginFunction() {

        if ($scope.loginData.userName === "" || $scope.loginData.password == ""){
            $scope.message = "Wrong username and/or password!";
            return;
        }

        AccountService.loginUser($scope.loginData)
            .then(function () {
                $location.path("/home");
            }, function () {
                $scope.message = "Wrong username and/or password!";
            });
    };
});