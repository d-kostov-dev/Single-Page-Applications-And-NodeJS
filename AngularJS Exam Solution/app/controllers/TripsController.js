'use strict';

appMain.controller('TripsController', function ($scope, $location, $routeParams, $route, TripsResource, CitiesResource) {
    $scope.filtersData = {
        page: 1,
        orderBy: "date",
        orderType: "asc",
        from: "",
        to: "",
        finished: false,
        onlyMine: false
    };

    TripsResource.getLatestTrips()
        .then(function (response) {
            $scope.latestTrips = response;
        });

    CitiesResource.getAll()
        .then(function (response) {
            $scope.cities = response;
        });

    if ($routeParams.id !== undefined){
        TripsResource.getById($routeParams.id)
            .then(function (response) {
                $scope.tripDetails = response;
            });

    }

    $scope.joinTrip = function joinTripCtrlFunc(id) {
        TripsResource.joinTrip(id)
            .then(function () {
                $route.reload();
            }, function (error) {
                alert(error.message);
            });
    };

    $scope.filterTrips = function filterTripCtrlFunc() {
        TripsResource.filterTrips($scope.filtersData)
            .then(function (response) {
                $scope.latestTrips = response;
            });
    };

    $scope.changePage = function changePageFunc(operator) {
        $scope.filtersData.page += operator;

        if ($scope.filtersData.page < 1){
            $scope.filtersData.page = 1;
        }

        $scope.filterTrips();
    };

    $scope.clearFilter = function clearFilterCtrlFunc() {
        $scope.filtersData = {
            page: 1,
            orderBy: "date",
            orderType: "asc",
            from: "",
            to: "",
            finished: false,
            onlyMine: false
        };

        $scope.filterTrips();
    }
});