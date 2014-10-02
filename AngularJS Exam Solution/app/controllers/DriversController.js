'use strict';

appMain.controller('DriversController', function ($scope, $location, $routeParams, DriversResource) {
    $scope.pagingData = {
        page: 1,
        userName: ""
    };

    DriversResource.getTopDrivers()
        .then(function (response) {
            $scope.topDrivers = response;
        });

    if ($routeParams.id !== undefined){
        DriversResource.getById($routeParams.id)
            .then(function (response) {
                $scope.driverDetails = response;
            });
    }

    $scope.filterDrivers = function filterDriversFunc() {
        DriversResource.filterDrivers($scope.pagingData)
            .then(function (response) {
                $scope.topDrivers = response;
            });
    };

    $scope.changePage = function changePageFunc(operator) {
        $scope.pagingData.page += operator;

        if ($scope.pagingData.page < 1){
            $scope.pagingData.page = 1;
        }

        $scope.filterDrivers();
    }

    $scope.searchDriver = function searchDriverCtrlFunc() {
        $scope.pagingData.page = 1;
        $scope.filterDrivers();
    }
});