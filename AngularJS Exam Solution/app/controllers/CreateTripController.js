'use strict';

appMain.controller('CreateTripController', function ($scope, $location, $routeParams, TripsResource, CitiesResource, AccountService) {
    $scope.errorMessage = "";

    $scope.tripData = {
        from: "",
        to: "",
        availableSeats: 1,
        departureTime: null
    };

    AccountService.checkIdentity();

    if(AccountService.userData.isAuth === false){
        $location.path("/unauthorized");
    }

    CitiesResource.getAll()
        .then(function (response) {
            $scope.cities = response;
        });

    $scope.createTrip = function createTripCtrlFunc(tripData) {
        if ($scope.tripData.from === ""){
            $scope.errorMessage = "You have to select 'From' city!";
            return;
        }

        if ($scope.tripData.to === ""){
            $scope.errorMessage = "You have to select 'To' city!";
            return;
        }

        if ($scope.tripData.availableSeats < 1){
            $scope.errorMessage = "At least 1 available seat is required!";
            return;
        }

        if ($scope.tripData.departureTime < new Date().getDate()){
            $scope.errorMessage = "Invalid departure date!";
            return;
        }

        if (AccountService.userData.isDriver === "" || AccountService.userData.isDriver === false){
            $scope.errorMessage = "You have to be a driver to create a trip!";
            return;
        }

        TripsResource.createTrip($scope.tripData)
            .then(function (response) {
                $location.path("/trips");
            }, function (error) {
                $scope.errorMessage = error.message;
            });
    };
});