'use strict';

appMain.controller('HeaderController', function ($scope, $location, AccountService) {
    $scope.title = "AngularJS Single Page Application - Exam Solution";

    $scope.logOut = function () {
        AccountService.logOutUser();
        $location.path('/home');
    };

    $scope.userData = AccountService.userData;
});